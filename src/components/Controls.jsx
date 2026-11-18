import { useState, useRef, useEffect } from 'react'

const DIFFICULTIES = ['easy', 'medium', 'hard']
const MODES = [
  { value: 'timed', label: 'Timed (60s)' },
  { value: 'passage', label: 'Passage' },
]

export default function Controls({ difficulty, mode, onDifficultyChange, onModeChange }) {
  const [openDropdown, setOpenDropdown] = useState(null) // 'difficulty' | 'mode' | null
  const containerRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentModeLabel = MODES.find(m => m.value === mode)?.label || mode

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Mobile: Interactive dropdown triggers + custom radio menus */}
      <div className="flex md:hidden gap-3 py-2">
        {/* Difficulty trigger */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'difficulty' ? null : 'difficulty')}
            className="flex items-center justify-between w-full h-[42px] px-4 rounded-full border border-[#444] bg-[#111] text-white text-[15px] font-medium hover:border-[#589ed6] focus:outline-none focus:ring-2 focus:ring-[#589ed6] cursor-pointer"
          >
            <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
            <img
              src="/assets/images/icon-down-arrow.svg"
              alt=""
              className={`w-3 transition-transform ${openDropdown === 'difficulty' ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Difficulty Dropdown Menu */}
          {openDropdown === 'difficulty' && (
            <div className="absolute top-[48px] left-0 w-full bg-[#1c1c1c] border border-[#333] rounded-xl p-2 shadow-2xl z-30 flex flex-col gap-1">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    onDifficultyChange(d)
                    setOpenDropdown(null)
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[15px] hover:bg-[#282828] transition-colors cursor-pointer text-white"
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${difficulty === d ? 'border-[#4da8ff]' : 'border-[#666]'}`}>
                    {difficulty === d && <span className="w-2 h-2 rounded-full bg-[#4da8ff]" />}
                  </span>
                  <span>{d.charAt(0).toUpperCase() + d.slice(1)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mode trigger */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'mode' ? null : 'mode')}
            className="flex items-center justify-between w-full h-[42px] px-4 rounded-full border border-[#444] bg-[#111] text-white text-[15px] font-medium hover:border-[#589ed6] focus:outline-none focus:ring-2 focus:ring-[#589ed6] cursor-pointer"
          >
            <span className="truncate">{currentModeLabel}</span>
            <img
              src="/assets/images/icon-down-arrow.svg"
              alt=""
              className={`w-3 shrink-0 ml-1 transition-transform ${openDropdown === 'mode' ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Mode Dropdown Menu */}
          {openDropdown === 'mode' && (
            <div className="absolute top-[48px] left-0 w-full bg-[#1c1c1c] border border-[#333] rounded-xl p-2 shadow-2xl z-30 flex flex-col gap-1">
              {MODES.map(m => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => {
                    onModeChange(m.value)
                    setOpenDropdown(null)
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-[15px] hover:bg-[#282828] transition-colors cursor-pointer text-white"
                >
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${mode === m.value ? 'border-[#4da8ff]' : 'border-[#666]'}`}>
                    {mode === m.value && <span className="w-2 h-2 rounded-full bg-[#4da8ff]" />}
                  </span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Pill buttons matching Figma */}
      <div className="hidden md:flex items-center gap-2">
        <span className="text-[#999] text-[16px] mr-2">Difficulty:</span>
        {DIFFICULTIES.map(d => {
          const isActive = difficulty === d
          return (
            <button
              key={d}
              onClick={() => onDifficultyChange(d)}
              className={`h-[31px] px-2.5 rounded-[7px] border border-solid text-[16px] cursor-pointer transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#589ed6] ${
                isActive
                  ? 'border-[#589ed6] text-[#589ed6] bg-[#111]'
                  : 'border-[#444] text-white bg-[#111] hover:border-[#589ed6] hover:text-[#589ed6]'
              }`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          )
        })}

        <div className="bg-[#333] w-px h-[31px] mx-3" />

        <span className="text-[#999] text-[16px] mr-2">Mode:</span>
        {MODES.map(m => {
          const isActive = mode === m.value
          return (
            <button
              key={m.value}
              onClick={() => onModeChange(m.value)}
              className={`h-[31px] px-2.5 rounded-[7px] border border-solid text-[16px] cursor-pointer transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#589ed6] ${
                isActive
                  ? 'border-[#589ed6] text-[#589ed6] bg-[#111]'
                  : 'border-[#444] text-white bg-[#111] hover:border-[#589ed6] hover:text-[#589ed6]'
              }`}
            >
              {m.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
