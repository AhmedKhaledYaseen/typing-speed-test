import { useState } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Controls from './components/Controls'
import PassageDisplay from './components/PassageDisplay'
import RestartButton from './components/RestartButton'
import ResultsScreen from './components/ResultsScreen'

// Hardcoded placeholder data for Task 2 (layout verification)
const PLACEHOLDER_PASSAGE = "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. \"We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods,\" the lead researcher observed. \"Globalization isn't as modern as we assume.\""

function App() {
  const [testState, setTestState] = useState('idle') // 'idle' | 'running' | 'complete'
  const [difficulty, setDifficulty] = useState('hard')
  const [mode, setMode] = useState('timed')

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center relative overflow-x-hidden">
      <div className="w-full max-w-[1216px] px-4 sm:px-6 md:px-8 py-4 md:py-6 flex flex-col flex-1 z-10">
        <Header personalBest={testState === 'complete' ? 95 : 92} />

        {testState !== 'complete' ? (
          <main className="flex-1 flex flex-col w-full">
            {/* Stats + Controls row (desktop) / stacked (mobile) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-2">
              <div className="flex-1">
                <StatsBar wpm={40} accuracy={94} time="0:46" />
              </div>
              <div className="shrink-0">
                <Controls
                  difficulty={difficulty}
                  mode={mode}
                  onDifficultyChange={setDifficulty}
                  onModeChange={setMode}
                />
              </div>
            </div>

            {/* Passage area */}
            <PassageDisplay
              passage={PLACEHOLDER_PASSAGE}
              typedChars={[]}
              cursorIndex={0}
              testState={testState}
              onStart={() => setTestState('running')}
              onRestart={() => setTestState('idle')}
            />

            {testState === 'running' && (
              <RestartButton onRestart={() => setTestState('idle')} />
            )}
          </main>
        ) : (
          <main className="flex-1 flex flex-col items-center justify-center w-full py-4 pb-20">
            <ResultsScreen
              resultType="newPB"
              wpm={95}
              accuracy={100}
              correctChars={120}
              incorrectChars={5}
              onGoAgain={() => setTestState('idle')}
            />
          </main>
        )}
      </div>

      {/* Confetti anchored cleanly at the bottom edge */}
      {testState === 'complete' && (
        <img
          src="/assets/images/pattern-confetti.svg"
          alt=""
          className="fixed bottom-0 left-0 right-0 w-full pointer-events-none z-0 object-cover max-h-[140px] md:max-h-[180px]"
        />
      )}

      {/* Dev shortcut to test states */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50 bg-[#222]/80 backdrop-blur p-1 rounded-lg border border-[#444]">
        <button onClick={() => setTestState('idle')} className="bg-[#333] hover:bg-[#444] text-white px-3 py-1 text-xs rounded">idle</button>
        <button onClick={() => setTestState('running')} className="bg-[#333] hover:bg-[#444] text-white px-3 py-1 text-xs rounded">running</button>
        <button onClick={() => setTestState('complete')} className="bg-[#333] hover:bg-[#444] text-white px-3 py-1 text-xs rounded">complete</button>
      </div>
    </div>
  )
}

export default App
