import { useState, useCallback, useMemo } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Controls from './components/Controls'
import PassageDisplay from './components/PassageDisplay'
import RestartButton from './components/RestartButton'
import ResultsScreen from './components/ResultsScreen'
import { passages } from './data/passages'
import { useTypingTest } from './hooks/useTypingTest'

function getRandomPassage(diff) {
  const list = passages[diff] || passages.hard
  return list[Math.floor(Math.random() * list.length)].text
}

function App() {
  const [difficulty, setDifficulty] = useState('hard')
  const [mode, setMode] = useState('timed')
  const [currentPassage, setCurrentPassage] = useState(() => getRandomPassage('hard'))

  const {
    typedChars,
    cursorIndex,
    errorCount,
    totalKeystrokes,
    testState,
    setTestState,
    startTest,
    resetTest,
    handleKeyDown,
  } = useTypingTest(currentPassage)

  // Switch difficulty -> get new random passage and reset test
  const handleDifficultyChange = useCallback((newDiff) => {
    setDifficulty(newDiff)
    const newP = getRandomPassage(newDiff)
    setCurrentPassage(newP)
    resetTest()
  }, [resetTest])

  // Switch mode -> reset test
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode)
    resetTest()
  }, [resetTest])

  // Restart current test
  const handleRestart = useCallback(() => {
    const newP = getRandomPassage(difficulty)
    setCurrentPassage(newP)
    resetTest()
  }, [difficulty, resetTest])

  // Accuracy calculation (guarded against divide by 0)
  const accuracy = useMemo(() => {
    if (totalKeystrokes === 0) return 100
    const correctKeystrokes = Math.max(0, totalKeystrokes - errorCount)
    return Math.max(0, Math.round((correctKeystrokes / totalKeystrokes) * 100))
  }, [totalKeystrokes, errorCount])

  const correctCharsCount = useMemo(() => {
    return typedChars.filter(c => c.status === 'correct').length
  }, [typedChars])

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center relative overflow-x-hidden">
      <div className="w-full max-w-[1216px] px-4 sm:px-6 md:px-8 py-4 md:py-6 flex flex-col flex-1 z-10">
        <Header personalBest={92} />

        {testState !== 'complete' ? (
          <main className="flex-1 flex flex-col w-full">
            {/* Stats + Controls row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-2">
              <div className="flex-1">
                <StatsBar wpm={0} accuracy={accuracy} time={mode === 'timed' ? '0:60' : '0:00'} />
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
              resultType="normal"
              wpm={0}
              accuracy={accuracy}
              correctChars={correctCharsCount}
              incorrectChars={errorCount}
              onGoAgain={handleRestart}
            />
          </main>
        )}
      </div>

      {/* Confetti on complete */}
      {testState === 'complete' && (
        <img
          src="/assets/images/pattern-confetti.svg"
          alt=""
          className="fixed bottom-0 left-0 right-0 w-full pointer-events-none z-0 object-cover max-h-[140px] md:max-h-[180px]"
        />
      )}

      {/* State debugging toggle */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50 bg-[#222]/80 backdrop-blur p-1 rounded-lg border border-[#444]">
        <button onClick={() => setTestState('idle')} className="bg-[#333] hover:bg-[#444] text-white px-3 py-1 text-xs rounded">idle</button>
        <button onClick={() => setTestState('running')} className="bg-[#333] hover:bg-[#444] text-white px-3 py-1 text-xs rounded">running</button>
        <button onClick={() => setTestState('complete')} className="bg-[#333] hover:bg-[#444] text-white px-3 py-1 text-xs rounded">complete</button>
      </div>
    </div>
  )
}

export default App
