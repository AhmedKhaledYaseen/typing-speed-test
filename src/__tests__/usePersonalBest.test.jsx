import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePersonalBest } from '../hooks/usePersonalBest'

describe('usePersonalBest hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with null when localStorage is empty', () => {
    const { result } = renderHook(() => usePersonalBest())
    expect(result.current.personalBest).toBeNull()
    expect(result.current.resultType).toBe('normal')
  })

  it('marks first completed test as "baseline" and records score', () => {
    const { result } = renderHook(() => usePersonalBest())

    act(() => {
      result.current.recordResult(45)
    })

    expect(result.current.personalBest).toBe(45)
    expect(result.current.resultType).toBe('baseline')
    expect(localStorage.getItem('typingSpeedTest_personalBest')).toBe('45')
  })

  it('marks higher score as "newPB" and updates localStorage', () => {
    localStorage.setItem('typingSpeedTest_personalBest', '45')
    const { result } = renderHook(() => usePersonalBest())

    expect(result.current.personalBest).toBe(45)

    act(() => {
      result.current.recordResult(62)
    })

    expect(result.current.personalBest).toBe(62)
    expect(result.current.resultType).toBe('newPB')
    expect(localStorage.getItem('typingSpeedTest_personalBest')).toBe('62')
  })

  it('marks equal or lower score as "normal" and preserves personalBest', () => {
    localStorage.setItem('typingSpeedTest_personalBest', '80')
    const { result } = renderHook(() => usePersonalBest())

    act(() => {
      result.current.recordResult(72)
    })

    expect(result.current.personalBest).toBe(80)
    expect(result.current.resultType).toBe('normal')
    expect(localStorage.getItem('typingSpeedTest_personalBest')).toBe('80')
  })
})
