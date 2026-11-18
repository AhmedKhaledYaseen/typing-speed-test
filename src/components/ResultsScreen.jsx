// ResultsScreen component
// Props:
//   resultType ('normal'|'baseline'|'newPB')
//   wpm (number)
//   accuracy (number)
//   correctChars (number)
//   incorrectChars (number)
//   onGoAgain (fn)

const RESULT_CONFIG = {
  normal: {
    icon: '/assets/images/icon-completed.svg',
    title: 'Test Complete!',
    subtitle: 'Solid run. Keep pushing to beat your high score.',
    buttonText: 'Go Again',
  },
  baseline: {
    icon: '/assets/images/icon-completed.svg',
    title: 'Baseline Established!',
    subtitle: "You've set the bar. Now the real challenge begins—time to beat it.",
    buttonText: 'Beat This Score',
  },
  newPB: {
    icon: '/assets/images/icon-new-pb.svg',
    title: 'High Score Smashed!',
    subtitle: "You're getting faster. That was incredible typing.",
    buttonText: 'Beat This Score',
  },
}

export default function ResultsScreen({
  resultType,
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  onGoAgain,
}) {
  const config = RESULT_CONFIG[resultType] || RESULT_CONFIG.normal
  const isNewPB = resultType === 'newPB'

  return (
    <div className="relative flex flex-col items-center justify-center px-7 md:px-14 py-12 overflow-hidden min-h-[500px]">
      {/* Decorative stars */}
      <img
        src="/assets/images/pattern-star-1.svg"
        alt=""
        className="absolute top-8 left-8 w-8 opacity-80"
      />
      <img
        src="/assets/images/pattern-star-2.svg"
        alt=""
        className="absolute bottom-8 right-8 w-6 opacity-80"
      />

      {/* Result icon */}
      <div className={`mb-6 ${isNewPB ? '' : 'relative'}`}>
        {!isNewPB && (
          <>
            <div className="absolute inset-0 rounded-full bg-[hsl(140,63%,57%)] opacity-10 scale-150" />
            <div className="absolute inset-0 rounded-full bg-[hsl(140,63%,57%)] opacity-20 scale-125" />
          </>
        )}
        <img
          src={config.icon}
          alt=""
          className="relative w-16 h-16 md:w-20 md:h-20"
        />
      </div>

      {/* Title */}
      <h2 className="text-white font-bold text-3xl md:text-[40px] mb-3 text-center">
        {config.title}
      </h2>
      <p className="text-[#999] text-base md:text-lg mb-8 text-center max-w-md">
        {config.subtitle}
      </p>

      {/* Stats cards — desktop: row, mobile: stacked */}
      <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl mb-8">
        <div className="flex-1 border border-[#262626] rounded-lg p-4">
          <p className="text-[#999] text-sm mb-1">WPM:</p>
          <p className="text-white font-bold text-3xl">{wpm}</p>
        </div>
        <div className="flex-1 border border-[#262626] rounded-lg p-4">
          <p className="text-[#999] text-sm mb-1">Accuracy:</p>
          <p className="text-[hsl(354,63%,57%)] font-bold text-3xl">{accuracy}%</p>
        </div>
        <div className="flex-1 border border-[#262626] rounded-lg p-4">
          <p className="text-[#999] text-sm mb-1">Characters</p>
          <p className="font-bold text-3xl">
            <span className="text-[hsl(140,63%,57%)]">{correctChars}</span>
            <span className="text-[hsl(354,63%,57%)]">/{incorrectChars}</span>
          </p>
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={onGoAgain}
        className="flex items-center gap-2 border border-[#444] bg-white text-black font-semibold text-lg rounded-full px-8 h-14 hover:bg-[#eee] transition-colors focus:outline-none focus:ring-2 focus:ring-[#589ed6]"
      >
        {config.buttonText}
        <img src="/assets/images/icon-restart.svg" alt="" className="w-5 h-5" />
      </button>

      {/* Confetti for new PB */}
      {isNewPB && (
        <img
          src="/assets/images/pattern-confetti.svg"
          alt=""
          className="absolute bottom-0 left-0 right-0 w-full object-cover pointer-events-none"
        />
      )}
    </div>
  )
}
