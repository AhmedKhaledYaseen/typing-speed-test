// Controls component
// Props: difficulty ('easy'|'medium'|'hard'), mode ('timed'|'passage'),
//        onDifficultyChange (fn), onModeChange (fn)

const DIFFICULTIES = ['easy', 'medium', 'hard']
const MODES = [
  { value: 'timed', label: 'Timed (60s)' },
  { value: 'passage', label: 'Passage' },
]

export default function Controls({ difficulty, mode, onDifficultyChange, onModeChange }) {
  // Pill button classes
  const pillBase = 'h-[31px] px-2.5 rounded-[7px] border border-solid text-[16px] cursor-pointer transition-colors whitespace-nowrap'
  const pillActive = 'border-[#589ed6] text-[#589ed6] bg-[#111]'
  const pillInactive = 'border-[#666] text-white bg-[#111] hover:border-[#589ed6] hover:text-[#589ed6]'

  // Dropdown classes
  const dropdownBase = 'flex items-center justify-between gap-2 h-[42px] px-4 rounded-full border border-[#444] bg-[#111] text-white text-[16px] cursor-pointer appearance-none'

  return (
    <div className="w-full">
      {/* Mobile: 2 dropdowns */}
      <div className="flex md:hidden gap-3 py-2">
        <div className="relative flex-1">
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className={`${dropdownBase} w-full`}
          >
            {DIFFICULTIES.map(d => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
          <img
            src="/assets/images/icon-down-arrow.svg"
            alt=""
            className="absolute right-4 top-1/2 -translate-y-1/2 w-3 pointer-events-none"
          />
        </div>
        <div className="relative flex-1">
          <select
            value={mode}
            onChange={(e) => onModeChange(e.target.value)}
            className={`${dropdownBase} w-full`}
          >
            {MODES.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <img
            src="/assets/images/icon-down-arrow.svg"
            alt=""
            className="absolute right-4 top-1/2 -translate-y-1/2 w-3 pointer-events-none"
          />
        </div>
      </div>

      {/* Desktop: pill buttons */}
      <div className="hidden md:flex items-center gap-2">
        <span className="text-[#999] text-[16px] mr-2">Difficulty:</span>
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            onClick={() => onDifficultyChange(d)}
            className={`${pillBase} ${difficulty === d ? pillActive : pillInactive}`}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
        <div className="bg-[#333] w-px h-[31px] mx-3" />
        <span className="text-[#999] text-[16px] mr-2">Mode:</span>
        {MODES.map(m => (
          <button
            key={m.value}
            onClick={() => onModeChange(m.value)}
            className={`${pillBase} ${mode === m.value ? pillActive : pillInactive}`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}
