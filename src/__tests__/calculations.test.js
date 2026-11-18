import { describe, it, expect } from 'vitest'

function calculateWpm(correctChars, elapsedSeconds) {
  if (elapsedSeconds <= 0 || correctChars === 0) return 0
  const minutes = elapsedSeconds / 60
  return Math.round((correctChars / 5) / minutes)
}

function calculateAccuracy(totalKeystrokes, errorCount) {
  if (totalKeystrokes === 0) return 100
  const correctKeystrokes = Math.max(0, totalKeystrokes - errorCount)
  return Math.max(0, Math.round((correctKeystrokes / totalKeystrokes) * 100))
}

describe('WPM and Accuracy Calculations', () => {
  it('returns 0 WPM when elapsed seconds is 0 (prevents NaN / Infinity)', () => {
    expect(calculateWpm(0, 0)).toBe(0)
    expect(calculateWpm(25, 0)).toBe(0)
  })

  it('calculates WPM accurately based on standard 5 chars per word', () => {
    // 50 chars in 60s (1 min) = 10 words / 1 min = 10 WPM
    expect(calculateWpm(50, 60)).toBe(10)
    // 250 chars in 60s = 50 WPM
    expect(calculateWpm(250, 60)).toBe(50)
    // 100 chars in 30s (0.5 min) = 20 words / 0.5 min = 40 WPM
    expect(calculateWpm(100, 30)).toBe(40)
  })

  it('returns 100% accuracy when no keystrokes have been typed', () => {
    expect(calculateAccuracy(0, 0)).toBe(100)
  })

  it('calculates accuracy accurately with errors', () => {
    // 100 keystrokes, 10 errors = 90%
    expect(calculateAccuracy(100, 10)).toBe(90)
    // 50 keystrokes, 5 errors = 90%
    expect(calculateAccuracy(50, 5)).toBe(90)
    // 10 keystrokes, 0 errors = 100%
    expect(calculateAccuracy(10, 0)).toBe(100)
  })

  it('never returns negative accuracy even if errorCount exceeds totalKeystrokes', () => {
    expect(calculateAccuracy(5, 10)).toBe(0)
  })
})
