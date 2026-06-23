import type { MouseEvent } from 'react'

interface Props {
  hidden: boolean
  onRealm: (section: string) => void
}

export function Hero({ hidden, onRealm }: Props) {
  const realm = (section: string) => (e: MouseEvent) => {
    e.preventDefault()
    onRealm(section)
  }
  return (
    <section className={`hero page${hidden ? ' hidden' : ''}`} id="hero">
      {/* thangka accent — top-right of the landing page */}
      <figure className="hero-thangka">
        <img src="/thangka.png" alt="" aria-hidden="true" />
        <figcaption>outside the wheel of existence</figcaption>
      </figure>

      {/* hand-drawn corner ornaments */}
      <svg className="ornament o-tl" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M 8 88 L 30 52 L 44 68 L 58 36 L 78 60 L 92 44 L 112 78 L 112 92 L 8 92 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 30 52 L 30 56 M 58 36 L 58 40 M 92 44 L 92 48" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="ornament o-tr" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M 16 44 Q 12 38 22 36 Q 22 28 34 30 Q 38 22 52 26 Q 60 24 64 32 Q 76 30 76 40 Q 72 46 64 44 Q 56 50 46 46 Q 36 50 28 46 Q 18 50 16 44 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 56 76 Q 52 70 62 68 Q 64 60 76 62 Q 82 56 92 60 Q 100 60 100 68 Q 96 74 88 72 Q 80 76 72 74 Q 62 78 56 76 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className="ornament o-bl" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M 60 100 Q 30 78 38 50 Q 44 56 50 52 Q 46 36 56 22 Q 60 36 70 38 Q 66 28 78 18 Q 80 38 88 50 Q 96 78 60 100 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 60 80 Q 52 70 56 58 Q 60 64 64 60 Q 62 50 68 42 Q 70 58 64 70 Q 64 78 60 80 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="ornament o-br" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M 60 20 L 96 60 L 60 100 L 24 60 Z M 36 36 L 84 84 M 84 36 L 36 84 M 60 32 L 60 88 M 32 60 L 88 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="hero-split">
        {/* LEFT: intro */}
        <div className="hero-intro-col">
          <h1 className="hi-title">
            pursuit of
            <br />
            <em>happiness</em>
            <br />
            over &amp; over
          </h1>
          <p className="hi-lede">
            a portfolio, and everything else about me in a nutshell
          </p>
          <div className="hi-meta">
            <span className="hi-meta-line">
              <span className="hi-meta-key">now</span>
              <span className="hi-meta-val">
                building <em>Lotsawa v2</em>
              </span>
            </span>
            <span className="hi-meta-line">
              <span className="hi-meta-key">reading</span>
              <span className="hi-meta-val">the hidden lamp</span>
            </span>
            <span className="hi-meta-line">
              <span className="hi-meta-key">mfg</span>
              <span className="hi-meta-val">2002</span>
            </span>
            <span className="hi-meta-line">
              <span className="hi-meta-key">exp</span>
              <span className="hi-meta-val">tbd soon</span>
            </span>
            <span className="hi-meta-line">
              <span className="hi-meta-key">contact</span>
              <span className="hi-meta-val">
                <a className="hi-link" href="mailto:oedzernamkha@gmail.com">oedzernamkha@gmail.com</a>
              </span>
            </span>
            <span className="hi-meta-line">
              <span className="hi-meta-key">sounds</span>
              <span className="hi-meta-val">
                <a
                  className="hi-link"
                  href="https://soundcloud.com/dallay-kewa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  soundcloud ↗
                </a>
              </span>
            </span>
          </div>
        </div>

        {/* RIGHT: the wheel */}
        <div className="wheel-wrap">
          <img className="yama-img" src="/yama-traced.svg" alt="" aria-hidden="true" />

          <svg className="wheel-ring" viewBox="-350 -350 700 700" aria-hidden="true">
            <circle r="295" fill="none" stroke="currentColor" strokeWidth="2" />
            <g className="realms">
              <path className="realm r-art" d="M -70 -121.2 L -147.5 -255.5 A 295 295 0 0 1 147.5 -255.5 L 70 -121.2 A 140 140 0 0 0 -70 -121.2 Z" />
              <path className="realm r-software" d="M 70 -121.2 L 147.5 -255.5 A 295 295 0 0 1 295 0 L 140 0 A 140 140 0 0 0 70 -121.2 Z" />
              <path className="realm r-research" d="M 140 0 L 295 0 A 295 295 0 0 1 147.5 255.5 L 70 121.2 A 140 140 0 0 0 140 0 Z" />
              <path className="realm r-diary" d="M 70 121.2 L 147.5 255.5 A 295 295 0 0 1 -147.5 255.5 L -70 121.2 A 140 140 0 0 0 70 121.2 Z" />
              <path className="realm r-pixels" d="M -70 121.2 L -147.5 255.5 A 295 295 0 0 1 -295 0 L -140 0 A 140 140 0 0 0 -70 121.2 Z" />
              <path className="realm r-sayhi" d="M -140 0 L -295 0 A 295 295 0 0 1 -147.5 -255.5 L -70 -121.2 A 140 140 0 0 0 -140 0 Z" />
            </g>
            <g stroke="var(--ink)" strokeWidth="1.6" fill="none">
              <line x1="-51" y1="-88.33" x2="-147.5" y2="-255.5" />
              <line x1="51" y1="-88.33" x2="147.5" y2="-255.5" />
              <line x1="102" y1="0" x2="295" y2="0" />
              <line x1="51" y1="88.33" x2="147.5" y2="255.5" />
              <line x1="-51" y1="88.33" x2="-147.5" y2="255.5" />
              <line x1="-102" y1="0" x2="-295" y2="0" />
            </g>
            <circle r="102" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
            <circle r="98" fill="var(--paper)" stroke="none" />
          </svg>

          {/* 6 realm labels (HTML overlays) */}
          <a className="realm-link rl-art" data-category="art" href="#" onClick={realm('art')}>
            <span className="r-name">art</span>
          </a>
          <a className="realm-link rl-software" data-category="swe" href="#" onClick={realm('swe')}>
            <span className="r-name">software</span>
          </a>
          <a className="realm-link rl-research" data-category="ai" href="#" onClick={realm('ai')}>
            <span className="r-name">research</span>
          </a>
          <a className="realm-link rl-diary" data-category="words" href="#" onClick={realm('words')}>
            <span className="r-name">diary</span>
          </a>
          <a className="realm-link rl-pixels" data-category="fashion" href="#" onClick={realm('fashion')}>
            <span className="r-name">pixels</span>
          </a>
          <a className="realm-link rl-sayhi" data-category="guestbook" href="#" onClick={realm('guestbook')}>
            <span className="r-name">say hi</span>
          </a>

          <figure className="hub">
            <img src="/profile.png" alt="portrait of namkha" />
          </figure>

          <div className="wheel-label">
            <span className="wl-tib">སྲིད་པའི་འཁོར་ལོ</span>
            <span className="wl-rom">the wheel of existence</span>
          </div>
        </div>
      </div>

      <footer className="hero-colophon">
        <div className="cf-left">
          <span className="cf-est">MFG 2002</span>
          <span className="cf-dot">·</span>
          <span className="cf-est">EXP TBD SOON</span>
        </div>
        <div className="cf-right">
          <span className="tib">བཀྲ་ཤིས་བདེ་ལེགས།</span>
          <span>tashi delek</span>
        </div>
      </footer>
    </section>
  )
}
