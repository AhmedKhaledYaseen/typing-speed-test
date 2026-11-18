import { describe, it, expect } from 'vitest'
import { calculateWpm, calculateAccuracy } from '../utils/calculations'

describe('WPM and Accuracy Calculations (Production)', () => {
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
    // 90 correct, 10 errors = 90%
    expect(calculateAccuracy(90, 10)).toBe(90)
    // 45 correct, 5 errors = 90%
    expect(calculateAccuracy(45, 5)).toBe(90)
    // 10 correct, 0 errors = 100%
    expect(calculateAccuracy(10, 0)).toBe(100)
  })

  it('does not inflate accuracy when backspacing mistakes', () => {
    // 5 correct, 5 errors = 50%
    expect(calculateAccuracy(5, 5)).toBe(50)
  })
})
