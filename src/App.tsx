import { useEffect, useState } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ArtSection } from './components/ArtSection'
import { SoftwareSection } from './components/SoftwareSection'
import { ResearchSection } from './components/ResearchSection'
import {
  NowSection,
  WordsSection,
  TracesSection,
  TapesSection,
  GuestbookSection,
} from './components/DiarySections'

// every view reachable from the wheel, the nav, or a deep link
const SECTIONS = ['swe', 'ai', 'fashion', 'art', 'now', 'words', 'traces', 'tapes', 'guestbook']

const pad = (n: number) => String(n).padStart(2, '0')

export default function App() {
  const [view, setView] = useState('hero')
  const [now, setNow] = useState(() => new Date())

  function showSection(key: string) {
    setView(key)
    window.scrollTo(0, 0)
  }

  function showHero() {
    setView('hero')
    window.scrollTo(0, 0)
  }

  // live clock — drives the nav clock and the NOW section
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // esc returns home
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') showHero()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // deep-linking — read ?section= or #section on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const initial = params.get('section') || window.location.hash.slice(1)
    if (initial && SECTIONS.includes(initial)) showSection(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const h = now.getHours()
  const hr12 = h % 12 || 12
  const ampm = h >= 12 ? 'PM' : 'AM'
  const navClock = `${pad(hr12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`
  const nowDate = now
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    .toLowerCase()
  const lastTouched = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · ${pad(h)}:${pad(now.getMinutes())} local`

  return (
    <>
      <Atmosphere />
      <Nav clock={navClock} onLogo={showHero} onNav={showSection} />
      <Hero hidden={view !== 'hero'} onRealm={showSection} />

      <SoftwareSection active={view === 'swe'} onBack={showHero} />
      <ResearchSection active={view === 'ai'} onBack={showHero} />

      <section
        className={`projects-section full-bleed${view === 'fashion' ? ' active' : ''}`}
        id="fashion-section"
        data-section="fashion"
      >
        <div className="section-header">
          <h1 className="section-title">PIXELS</h1>
          <button className="back-btn" onClick={showHero}>
            ← return
          </button>
        </div>
        <div className="coming-soon">
          <h3>coming soon</h3>
          <p>this realm is being stitched together.</p>
        </div>
      </section>

      <ArtSection active={view === 'art'} onBack={showHero} />

      <NowSection active={view === 'now'} onBack={showHero} nowDate={nowDate} lastTouched={lastTouched} />
      <WordsSection active={view === 'words'} onBack={showHero} />
      <TracesSection active={view === 'traces'} onBack={showHero} />
      <TapesSection active={view === 'tapes'} onBack={showHero} />
      <GuestbookSection active={view === 'guestbook'} onBack={showHero} />
    </>
  )
}
