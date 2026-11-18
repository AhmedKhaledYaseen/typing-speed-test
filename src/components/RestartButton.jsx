// RestartButton component — shown while test is running
// Props: onRestart (fn)
export default function RestartButton({ onRestart }) {
  return (
    <div className="w-full flex flex-col items-center pt-6 pb-12">
      <div className="w-full h-px bg-[#333] mb-8" />
      <button
        onClick={onRestart}
        className="flex items-center gap-2.5 bg-[#262626] text-white font-semibold text-base rounded-[10px] px-6 h-12 hover:bg-[#333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#589ed6] cursor-pointer"
      >
        <span>Restart Test</span>
        <img src="/assets/images/icon-restart.svg" alt="" className="w-4 h-4" />
      </button>
    </div>
  )
}
