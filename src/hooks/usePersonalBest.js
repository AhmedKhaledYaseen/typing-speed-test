import { useState, useCallback } from 'react'

const STORAGE_KEY = 'typingSpeedTest_personalBest'

export function usePersonalBest() {
  const [personalBest, setPersonalBest] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved !== null && !isNaN(parseInt(saved, 10)) ? parseInt(saved, 10) : null
    } catch {
      return null
    }
  })

  const [resultType, setResultType] = useState('normal') // 'baseline' | 'newPB' | 'normal'

  const recordResult = useCallback((currentWpm) => {
    setPersonalBest(prevBest => {
      let type = 'normal'
      let nextBest = prevBest

      if (prevBest === null) {
        type = 'baseline'
        nextBest = currentWpm
      } else if (currentWpm > prevBest) {
        type = 'newPB'
        nextBest = currentWpm
      } else {
        type = 'normal'
      }

      setResultType(type)

      try {
        localStorage.setItem(STORAGE_KEY, String(nextBest))
      } catch {
        // Ignore localStorage errors
      }

      return nextBest
    })
  }, [])

  return {
    personalBest,
    resultType,
    recordResult,
  }
}
