# Typing Speed Test — Design Document

## Intent & Why

Build a typing speed test web app as a React learning project. The user has built React projects before (e-commerce, movie explorer) but always with AI writing the code. The goal is to **write every line of React by hand** to build real understanding of components, hooks, state flow, and React patterns.

The typing test design comes from a Frontend Mentor challenge. The user will follow the provided designs and feature spec exactly.

## Goals

- Write all React code by hand — no AI-generated implementation code
- Learn custom hooks by building `useTypingTest`, `useTimer`, `usePersonalBest`
- Understand `useState`, `useEffect`, and event handling at a gut level
- Practice component composition — breaking UI into focused, reusable pieces
- Build in focused git branches so each phase teaches one skill area
- Match the Frontend Mentor design (desktop + mobile) using Tailwind CSS

## Non-Goals

- Not a portfolio piece (yet) — learning comes first
- No backend, no database — localStorage only
- No external state library (no Redux, no Zustand)
- No testing framework setup (focus is React fundamentals)

## Anti-Goals (what would make this a failure even if it works)

- AI writes the React code and user copy-pastes it
- Skipping the "why" — building something that works but the user can't explain
- Over-engineering with patterns the user doesn't understand yet

## Constraints

- Design is fixed: Frontend Mentor provides JPGs for all states (desktop, mobile, results, hover/focus)
- Data is fixed: `data.json` with 10 easy, 10 medium, 10 hard passages
- Fonts: Sora (400, 600, 700) — provided locally
- Colors: defined in `style-guide.md`
- Must be responsive: 375px mobile → 1440px desktop
- Personal best persists via localStorage

## Approaches

### Approach A: Custom Hooks (chosen)

State logic extracted into custom hooks. The main component wires hooks together and passes data to presentational children.

**Hooks:**
- `useTypingTest(passage)` — typed characters, cursor position, error tracking, test status
- `useTimer(mode, isRunning)` — countdown (60s) or count-up, formatted display
- `usePersonalBest()` — localStorage read/write, new-best detection

**Why chosen:** Custom hooks are the highest-return React skill. Building them from scratch teaches *why* hooks exist — extracting and reusing stateful logic. The user needs to master `useState` and `useEffect` through hands-on writing, not through reading AI-generated code.

### Approach B: useReducer + Context (dropped)

All test state in a reducer with explicit actions. Context provides state globally.

**Why dropped:** Closer to Redux patterns the user has already touched. More boilerplate for this size project. The learning value is lower — the user already has a mental model for dispatching actions.

## Tech Stack (builder's calls)

- **Vite** — build tool (fast, modern, standard for new React projects)
- **React 18+** — with function components and hooks only
- **Tailwind CSS v4** — styling (user is familiar, can focus on React)
- **No external state library** — pure React hooks

## Component Architecture

```
App
├── Header
│   ├── Logo (small on mobile, large on desktop)
│   └── PersonalBest (trophy icon + WPM)
├── StatsBar
│   ├── StatItem (WPM)
│   ├── StatItem (Accuracy — green/red color)
│   └── StatItem (Time)
├── Controls
│   ├── DifficultySelector
│   │   Desktop: 3 inline pill buttons (Easy / Medium / Hard)
│   │   Mobile: dropdown select
│   └── ModeSelector
│       Desktop: 2 inline pill buttons (Timed 60s / Passage)
│       Mobile: dropdown select
├── PassageDisplay
│   └── Characters rendered individually with status:
│       - correct → green text
│       - incorrect → red text + underline
│       - current → cursor indicator (blinking block)
│       - untyped → gray/muted text
├── ActionArea
│   ├── StartButton (visible when test idle)
│   └── RestartButton (visible when test running/complete)
└── ResultsOverlay (shown on test complete)
    ├── ResultIcon (checkmark, trophy, or new-PB icon)
    ├── ResultTitle + message
    │   - First test: "Baseline Established!"
    │   - New PB: "High Score Smashed!" + confetti
    │   - Normal: "Test Complete!"
    ├── ResultStats (WPM, Accuracy, Characters correct/incorrect)
    └── GoAgainButton
```

## Application States

The app moves through these states:

1. **idle** — Passage displayed, start button visible. No typing yet.
2. **running** — Timer active, keystrokes tracked, stats updating in real-time.
3. **complete** — Results overlay shown. Timer stopped.

Transitions:
- idle → running: user clicks Start, clicks passage, or starts typing
- running → complete: timer hits 0 (timed mode) OR user finishes passage
- complete → idle: user clicks "Go Again" or "Restart Test"

## Key Behaviors

**Typing mechanics:**
- Each keystroke compared against passage character at current index
- Correct: advance cursor, mark green
- Incorrect: advance cursor, mark red + underline, increment error count
- Backspace: move cursor back, but original error still counts against accuracy
- No typing beyond passage length

**WPM calculation:**
- Standard formula: (correct characters / 5) / (elapsed minutes)
- Updates in real-time while test is running

**Accuracy calculation:**
- (correct keystrokes / total keystrokes) × 100
- Errors from characters later corrected with backspace still count

**Timer:**
- Timed mode: 60-second countdown, test ends at 0
- Passage mode: counts up, no limit, test ends when passage complete

**Personal best:**
- Stored in localStorage as a number (WPM)
- First completed test: sets the baseline
- Subsequent tests: compared against stored value
- New best: update localStorage, show celebration with confetti

## Responsive Design

**Desktop (≥768px):**
- Header: logo left, personal best right, single row
- StatsBar + Controls: single row with stats left, selectors right
- Difficulty/Mode: inline pill buttons
- Passage: large text, comfortable reading width

**Mobile (<768px):**
- Header: logo left, personal best centered/right
- StatsBar: 3-column grid with labels above, large values below
- Difficulty/Mode: dropdown selects, 2-column layout
- Passage: full-width, smaller text, natural reflow

## Git Branch Strategy

Each branch focuses on one learning area. Merge to main when solid.

| Order | Branch | What it teaches | What gets built |
|-------|--------|-----------------|-----------------|
| 1 | `feat/setup` | Project scaffolding | Vite + React + Tailwind, folder structure, copy assets/data |
| 2 | `feat/layout` | Component thinking, JSX | All components as static JSX with placeholder data |
| 3 | `feat/styling` | Tailwind, responsive design | Dark theme, desktop + mobile layouts, all visual states |
| 4 | `feat/typing-logic` | Custom hooks, events, state | `useTypingTest` hook, keyboard handling, character feedback |
| 5 | `feat/timer-stats` | useEffect, intervals, derived state | `useTimer` hook, WPM/accuracy calculations, live stats |
| 6 | `feat/results` | Conditional rendering, localStorage | Results overlay, `usePersonalBest` hook, confetti, all result states |

## What's Left to the Builder

- Exact Tailwind class choices and spacing values (eyeball from JPGs)
- Internal state variable naming within hooks
- Whether to split `useTypingTest` further (e.g., separate `useKeyboard` hook)
- Animation/transition details for results overlay and confetti
- Exact cursor blinking implementation (CSS animation vs JS interval)
- How to handle the hidden input element for capturing keystrokes
