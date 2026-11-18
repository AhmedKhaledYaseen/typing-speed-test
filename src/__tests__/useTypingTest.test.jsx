import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTypingTest } from '../hooks/useTypingTest'

describe('useTypingTest hook', () => {
  const passage = 'Hello World'

  it('initializes with idle state, cursor at 0, and 0 errors', () => {
    const { result } = renderHook(() => useTypingTest(passage))

    expect(result.current.testState).toBe('idle')
    expect(result.current.cursorIndex).toBe(0)
    expect(result.current.errorCount).toBe(0)
    expect(result.current.totalKeystrokes).toBe(0)
    expect(result.current.typedChars).toEqual([])
  })

  it('starts test when startTest is invoked', () => {
    const { result } = renderHook(() => useTypingTest(passage))

    act(() => {
      result.current.startTest()
    })

    expect(result.current.testState).toBe('running')
  })

  it('records correct characters and advances cursor', () => {
    const { result } = renderHook(() => useTypingTest(passage))

    act(() => {
      result.current.startTest()
      result.current.handleKeyDown({ key: 'H', preventDefault: () => {} })
    })

    expect(result.current.cursorIndex).toBe(1)
    expect(result.current.errorCount).toBe(0)
    expect(result.current.totalKeystrokes).toBe(1)
    expect(result.current.typedChars).toEqual([{ char: 'H', status: 'correct' }])
  })

  it('records incorrect characters and increments error count', () => {
    const { result } = renderHook(() => useTypingTest(passage))

    act(() => {
      result.current.startTest()
      result.current.handleKeyDown({ key: 'X', preventDefault: () => {} })
    })

    expect(result.current.cursorIndex).toBe(1)
    expect(result.current.errorCount).toBe(1)
    expect(result.current.totalKeystrokes).toBe(1)
    expect(result.current.typedChars).toEqual([{ char: 'X', status: 'incorrect' }])
  })

  it('retains permanent errorCount when backspace is pressed', () => {
    const { result } = renderHook(() => useTypingTest(passage))

    act(() => {
      result.current.startTest()
      // Type wrong character
      result.current.handleKeyDown({ key: 'X', preventDefault: () => {} })
    })

    expect(result.current.errorCount).toBe(1)
    expect(result.current.cursorIndex).toBe(1)

    // Press Backspace
    act(() => {
      result.current.handleKeyDown({ key: 'Backspace', preventDefault: () => {} })
    })

    expect(result.current.cursorIndex).toBe(0)
    expect(result.current.typedChars).toEqual([])
    // Error count must NOT decrease!
    expect(result.current.errorCount).toBe(1)
    expect(result.current.totalKeystrokes).toBe(2)
  })

  it('completes test when full passage has been typed', () => {
    const shortPassage = 'Hi'
    const { result } = renderHook(() => useTypingTest(shortPassage))

    act(() => {
      result.current.startTest()
      result.current.handleKeyDown({ key: 'H', preventDefault: () => {} })
      result.current.handleKeyDown({ key: 'i', preventDefault: () => {} })
    })

    expect(result.current.testState).toBe('complete')
    expect(result.current.cursorIndex).toBe(2)
  })

  it('resets all state when resetTest is invoked', () => {
    const { result } = renderHook(() => useTypingTest(passage))

    act(() => {
      result.current.startTest()
      result.current.handleKeyDown({ key: 'X', preventDefault: () => {} })
      result.current.resetTest()
    })

    expect(result.current.testState).toBe('idle')
    expect(result.current.cursorIndex).toBe(0)
    expect(result.current.errorCount).toBe(0)
    expect(result.current.totalKeystrokes).toBe(0)
    expect(result.current.typedChars).toEqual([])
  })
})
