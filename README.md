# Frontend Mentor - Typing Speed Test Solution

A modern, responsive **Typing Speed Test** web application built with **React 19**, **Tailwind CSS v4**, and **Vite**, featuring custom hooks, real-time typing analytics, persistent personal best scores, and responsive layouts matching the Frontend Mentor design and Figma specifications.

---

## 🚀 Live Demo & Repository

- **Live URL:** [typing-speed-test-virid-gamma.vercel.app](https://typing-speed-test-virid-gamma.vercel.app)
- **Solution URL:** [Frontend Mentor Solution Page]

---

## ✨ Features

### 1. Test Controls & Modes
- **Difficulty Selection:** Switch between **Easy**, **Medium**, and **Hard** passages with varying vocabulary, punctuation, and length (curated from 30 passages in `data.json`).
- **Timed Mode (60s):** Counts down from `0:60` to `0:00`. Test finishes automatically when time runs out or the entire passage is completed.
- **Passage Mode:** Counts up with no time limit. Test completes when the user finishes typing the full text.
- **Instant Restart:** Change difficulty/mode or click "Restart Test" at any point to reset state and receive a fresh random passage.

### 2. Real-Time Typing Engine
- **Visual Feedback:** 
  - Correct characters highlighted in **Green** (`hsl(140, 63%, 57%)`).
  - Incorrect characters highlighted in **Red** with underline (`hsl(354, 63%, 57%)`).
  - Active typing position marked with a smooth blinking cursor.
- **Backspace & Error Integrity:** Backspace allows correcting mistakes in the visual flow, but all original errors permanently count against your overall Accuracy percentage.
- **Zero Input Glitches:** Hidden input integration enables typing on both desktop physical keyboards and mobile touch keyboards.

### 3. Live Statistics
- **WPM (Words Per Minute):** Standard calculation based on `Math.round((correctChars / 5) / (elapsedMinutes))`, guarded against division-by-zero on initial strokes.
- **Accuracy:** `Math.round(((totalKeystrokes - errorCount) / totalKeystrokes) * 100)`.
- **Timer Display:** Formatted as `0:SS` for timed mode and `M:SS` for passage mode.

### 4. Dynamic Results & Progression
- **Baseline Established:** Celebrates your very first test run and sets your initial baseline personal best.
- **High Score Smashed!:** Displays celebratory confetti when you beat your previous personal best score.
- **Normal Completion:** Shows encouraging feedback and detailed breakdown of WPM, Accuracy, and correct vs. incorrect character counts.
- **Persistent High Scores:** Personal best is saved and retrieved from `localStorage` (`typingSpeedTest_personalBest`).

### 5. Responsive Design
- **Desktop (≥ 768px):** Single-row stats bar with divider lines, inline pill buttons with custom hover and focus rings.
- **Mobile (< 768px):** 3-column stats grid, custom styled floating dropdown menus with interactive radio buttons.

---

## 🛠️ Tech Stack & Architecture

- **React 19:** Pure functional components with custom hooks architecture.
- **Tailwind CSS v4:** Modern `@theme` tokens, zero runtime styling overhead.
- **Vite 6:** Ultra-fast development and build tooling.
- **Local Typography:** Custom font loading for [Sora](https://fonts.google.com/specimen/Sora) and Roboto Mono.

### Component Structure
```
src/
├── components/
│   ├── Header.jsx          # Logo & Personal Best trophy
│   ├── StatsBar.jsx        # Live WPM, Accuracy & Time stats
│   ├── Controls.jsx        # Difficulty & Mode selectors (desktop pills / mobile dropdowns)
│   ├── PassageDisplay.jsx  # Monospace passage display, character colorizer & cursor
│   ├── RestartButton.jsx   # Centered restart action
│   └── ResultsScreen.jsx   # Dynamic results (Baseline, New PB + Confetti, Standard)
├── hooks/
│   ├── useTypingTest.js    # Character evaluation, cursor tracking & keystroke capture
│   ├── useTimer.js         # Countdown/count-up interval management
│   └── usePersonalBest.js  # LocalStorage persistence & score evaluation
├── data/
│   └── passages.js         # Curated passages categorized by difficulty
├── App.jsx                 # Application state orchestration
├── main.jsx                # React root entry
└── index.css               # Tailwind v4 theme & font declarations
```

---

## 🌿 Git Branching Strategy

Development followed an isolated Git Worktree workflow:

1. `feat/setup` — Project initialization with Vite, React 19, Tailwind v4, fonts, and assets.
2. `feat/layout` — Semantic JSX structure and static layout components.
3. `feat/styling` — Responsive design tokens, hover/focus rings, and custom mobile radio dropdowns.
4. `feat/typing-logic` — `useTypingTest` hook with keystroke capture, character states, and backspace.
5. `feat/timer-stats` — `useTimer` countdown/count-up logic and real-time WPM/Accuracy formulas.
6. `feat/results` — `usePersonalBest` hook, localStorage persistence, and confetti celebration.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/AhmedKhaledYaseen/typing-speed-test.git

# Navigate into project directory
cd typing-speed-test

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 👤 Author

- **Ahmed Khaled**
- GitHub: [@AhmedKhaledYaseen](https://github.com/AhmedKhaledYaseen)
