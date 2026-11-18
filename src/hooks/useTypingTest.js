import { useState, useCallback, useRef } from 'react'

export function useTypingTest(passage = '') {
  const [typedChars, setTypedChars] = useState([])
  const [cursorIndex, setCursorIndex] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [testState, setTestState] = useState('idle') // 'idle' | 'running' | 'complete'

  // Refs prevent stale closures during rapid keypresses
  const cursorRef = useRef(0)
  const stateRef = useRef('idle')

  const startTest = useCallback(() => {
    stateRef.current = 'running'
    setTestState('running')
  }, [])

  const completeTest = useCallback(() => {
    stateRef.current = 'complete'
    setTestState('complete')
  }, [])

  const resetTest = useCallback(() => {
    cursorRef.current = 0
    stateRef.current = 'idle'
    setTypedChars([])
    setCursorIndex(0)
    setErrorCount(0)
    setTotalKeystrokes(0)
    setTestState('idle')
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (stateRef.current === 'complete') return

    // If idle, a printable character automatically starts the test
    if (stateRef.current === 'idle') {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        stateRef.current = 'running'
        setTestState('running')
      } else {
        return
      }
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      if (cursorRef.current > 0) {
        cursorRef.current -= 1
        setCursorIndex(cursorRef.current)
        setTypedChars(prev => prev.slice(0, -1))
        setTotalKeystrokes(prev => prev + 1)
        // Note: errorCount is NEVER decremented!
      }
      return
    }

    // Ignore non-printable keys (Shift, Alt, Escape, Arrow keys, etc.)
    if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) {
      return
    }

    // Prevent default scrolling on spacebar
    if (e.key === ' ') {
      e.preventDefault()
    }

    const currentIndex = cursorRef.current
    if (currentIndex >= passage.length) {
      return
    }

    const expectedChar = passage[currentIndex]
    const isCorrect = e.key === expectedChar

    setTotalKeystrokes(prev => prev + 1)

    if (!isCorrect) {
      setErrorCount(prev => prev + 1)
    }

    const nextIndex = currentIndex + 1
    cursorRef.current = nextIndex
    setCursorIndex(nextIndex)
    setTypedChars(prev => [...prev, { char: e.key, status: isCorrect ? 'correct' : 'incorrect' }])

    // If reached end of passage
    if (nextIndex >= passage.length) {
      stateRef.current = 'complete'
      setTestState('complete')
    }
  }, [passage])

  return {
    typedChars,
    cursorIndex,
    errorCount,
    totalKeystrokes,
    testState,
    setTestState,
    startTest,
    completeTest,
    resetTest,
    handleKeyDown,
  }
}
