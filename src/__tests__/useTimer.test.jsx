import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '../hooks/useTimer'

describe('useTimer hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('formats initial timed mode as 0:60', () => {
    const { result } = renderHook(() => useTimer('timed', false))
    expect(result.current.timeDisplay).toBe('0:60')
    expect(result.current.elapsedSeconds).toBe(0)
  })

  it('counts down in timed mode when running', () => {
    const { result } = renderHook(() => useTimer('timed', true))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeDisplay).toBe('0:59')
    expect(result.current.elapsedSeconds).toBe(1)

    act(() => {
      vi.advanceTimersByTime(14000)
    })

    expect(result.current.timeDisplay).toBe('0:45')
    expect(result.current.elapsedSeconds).toBe(15)
  })

  it('fires onComplete when timer reaches 0:00', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer('timed', true, onComplete))

    act(() => {
      vi.advanceTimersByTime(60000)
    })

    expect(result.current.timeDisplay).toBe('0:00')
    expect(result.current.elapsedSeconds).toBe(60)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('counts up in passage mode without limit', () => {
    const { result } = renderHook(() => useTimer('passage', true))

    expect(result.current.timeDisplay).toBe('0:00')

    act(() => {
      vi.advanceTimersByTime(65000) // 1 min 5s
    })

    expect(result.current.timeDisplay).toBe('1:05')
    expect(result.current.elapsedSeconds).toBe(65)
  })
})
