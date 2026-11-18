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
    <div className="relative flex flex-col items-center justify-center w-full max-w-[640px] mx-auto py-6">
      {/* Decorative stars placed to the sides */}
      <img
        src="/assets/images/pattern-star-1.svg"
        alt=""
        className="hidden md:block absolute -left-16 top-12 w-8 opacity-80 pointer-events-none"
      />
      <img
        src="/assets/images/pattern-star-2.svg"
        alt=""
        className="hidden md:block absolute -right-16 bottom-20 w-7 opacity-80 pointer-events-none"
      />

      {/* Result icon with clean glow */}
      <div className="mb-6 relative flex items-center justify-center">
        {!isNewPB ? (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-[hsl(140,63%,57%)] opacity-10" />
            <div className="absolute w-20 h-20 rounded-full bg-[hsl(140,63%,57%)] opacity-20" />
            <img
              src={config.icon}
              alt=""
              className="relative w-16 h-16"
            />
          </div>
        ) : (
          <img
            src={config.icon}
            alt=""
            className="w-16 h-16 md:w-20 md:h-20"
          />
        )}
      </div>

      {/* Title */}
      <h2 className="text-white font-bold text-3xl md:text-[40px] mb-2 text-center tracking-tight">
        {config.title}
      </h2>
      <p className="text-[#999] text-base md:text-[18px] mb-8 text-center max-w-md">
        {config.subtitle}
      </p>

      {/* Stats cards — 3 column on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-8">
        <div className="border border-[#262626] rounded-xl p-4 bg-[#141414]">
          <p className="text-[#999] text-sm mb-1">WPM:</p>
          <p className="text-white font-bold text-3xl">{wpm}</p>
        </div>
        <div className="border border-[#262626] rounded-xl p-4 bg-[#141414]">
          <p className="text-[#999] text-sm mb-1">Accuracy:</p>
          <p className="text-[hsl(140,63%,57%)] font-bold text-3xl">{accuracy}%</p>
        </div>
        <div className="border border-[#262626] rounded-xl p-4 bg-[#141414]">
          <p className="text-[#999] text-sm mb-1">Characters</p>
          <p className="font-bold text-3xl">
            <span className="text-[hsl(140,63%,57%)]">{correctChars}</span>
            <span className="text-[#555]">/</span>
            <span className="text-[hsl(354,63%,57%)]">{incorrectChars}</span>
          </p>
        </div>
      </div>

      {/* Action button */}
      <div className="z-10 mb-8">
        <button
          onClick={onGoAgain}
          className="flex items-center gap-2.5 bg-white text-black font-semibold text-base md:text-lg rounded-full px-8 h-13 hover:bg-[#e6e6e6] transition-all focus:outline-none focus:ring-2 focus:ring-[#589ed6] cursor-pointer shadow-md"
        >
          <span>{config.buttonText}</span>
          <img src="/assets/images/icon-restart.svg" alt="" className="w-4 h-4 invert" />
        </button>
      </div>
    </div>
  )
}
