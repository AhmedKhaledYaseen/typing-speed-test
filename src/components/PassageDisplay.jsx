// PassageDisplay component
// Props:
//   passage (string) — full passage text
//   typedChars ({char, status}[]) — array of typed characters with status
//   cursorIndex (number) — current cursor position
//   testState ('idle'|'running'|'complete') — current test state
//   onStart (fn) — called when Start button clicked
//   onRestart (fn) — called when Restart button clicked

export default function PassageDisplay({
  passage,
  typedChars,
  cursorIndex,
  testState,
  onStart,
  onRestart,
}) {
  // Determine class for each character span
  const getCharClass = (index) => {
    if (index < typedChars.length) {
      return typedChars[index].status === 'correct'
        ? 'text-[hsl(140,63%,57%)]'           // green
        : 'text-[hsl(354,63%,57%)] underline'  // red + underline
    }
    if (index === cursorIndex) return 'text-[#999] relative'  // cursor position
    return 'text-[#737373]'                                    // untyped
  }

  return (
    <div className="relative px-7 md:px-14 py-6">
      {/* Separator line */}
      <div className="absolute top-0 left-7 right-7 md:left-14 md:right-14 h-px bg-[#333]" />

      {/* Passage text */}
      <div
        className={`font-mono text-[22px] md:text-[35px] leading-[40px] md:leading-[55px] select-none
          ${testState === 'idle' ? 'blur-[5.5px] opacity-57 pointer-events-none' : ''}`}
        onClick={testState === 'idle' ? onStart : undefined}
      >
        {passage.split('').map((char, i) => (
          <span key={i} className={getCharClass(i)}>
            {i === cursorIndex && testState === 'running' && (
              <span className="cursor-blink" />
            )}
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Idle overlay */}
      {testState === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <button
            onClick={onStart}
            className="bg-[#4da8ff] text-white font-semibold text-[20px] rounded-[12px] px-8 h-[56px] hover:bg-[hsl(210,100%,65%)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#589ed6]"
          >
            Start Typing Test
          </button>
          <p className="text-white font-semibold text-[20px]">
            Or click the text and start typing
          </p>
        </div>
      )}

      {/* Restart button (running/complete) */}
      {testState === 'running' && (
        <div className="mt-8 flex justify-center">
          <div className="w-full h-px bg-[#333] mb-8" />
        </div>
      )}
    </div>
  )
}
