# Typing Speed Test — Challenge Reference

> Extracted from Frontend Mentor challenge files (style-guide.md, README.md, README-template.md)
> before cleanup. This is the single source of truth for design specs and requirements.

## Layout Breakpoints

- Mobile: 375px
- Desktop: 1440px
- Full responsive range: 320px → large screens (WCAG requirement)

## Colors

### Neutral
| Token | Value |
|-------|-------|
| Neutral 900 | hsl(0, 0%, 7%) |
| Neutral 800 | hsl(0, 0%, 15%) |
| Neutral 500 | hsl(240, 3%, 46%) |
| Neutral 400 | hsl(240, 1%, 59%) |
| Neutral 0 | hsl(0, 0%, 100%) |

### Accent
| Token | Value |
|-------|-------|
| Blue 600 | hsl(214, 100%, 55%) |
| Blue 400 | hsl(210, 100%, 65%) |
| Red 500 | hsl(354, 63%, 57%) |
| Green 500 | hsl(140, 63%, 57%) |
| Yellow 400 | hsl(49, 85%, 70%) |

## Typography

- **Font family:** [Sora](https://fonts.google.com/specimen/Sora)
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Label font size:** 16px
- **Font files:** `assets/fonts/Sora/` (variable + static)

## User Stories / Requirements

### Test Controls
- Start a test by clicking the start button or by clicking the passage and typing
- Select difficulty (Easy, Medium, Hard) for passages of varying complexity
- Switch between "Timed (60s)" mode and "Passage" mode (timer counts up, no limit)
- Restart at any time to get a new random passage from the selected difficulty

### Typing Experience
- Real-time WPM, accuracy, and time stats while typing
- Visual feedback: correct chars (green), errors (red/underlined), cursor position
- Correct mistakes with backspace (original errors still count against accuracy)

### Results & Progress
- Results showing WPM, accuracy, and characters (correct/incorrect) after completing
- "Baseline Established!" message on first test, setting personal best
- "High Score Smashed!" celebration with confetti when beating personal best
- Personal best persists across sessions via localStorage

### UI & Responsiveness
- Optimal layout depending on device screen size
- Hover and focus states for all interactive elements

## Expected Behaviors

- **Starting:** Timer begins on first keystroke or start button click. Clicking passage text and typing also starts
- **Timed mode:** 60-second countdown. Ends when timer reaches 0 or passage completed
- **Passage mode:** Timer counts up, no limit. Ends when full passage typed
- **Error handling:** Incorrect chars = red + underline. Backspace allows corrections, errors still count
- **Results logic:**
  - First test: "Baseline Established!" — sets initial personal best
  - New PB: "High Score Smashed!" with confetti animation
  - Normal: "Test Complete!" with encouragement message

## Data Model

Passages in `data.json`, organized by difficulty (`easy`, `medium`, `hard`), 10 each.

```json
{
  "id": "easy-1",
  "text": "The sun rose over the quiet town..."
}
```

## Available Assets

### Fonts
- `assets/fonts/Sora/Sora-VariableFont_wght.ttf`
- `assets/fonts/Sora/static/Sora-Regular.ttf`
- `assets/fonts/Sora/static/Sora-SemiBold.ttf`
- `assets/fonts/Sora/static/Sora-Bold.ttf`

### Images
- `assets/images/favicon-32x32.png`
- `assets/images/logo-large.svg` (desktop)
- `assets/images/logo-small.svg` (mobile)
- `assets/images/icon-personal-best.svg` (trophy)
- `assets/images/icon-restart.svg`
- `assets/images/icon-completed.svg`
- `assets/images/icon-new-pb.svg`
- `assets/images/icon-down-arrow.svg` (dropdown arrow)
- `assets/images/pattern-confetti.svg`
- `assets/images/pattern-star-1.svg`
- `assets/images/pattern-star-2.svg`

### Design JPGs (reference only)
- `design/desktop-not-started.jpg`
- `design/desktop-started.jpg`
- `design/desktop-results.jpg`
- `design/desktop-results-first-test.jpg`
- `design/desktop-results-new-personal-best.jpg`
- `design/mobile-not-started.jpg`
- `design/mobile-started.jpg`
- `design/mobile-results.jpg`
- `design/mobile-results-first-test.jpg`
- `design/mobile-results-new-personal-best.jpg`
- `design/mobile-dropdown.jpg`
- `design/hover-states.jpg`
- `design/focus-states.jpg`

## README Template (for submission)

When submitting, create a README with:
- Overview (challenge description, screenshot, links)
- My process (built with, what I learned, continued development)
- AI Collaboration section (how AI was used)
- Author info + Frontend Mentor profile link
