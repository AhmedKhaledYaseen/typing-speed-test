# Typing Speed Test — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully responsive typing speed test React app matching the Frontend Mentor design, with real-time WPM/accuracy tracking, three custom hooks, and a git branch per feature phase.

**Architecture:** Vite + React 18 app with three custom hooks (`useTypingTest`, `useTimer`, `usePersonalBest`) wired together in a single `TypingTest` page component. Presentational components are dumb — they receive props and render; all state lives in hooks. Tailwind CSS v4 handles all styling.

**Tech Stack:** Vite 6, React 18, Tailwind CSS v4, no external state library.

**Spec:** `docs/superpowers/specs/2026-11-18-typing-speed-test-design.md`
**Reference:** `docs/challenge-reference.md`

## Global Constraints

- React 18+, function components and hooks only — no class components
- Tailwind CSS v4 — use `@import "tailwindcss"` syntax, not `@tailwind` directives
- Sora font loaded from `assets/fonts/Sora/Sora-VariableFont_wght.ttf` (local, not Google Fonts CDN)
- Mobile breakpoint: `md:` (768px) — below = mobile layout, above = desktop layout
- Colors must match spec exactly: Green 500 `hsl(140,63%,57%)`, Red 500 `hsl(354,63%,57%)`, Blue 600 `hsl(214,100%,55%)`, Yellow 400 `hsl(49,85%,70%)`, Neutral 900 `hsl(0,0%,7%)`
- Personal best stored in localStorage key `"typingSpeedTest_personalBest"` as a plain number (WPM integer)
- WPM formula: `Math.round((correctChars / 5) / (elapsedSeconds / 60))`
- Accuracy formula: `Math.round((totalKeystrokes - errorCount) / totalKeystrokes * 100)` — capped at 100, 100 when no keystrokes
- All SVG assets imported from `src/assets/` (copied from `assets/images/` during setup)
- Branch per phase: each task lives in its own worktree under `.worktrees/`

## Review Focus

- **Backspace past corrected errors:** Accuracy must still count the original error — verify `errorCount` only increments, never decrements
- **Timed mode timer reaching 0:** Test must end immediately at 0 even if passage is not complete — verify `useTimer` triggers `onComplete` callback
- **Changing difficulty/mode mid-test:** Must reset to idle with a new passage — verify controls are interactive in running state and trigger full reset
- **WPM at test start (0 keystrokes / 0 elapsed):** Must show 0, not NaN or Infinity — guard division by zero in WPM calculation
- **First test personal best:** `usePersonalBest` must write to localStorage on first completion with no existing entry — verify with empty localStorage state

---

## Task 1: Project Setup (branch: `feat/setup`)

**Worktree:** `.worktrees/feat-setup`

**Files:**
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`
- Create: `src/assets/` (copy all SVGs from `assets/images/`)
- Create: `src/data/passages.js`
- Create: `index.html` (replace existing)
- Create: `vite.config.js`
- Create: `package.json`
- Create: `tailwind.config.js` (if needed for custom tokens)

**Interfaces:**
- Produces: `passages` object — `{ easy: [{id, text}], medium: [{id, text}], hard: [{id, text}] }` — imported from `src/data/passages.js`
- Produces: running dev server on `http://localhost:5173` rendering "Typing Speed Test" heading

- [ ] **Step 1: Scaffold Vite + React project inside the worktree**

```bash
cd .worktrees/feat-setup
npm create vite@latest . -- --template react
```
Answer: Framework = React, Variant = JavaScript

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind in `vite.config.js`**

Add `@tailwindcss/vite` plugin. File must import `defineConfig` from `vite` and `tailwindcss` from `@tailwindcss/vite`.

- [ ] **Step 4: Set up `src/index.css`**

```css
@import "tailwindcss";

@font-face {
  font-family: 'Sora';
  src: url('/assets/fonts/Sora/Sora-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
}
```
Add Sora as the default font family via a Tailwind theme extension or CSS variable.

- [ ] **Step 5: Copy assets into `src/assets/`**

Copy all files from `../../assets/images/` into `src/assets/`. Copy `../../assets/fonts/` into `public/assets/fonts/` so the font URL path works.

- [ ] **Step 6: Create `src/data/passages.js`**

Re-export the JSON data as a named export:
```js
import data from '../../data.json'
export const passages = data  // { easy: [...], medium: [...], hard: [...] }
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: server running at `http://localhost:5173`, no errors in terminal.

- [ ] **Step 8: Verify app renders in browser**

Open `http://localhost:5173`. Expected: Vite default page (or your `App.jsx` placeholder). No console errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(setup): scaffold Vite + React + Tailwind, copy assets and data"
```

---

## Task 2: Static Layout (branch: `feat/layout`)

**Worktree:** `.worktrees/feat-layout` (create from main after Task 1 merges)

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/StatsBar.jsx`
- Create: `src/components/Controls.jsx`
- Create: `src/components/PassageDisplay.jsx`
- Create: `src/components/ResultsScreen.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: nothing (all hardcoded placeholder data)
- Produces: all components as named exports accepting props (props listed per component below)

`Header` props: `personalBest: number | null`
`StatsBar` props: `wpm: number, accuracy: number, time: string`
`Controls` props: `difficulty: string, mode: string, onDifficultyChange: fn, onModeChange: fn`
`PassageDisplay` props: `passage: string, typedChars: {char, status}[], cursorIndex: number, testState: string`
`ResultsScreen` props: `resultType: 'normal'|'baseline'|'newPB', wpm: number, accuracy: number, correctChars: number, incorrectChars: number, onGoAgain: fn`

- [ ] **Step 1: Create `Header.jsx` with hardcoded props**

Renders: `logo-large.svg` (desktop) / `logo-small.svg` (mobile), trophy icon, "Personal best: 92 WPM". Use semantic `<header>` tag.

- [ ] **Step 2: Verify Header renders in `App.jsx`**

Import and render `<Header personalBest={92} />`. Open browser. Expected: header visible with logo and personal best text.

- [ ] **Step 3: Create `StatsBar.jsx`**

Renders WPM, Accuracy, Time as three labelled stat items separated by vertical dividers. Desktop: single row with stats left and controls slots right. Mobile: stats in 3-column grid.

- [ ] **Step 4: Create `Controls.jsx`**

Desktop: "Difficulty:" label + 3 pill `<button>` elements (Easy/Medium/Hard) + "Mode:" label + 2 pill buttons (Timed 60s/Passage).
Mobile: 2 `<select>` dropdowns with custom styling.
Calls `onDifficultyChange(value)` and `onModeChange(value)` on change.

- [ ] **Step 5: Create `PassageDisplay.jsx`**

Renders passage text character by character. Each char is a `<span>` with a `data-status` attribute (`correct|incorrect|current|untyped`). Idle state: wraps content in a blurred overlay with the Start button on top. Running state: shows "Restart Test" button below passage.

- [ ] **Step 6: Create `ResultsScreen.jsx`**

Three visual variants based on `resultType`:
- `'normal'`: checkmark icon, "Test Complete!", "Solid run. Keep pushing to beat your high score.", "Go Again" button
- `'baseline'`: checkmark icon, "Baseline Established!", "You've set the bar. Now the real challenge begins—time to beat it.", "Beat This Score" button
- `'newPB'`: party icon, "High Score Smashed!", "You're getting faster. That was incredible typing.", "Beat This Score" button, confetti pattern

Stats cards: 3 bordered boxes with WPM / Accuracy / Characters (correctChars/incorrectChars with green/red coloring).

- [ ] **Step 7: Wire all components in `App.jsx` with hardcoded state**

Render all components with static placeholder values. `testState = 'idle'` shows PassageDisplay in idle mode.

- [ ] **Step 8: Verify full layout renders**

Open browser. Expected: all sections visible with placeholder data, no console errors, components present on screen.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(layout): add all static components with placeholder data"
```

---

## Task 3: Styling (branch: `feat/styling`)

**Worktree:** `.worktrees/feat-styling` (create from main after Task 2 merges)

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/StatsBar.jsx`
- Modify: `src/components/Controls.jsx`
- Modify: `src/components/PassageDisplay.jsx`
- Modify: `src/components/ResultsScreen.jsx`
- Modify: `src/index.css` (add custom color tokens if needed)

**Interfaces:**
- Consumes: all components from Task 2 (same props, same structure)
- Produces: pixel-matched styled components — same props interface, visual output matches design JPGs

- [ ] **Step 1: Add color tokens to `src/index.css`**

Define CSS custom properties for all spec colors (Neutral 900/800/500/400/0, Blue 600/400, Red 500, Green 500, Yellow 400). Reference them in Tailwind via `@theme`.

- [ ] **Step 2: Style `Header.jsx`**

Desktop: flex row, logo left, personal best right, Neutral 900 background, Sora font.
Mobile (`md:` breakpoint flipped): logo-small visible, logo-large hidden.
Personal best: Yellow 400 trophy icon, white "Personal best:" label, bold white WPM value.

- [ ] **Step 3: Style `StatsBar.jsx` and `Controls.jsx`**

Desktop: single flex row — stats left with thin dividers, controls right.
Stats: white bold large numbers, Neutral 400 labels.
Accuracy value: Red 500 when < 100%, white when 100%.
Time value: Yellow 400 color.
Pill buttons: Neutral 800 border default, Blue 600 border + Blue 400 text when active.
Hover: Blue 400 border on inactive pills.
Focus: Blue 400 outline ring on all interactive elements.
Mobile: stats in 3-column grid (label small top, value large bottom). Dropdowns replace pills.

- [ ] **Step 4: Style `PassageDisplay.jsx`**

Passage area: large font (~28-32px), Sora.
Char spans by status: `correct` = Green 500, `incorrect` = Red 500 + underline decoration, `current` = Neutral 400 text with a 2px wide inline block cursor (Neutral 400 bg, blinking via CSS animation), `untyped` = Neutral 500.
Idle overlay: `blur-sm` on passage text, blue Start button centered (Blue 600 bg, white text, rounded-full).
Running: "Restart Test" button at bottom center — dark bg (Neutral 800), white text, rounded-full, restart icon.
Thin blue gradient separator line between stats bar and passage.

- [ ] **Step 5: Style `ResultsScreen.jsx`**

Centered column layout. Icon with green glow rings (box-shadow) for checkmark variant. Yellow icon for PB variant.
Title: white bold ~40px. Subtitle: Neutral 400.
Stat cards: Neutral 800 bordered, label Neutral 400 small, value white/colored bold large.
Desktop: 3 cards in a row. Mobile: 3 cards stacked full-width.
Decorative stars: `pattern-star-1.svg` absolute positioned top-left (red tint), `pattern-star-2.svg` bottom-right (yellow tint).
Confetti: `pattern-confetti.svg` as bottom-edge decoration for newPB variant.

- [ ] **Step 6: Verify against all 13 design JPGs**

Open browser at each state (switch `testState` and `resultType` props manually in `App.jsx`). Check desktop and mobile (use DevTools resize). Fix any visual gaps.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(styling): apply full Tailwind styling matching all design states"
```

---

## Task 4: Typing Logic Hook (branch: `feat/typing-logic`)

**Worktree:** `.worktrees/feat-typing` (create from main after Task 3 merges)

**Files:**
- Create: `src/hooks/useTypingTest.js`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `passages` from `src/data/passages.js`
- Produces: `useTypingTest(passage: string)` hook returning:
  ```js
  {
    typedChars,      // {char: string, status: 'correct'|'incorrect'}[]
    cursorIndex,     // number — current position in passage
    errorCount,      // number — total errors (never decrements)
    totalKeystrokes, // number — all keypresses including backspace
    testState,       // 'idle' | 'running' | 'complete'
    startTest,       // () => void — transitions idle → running
    resetTest,       // () => void — resets all state to idle
    handleKeyDown,   // (e: KeyboardEvent) => void — the main keystroke handler
  }
  ```

- [ ] **Step 1: Create `src/hooks/useTypingTest.js` with initial state**

`useState` declarations: `typedChars = []`, `cursorIndex = 0`, `errorCount = 0`, `totalKeystrokes = 0`, `testState = 'idle'`. Export hook function. No logic yet.

- [ ] **Step 2: Implement `startTest()`**

Sets `testState` to `'running'`. No other state changes.

- [ ] **Step 3: Implement `resetTest(passage)`**

Resets all state to initial values. Accepts new passage string (or uses same) — resets typed chars, cursor, errors, keystrokes, testState back to `'idle'`.

- [ ] **Step 4: Implement `handleKeyDown(e, passage)` — correct key**

If `testState !== 'running'`: return early.
If `e.key === passage[cursorIndex]`: push `{char: e.key, status: 'correct'}` to `typedChars`, increment `cursorIndex`, increment `totalKeystrokes`.
If `cursorIndex === passage.length`: set `testState = 'complete'`.

- [ ] **Step 5: Implement `handleKeyDown` — incorrect key**

If `e.key.length === 1` (printable char) and key !== passage[cursorIndex]: push `{char: e.key, status: 'incorrect'}`, increment `cursorIndex`, increment `errorCount`, increment `totalKeystrokes`.

- [ ] **Step 6: Implement `handleKeyDown` — backspace**

If `e.key === 'Backspace'` and `cursorIndex > 0`: pop last item from `typedChars`, decrement `cursorIndex`. Do NOT decrement `errorCount` — errors are permanent.

- [ ] **Step 7: Wire `useTypingTest` into `App.jsx`**

Pick a random passage from `passages[difficulty]`. Pass `passage.text` to `useTypingTest`. Attach `handleKeyDown` to a hidden `<input>` element that auto-focuses when test is `running`. Pass all returned values down to `PassageDisplay`.

- [ ] **Step 8: Verify typing works end-to-end**

Open browser. Click "Start Typing Test". Type a few characters. Expected: green chars appear for correct, red + underline for wrong, cursor advances, backspace removes last char.

- [ ] **Step 9: Verify backspace doesn't reduce error count**

Type a wrong char (error count goes up), then press backspace. Expected: cursor moves back, `typedChars` shrinks, but `errorCount` stays the same (verify via React DevTools or a temporary debug display).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(typing-logic): add useTypingTest hook with keystroke handling"
```

---

## Task 5: Timer and Stats (branch: `feat/timer-stats`)

**Worktree:** `.worktrees/feat-timer` (create from main after Task 4 merges)

**Files:**
- Create: `src/hooks/useTimer.js`
- Modify: `src/App.jsx`
- Modify: `src/components/StatsBar.jsx`

**Interfaces:**
- Consumes: `testState`, `mode` from App
- Produces: `useTimer(mode: 'timed'|'passage', isRunning: boolean, onComplete: fn)` returning:
  ```js
  {
    timeDisplay,  // string — "0:46" format
    elapsedSeconds, // number — always counts up (for WPM calculation)
  }
  ```
- Produces: `wpm` and `accuracy` as derived values computed in `App.jsx`

- [ ] **Step 1: Create `src/hooks/useTimer.js` with state**

`useState`: `seconds = 60` (timed) or `0` (passage). `useRef` for the interval ID.

- [ ] **Step 2: Implement the `useEffect` interval**

When `isRunning` becomes true: start `setInterval` (1000ms).
Timed mode: decrement `seconds` each tick. When `seconds === 0`: clear interval, call `onComplete()`.
Passage mode: increment `seconds` each tick. No auto-complete.
Cleanup: clear interval on effect teardown.

- [ ] **Step 3: Implement `timeDisplay` formatting**

Format `seconds` as `M:SS` — e.g., 46 → `"0:46"`, 60 → `"1:00"`. Return from hook.

- [ ] **Step 4: Implement `elapsedSeconds`**

Timed mode: `elapsedSeconds = 60 - seconds`.
Passage mode: `elapsedSeconds = seconds`.
Return from hook.

- [ ] **Step 5: Add WPM and accuracy derived values in `App.jsx`**

```js
const correctChars = typedChars.filter(c => c.status === 'correct').length
const wpm = elapsedSeconds > 0
  ? Math.round((correctChars / 5) / (elapsedSeconds / 60))
  : 0
const accuracy = totalKeystrokes > 0
  ? Math.round(((totalKeystrokes - errorCount) / totalKeystrokes) * 100)
  : 100
```

- [ ] **Step 6: Wire timer into `App.jsx`**

Pass `isRunning = testState === 'running'` and `mode` to `useTimer`. Pass `onComplete` callback that sets `testState = 'complete'`. Pass `timeDisplay`, `wpm`, `accuracy` to `StatsBar`.

- [ ] **Step 7: Verify timer counts down (timed mode)**

Open browser. Start test. Expected: Time stat counts down from 1:00. At 0:00, test ends (passage blurs or results show).

- [ ] **Step 8: Verify WPM updates live**

Type at a steady pace. Expected: WPM stat updates every second as `elapsedSeconds` changes.

- [ ] **Step 9: Verify 0-keystroke guard**

Before typing anything, WPM should be 0 and accuracy should be 100 — not NaN or Infinity.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(timer-stats): add useTimer hook and live WPM/accuracy calculations"
```

---

## Task 6: Results, Personal Best, and Reset (branch: `feat/results`)

**Worktree:** `.worktrees/feat-results` (create from main after Task 5 merges)

**Files:**
- Create: `src/hooks/usePersonalBest.js`
- Modify: `src/App.jsx`
- Modify: `src/components/ResultsScreen.jsx`

**Interfaces:**
- Consumes: `wpm`, `testState` from App
- Produces: `usePersonalBest()` returning:
  ```js
  {
    personalBest,     // number | null
    resultType,       // 'baseline' | 'newPB' | 'normal'
    saveIfBetter,     // (wpm: number) => void
  }
  ```

- [ ] **Step 1: Create `src/hooks/usePersonalBest.js`**

`useState`: read initial value from `localStorage.getItem('typingSpeedTest_personalBest')` — parse as int, default to `null`.

- [ ] **Step 2: Implement `saveIfBetter(wpm)`**

If `personalBest === null`: set `personalBest = wpm`, write to localStorage, return `'baseline'`.
If `wpm > personalBest`: set `personalBest = wpm`, write to localStorage, return `'newPB'`.
Otherwise: return `'normal'`.

- [ ] **Step 3: Implement `resultType` derived state**

`resultType` should reflect the most recent call to `saveIfBetter`. Store it as a state value updated inside `saveIfBetter`.

- [ ] **Step 4: Wire `usePersonalBest` into `App.jsx`**

Call `saveIfBetter(wpm)` inside a `useEffect` that fires when `testState` transitions to `'complete'`. Pass `personalBest` to `Header`, `resultType` + final stats to `ResultsScreen`.

- [ ] **Step 5: Implement full reset in `App.jsx`**

`onGoAgain` / `onRestartTest` callback: pick new random passage from current difficulty, call `resetTest()`, reset `useTimer` (by remounting via key or by resetting internal state).

- [ ] **Step 6: Implement difficulty/mode change reset**

`onDifficultyChange` and `onModeChange` handlers: update difficulty/mode state, pick new random passage, call `resetTest()`.

- [ ] **Step 7: Verify first-test flow**

Clear localStorage. Open browser. Complete a test. Expected: "Baseline Established!" screen, "Beat This Score" button, personal best in header updates to that WPM.

- [ ] **Step 8: Verify new PB flow**

Manually set localStorage `typingSpeedTest_personalBest` to a low value (e.g., 1). Complete a test. Expected: "High Score Smashed!" screen with confetti, personal best updates.

- [ ] **Step 9: Verify normal completion flow**

Set localStorage to a high value (e.g., 999). Complete a test. Expected: "Test Complete!" screen, "Go Again" button, personal best header stays at 999.

- [ ] **Step 10: Verify reset flows**

a) Click "Go Again" → back to idle with new passage, timer resets.
b) Click "Restart Test" mid-test → back to idle with new passage.
c) Change difficulty mid-test → back to idle with new passage from new difficulty.

- [ ] **Step 11: Final manual check against all design states**

Walk through every screen (idle, started, all 3 result types) on both desktop and mobile. Fix any remaining visual or behavioral gaps.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat(results): add usePersonalBest hook, results screen logic, and all reset flows"
```

---

## Merge Order

Each branch merges into `main` before the next one's worktree is created:

```
main → feat/setup → main → feat/layout → main → feat/styling
     → main → feat/typing-logic → main → feat/timer-stats
     → main → feat/results → main (done)
```

After each merge:
```bash
git checkout main
git merge feat/<branch-name> --no-ff -m "merge: feat/<branch-name>"
git push origin main
```
