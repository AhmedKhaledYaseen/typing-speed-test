// StatsBar component
// Props: wpm (number), accuracy (number), time (string)
export default function StatsBar({ wpm, accuracy, time }) {
  const accuracyColor = accuracy < 100 ? 'text-[hsl(354,63%,57%)]' : 'text-white'
  const timeColor = 'text-[hsl(49,85%,70%)]'

  return (
    <div className="w-full shrink-0">
      {/* Mobile: 3-col grid */}
      <div className="grid grid-cols-3 md:hidden gap-4 py-2">
        <div>
          <p className="text-[#999] text-sm">WPM:</p>
          <p className="text-white font-bold text-2xl sm:text-3xl">{wpm}</p>
        </div>
        <div>
          <p className="text-[#999] text-sm">Accuracy:</p>
          <p className={`font-bold text-2xl sm:text-3xl ${accuracyColor}`}>{accuracy}%</p>
        </div>
        <div>
          <p className="text-[#999] text-sm">Time:</p>
          <p className={`font-bold text-2xl sm:text-3xl ${timeColor}`}>{time}</p>
        </div>
      </div>

      {/* Desktop: single row */}
      <div className="hidden md:flex items-center gap-0 py-2 shrink-0">
        <span className="text-[#999] text-[17px] lg:text-[20px]">WPM:</span>
        <span className="text-white font-bold text-[22px] lg:text-[25px] ml-2.5 lg:ml-4">{wpm}</span>
        <div className="bg-[#333] w-px h-[24px] lg:h-[26px] mx-3 lg:mx-6 shrink-0" />
        <span className="text-[#999] text-[17px] lg:text-[20px]">Accuracy:</span>
        <span className={`font-bold text-[22px] lg:text-[25px] ml-2.5 lg:ml-4 ${accuracyColor}`}>{accuracy}%</span>
        <div className="bg-[#333] w-px h-[24px] lg:h-[26px] mx-3 lg:mx-6 shrink-0" />
        <span className="text-[#999] text-[17px] lg:text-[20px]">Time:</span>
        <span className={`font-bold text-[22px] lg:text-[25px] ml-2.5 lg:ml-4 ${timeColor}`}>{time}</span>
      </div>
    </div>
  )
}
