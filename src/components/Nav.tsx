import type { MouseEvent } from 'react'

interface Props {
  clock: string
  onLogo: () => void
  onNav: (section: string) => void
}

export function Nav({ clock, onLogo, onNav }: Props) {
  const go = (section: string) => (e: MouseEvent) => {
    e.preventDefault()
    onNav(section)
  }
  return (
    <nav>
      <a
        className="logo"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onLogo()
        }}
      >
        NAMKHA
      </a>
      <div className="nav-mid">
        <span className="nav-clock" id="navClock">
          {clock}
        </span>
      </div>
      <div className="nav-links">
        <a href="#" onClick={go('swe')}>
          WORK
        </a>
        <a href="#" onClick={go('words')}>
          DIARY
        </a>
        <a href="#" onClick={go('guestbook')}>
          SIGN
        </a>
      </div>
    </nav>
  )
}
