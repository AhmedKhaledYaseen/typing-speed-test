import { useState, useCallback, useMemo, useEffect } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Controls from './components/Controls'
import PassageDisplay from './components/PassageDisplay'
import RestartButton from './components/RestartButton'
import ResultsScreen from './components/ResultsScreen'
import { passages } from './data/passages'
import { useTypingTest } from './hooks/useTypingTest'
import { useTimer } from './hooks/useTimer'
import { usePersonalBest } from './hooks/usePersonalBest'
import { calculateWpm, calculateAccuracy } from './utils/calculations'

function getRandomPassage(diff) {
  const list = passages[diff] || passages.hard
  return list[Math.floor(Math.random() * list.length)].text
}

function App() {
  const [difficulty, setDifficulty] = useState('hard')
  const [mode, setMode] = useState('timed')
  const [currentPassage, setCurrentPassage] = useState(() => getRandomPassage('hard'))

  const {
    personalBest,
    resultType,
    recordResult,
  } = usePersonalBest()

  const {
    typedChars,
    cursorIndex,
    errorCount,
    testState,
    startTest,
    completeTest,
    resetTest,
    handleKeyDown,
  } = useTypingTest(currentPassage)

  // Correct characters count
  const correctCharsCount = useMemo(() => {
    return typedChars.filter(c => c.status === 'correct').length
  }, [typedChars])

  // Timer hook
  const {
    elapsedSeconds,
    timeDisplay,
    resetTimer,
  } = useTimer(mode, testState === 'running', completeTest)

  // Real-time Accuracy using official formula
  const accuracy = useMemo(() => {
    return calculateAccuracy(correctCharsCount, errorCount)
  }, [correctCharsCount, errorCount])

  // Real-time WPM
  const wpm = useMemo(() => {
    return calculateWpm(correctCharsCount, elapsedSeconds)
  }, [correctCharsCount, elapsedSeconds])

  // Record score when test completes
  useEffect(() => {
    if (testState === 'complete') {
      recordResult(wpm)
    }
  }, [testState]) // eslint-disable-line react-hooks/exhaustive-deps

  // Switch difficulty -> new random passage + reset
  const handleDifficultyChange = useCallback((newDiff) => {
    setDifficulty(newDiff)
    const newP = getRandomPassage(newDiff)
    setCurrentPassage(newP)
    resetTest()
    resetTimer()
  }, [resetTest, resetTimer])

  // Switch mode -> reset test & timer
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode)
    resetTest()
    resetTimer()
  }, [resetTest, resetTimer])

  // Restart / Go again
  const handleRestart = useCallback(() => {
    const newP = getRandomPassage(difficulty)
    setCurrentPassage(newP)
    resetTest()
    resetTimer()
  }, [difficulty, resetTest, resetTimer])

  return (
    <div className={`bg-[#111] text-white flex flex-col items-center relative overflow-x-hidden ${
      testState === 'idle' ? 'h-screen overflow-y-hidden' : 'min-h-screen'
    }`}>
      <div className="w-full max-w-[1216px] px-4 sm:px-6 md:px-8 py-3 md:py-5 flex flex-col flex-1 z-10">
        <Header personalBest={personalBest} />

        {testState !== 'complete' ? (
          <main className="flex-1 flex flex-col w-full">
            {/* Stats + Controls row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-1 md:my-2">
              <div className="shrink-0">
                <StatsBar wpm={wpm} accuracy={accuracy} time={timeDisplay} />
              </div>
              <div className="shrink-0">
                <Controls
                  difficulty={difficulty}
                  mode={mode}
                  onDifficultyChange={handleDifficultyChange}
                  onModeChange={handleModeChange}
                />
              </div>
            </div>

            {/* Interactive Passage Area */}
            <PassageDisplay
              passage={currentPassage}
              typedChars={typedChars}
              cursorIndex={cursorIndex}
              testState={testState}
              onStart={startTest}
              onKeyDown={handleKeyDown}
            />

            {testState === 'running' && (
              <RestartButton onRestart={handleRestart} />
            )}
          </main>
        ) : (
          <main className="flex-1 flex flex-col items-center justify-center w-full py-4 pb-20">
            <ResultsScreen
              resultType={resultType}
              wpm={wpm}
              accuracy={accuracy}
              correctChars={correctCharsCount}
              incorrectChars={errorCount}
              onGoAgain={handleRestart}
            />
          </main>
        )}
      </div>

      {/* Confetti only shown on new PB */}
      {testState === 'complete' && resultType === 'newPB' && (
        <img
          src="/assets/images/pattern-confetti.svg"
          alt=""
          className="fixed bottom-0 left-0 right-0 w-full pointer-events-none z-0 object-cover max-h-[140px] md:max-h-[180px]"
        />
      )}
    </div>
  )
}

export default App
