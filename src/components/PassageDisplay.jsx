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
    <div className="relative py-8 my-4 border-t border-[#333] w-full">
      {/* Passage text with proper wrapping */}
      <div
        className={`font-mono text-[20px] md:text-[34px] leading-[38px] md:leading-[55px] select-none break-words whitespace-pre-wrap
          ${testState === 'idle' ? 'blur-[5.5px] opacity-60 pointer-events-none' : ''}`}
        onClick={testState === 'idle' ? onStart : undefined}
      >
        {passage.split('').map((char, i) => (
          <span key={i} className={getCharClass(i)}>
            {i === cursorIndex && testState === 'running' && (
              <span className="cursor-blink" />
            )}
            {char}
          </span>
        ))}
      </div>

      {/* Idle overlay - perfectly centered */}
      {testState === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <button
            onClick={onStart}
            className="bg-[#4da8ff] text-white font-semibold text-[20px] rounded-[12px] px-8 h-[56px] hover:bg-[hsl(210,100%,65%)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#589ed6] cursor-pointer shadow-lg"
          >
            Start Typing Test
          </button>
          <p className="text-white font-semibold text-[18px] md:text-[20px] mt-4">
            Or click the text and start typing
          </p>
        </div>
      )}
    </div>
  )
}
