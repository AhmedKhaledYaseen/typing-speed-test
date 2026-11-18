import { useState } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Controls from './components/Controls'
import PassageDisplay from './components/PassageDisplay'
import RestartButton from './components/RestartButton'
import ResultsScreen from './components/ResultsScreen'

// Hardcoded placeholder data for Task 2 (layout verification)
const PLACEHOLDER_PASSAGE = "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb."

function App() {
  const [testState, setTestState] = useState('idle') // 'idle' | 'running' | 'complete'
  const [difficulty, setDifficulty] = useState('hard')
  const [mode, setMode] = useState('timed')

  return (
    <div className="min-h-screen bg-[#111] flex flex-col">
      <Header personalBest={92} />

      {testState !== 'complete' && (
        <>
          {/* Stats + Controls row (desktop) / stacked (mobile) */}
          <div className="md:flex md:items-center md:justify-between">
            <StatsBar wpm={40} accuracy={94} time="0:46" />
            <div className="md:pr-14">
              <Controls
                difficulty={difficulty}
                mode={mode}
                onDifficultyChange={setDifficulty}
                onModeChange={setMode}
              />
            </div>
          </div>

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
        </>
      )}

      {testState === 'complete' && (
        <>
          <Header personalBest={95} />
          <ResultsScreen
            resultType="newPB"
            wpm={95}
            accuracy={100}
            correctChars={120}
            incorrectChars={5}
            onGoAgain={() => setTestState('idle')}
          />
        </>
      )}

      {/* Dev shortcut to test results screen */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50">
        <button onClick={() => setTestState('idle')} className="bg-[#333] text-white px-3 py-1 text-xs rounded">idle</button>
        <button onClick={() => setTestState('running')} className="bg-[#333] text-white px-3 py-1 text-xs rounded">running</button>
        <button onClick={() => setTestState('complete')} className="bg-[#333] text-white px-3 py-1 text-xs rounded">complete</button>
      </div>
    </div>
  )
}

export default App
