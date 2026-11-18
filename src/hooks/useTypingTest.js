import { useState, useCallback } from 'react'

export function useTypingTest(passage = '') {
  const [typedChars, setTypedChars] = useState([])
  const [cursorIndex, setCursorIndex] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [testState, setTestState] = useState('idle') // 'idle' | 'running' | 'complete'

  const startTest = useCallback(() => {
    setTestState('running')
  }, [])

  const completeTest = useCallback(() => {
    setTestState('complete')
  }, [])

  const resetTest = useCallback(() => {
    setTypedChars([])
    setCursorIndex(0)
    setErrorCount(0)
    setTotalKeystrokes(0)
    setTestState('idle')
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (testState === 'complete') return

    // If idle, a printable character automatically starts the test
    let currentState = testState
    if (currentState === 'idle') {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setTestState('running')
        currentState = 'running'
      } else {
        return
      }
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      if (cursorIndex > 0) {
        setCursorIndex(prev => prev - 1)
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

    if (cursorIndex >= passage.length) {
      return
    }

    const expectedChar = passage[cursorIndex]
    const isCorrect = e.key === expectedChar

    setTotalKeystrokes(prev => prev + 1)

    if (!isCorrect) {
      setErrorCount(prev => prev + 1)
    }

    const nextIndex = cursorIndex + 1
    setCursorIndex(nextIndex)
    setTypedChars(prev => [...prev, { char: e.key, status: isCorrect ? 'correct' : 'incorrect' }])

    // If reached end of passage
    if (nextIndex >= passage.length) {
      setTestState('complete')
    }
  }, [testState, cursorIndex, passage])

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
