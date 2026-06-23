import { useState } from 'react'
import { artPieces } from '../site/artImages'
import { ArtLightbox } from './ArtLightbox'

// deterministic per-index scatter (stable across renders)
function variant(i: number): string {
  if (i % 11 === 4) return 'big'
  if (i % 7 === 2) return 'tall'
  if (i % 5 === 1) return 'wide'
  return ''
}
function rot(i: number): number {
  return ((i * 53) % 15) - 7 // -7°..+7°
}

// optional deep-link: ?art=<1-based number> opens that piece
function initialOpen(): number | null {
  const raw = new URLSearchParams(window.location.search).get('art')
  const n = raw ? parseInt(raw, 10) : NaN
  return Number.isInteger(n) && n >= 1 && n <= artPieces.length ? n - 1 : null
}

export function ArtSection({ active, onBack }: { active: boolean; onBack: () => void }) {
  const [open, setOpen] = useState<number | null>(initialOpen)

  return (
    <section className={`projects-section art-section${active ? ' active' : ''}`} id="art-section" data-section="art">
      <div className="section-header">
        <h1 className="section-title">ART</h1>
        <button className="back-btn" onClick={onBack}>
          ← return
        </button>
      </div>
      <div className="art-collage">
        {artPieces.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className={`art-item ${variant(i)}`.trim()}
            style={{ transform: `rotate(${rot(i)}deg)` }}
            onClick={() => setOpen(i)}
            aria-label={`open ${p.title || `artwork ${i + 1}`} of ${artPieces.length}`}
          >
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && <ArtLightbox pieces={artPieces} index={open} setIndex={setOpen} />}
    </section>
  )
}
