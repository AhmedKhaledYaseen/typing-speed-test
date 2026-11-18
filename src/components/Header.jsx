// Header component
// Props: personalBest (number | null)
export default function Header({ personalBest }) {
  return (
    <header className="flex items-center justify-between py-4 md:py-6 w-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        {/* Mobile logo */}
        <img
          src="/assets/images/logo-small.svg"
          alt="Typing Speed Test"
          className="block md:hidden h-8 w-auto"
        />
        {/* Desktop logo */}
        <img
          src="/assets/images/logo-large.svg"
          alt="Typing Speed Test"
          className="hidden md:block h-12 w-auto"
        />
      </div>

      {/* Personal best */}
      {personalBest !== null && (
        <div className="flex items-center gap-2">
          <img
            src="/assets/images/icon-personal-best.svg"
            alt="Trophy"
            className="w-6 h-6"
          />
          <span className="text-[#999] text-sm md:text-[16.5px]">
            <span className="hidden md:inline">Personal best: </span>
            <span className="md:hidden">Best: </span>
          </span>
          <span className="text-white font-bold text-base md:text-lg">
            {personalBest} WPM
          </span>
        </div>
      )}
    </header>
  )
}
