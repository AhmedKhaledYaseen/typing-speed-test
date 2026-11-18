import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(mode, isRunning, onComplete) {
  // seconds left for timed mode, seconds elapsed for passage mode
  const [seconds, setSeconds] = useState(mode === 'timed' ? 60 : 0)
  const timerRef = useRef(null)

  // Reset timer whenever mode changes or manually reset
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setSeconds(mode === 'timed' ? 60 : 0)
  }, [mode])

  // Sync initial seconds when mode switches
  useEffect(() => {
    resetTimer()
  }, [mode, resetTimer])

  // Handle completion outside setState updater
  useEffect(() => {
    if (isRunning && mode === 'timed' && seconds === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      onComplete?.()
    }
  }, [seconds, isRunning, mode, onComplete])

  // Timer tick effect
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      setSeconds(prev => {
        if (mode === 'timed') {
          return Math.max(0, prev - 1)
        } else {
          return prev + 1
        }
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRunning, mode])

  // Calculate elapsed seconds for WPM formula
  const elapsedSeconds = mode === 'timed' ? (60 - seconds) : seconds

  // Format time display: timed mode uses 0:60 down to 0:00; passage mode uses M:SS
  const formatTime = () => {
    if (mode === 'timed') {
      return `0:${String(seconds).padStart(2, '0')}`
    } else {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${String(secs).padStart(2, '0')}`
    }
  }

  return {
    seconds,
    elapsedSeconds,
    timeDisplay: formatTime(),
    resetTimer,
  }
}
