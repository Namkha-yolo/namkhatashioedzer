import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Dispatch, SetStateAction } from 'react'
import type { ArtPiece } from '../site/artImages'

interface Props {
  pieces: ArtPiece[]
  index: number
  setIndex: Dispatch<SetStateAction<number | null>>
}

/** A piece popped out over a dimmed backdrop, with a description panel beside
 *  it. Esc closes; ←/→ navigate; clicking the backdrop closes. */
export function ArtLightbox({ pieces, index, setIndex }: Props) {
  const total = pieces.length
  const piece = pieces[index]

  const close = useCallback(() => setIndex(null), [setIndex])
  const prev = useCallback(() => setIndex((p) => (p != null && p > 0 ? p - 1 : p)), [setIndex])
  const next = useCallback(() => setIndex((p) => (p != null && p < total - 1 ? p + 1 : p)), [setIndex, total])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [close, prev, next])

  return createPortal(
    <div
      className="art-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`artwork ${index + 1} of ${total}`}
      onClick={close}
    >
      <button className="art-close" type="button" onClick={close} aria-label="close" autoFocus>
        ×
      </button>
      <div className="art-lightbox" onClick={(e) => e.stopPropagation()}>
        <div className="art-lightbox__img">
          <img src={piece.src} alt={piece.title || `artwork ${index + 1}`} />
        </div>
        <aside className="art-lightbox__aside">
          <div className="art-lightbox__count">
            art <span className="dot">·</span> {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <h3 className="art-lightbox__title">{piece.title || 'untitled'}</h3>
          {piece.year && <div className="art-lightbox__year">{piece.year}</div>}
          <p className={`art-lightbox__desc${piece.description ? '' : ' is-empty'}`}>
            {piece.description || 'no description yet.'}
          </p>
          <div className="art-lightbox__nav">
            <button type="button" onClick={prev} disabled={index === 0}>
              ← prev
            </button>
            <button type="button" onClick={next} disabled={index === total - 1}>
              next →
            </button>
          </div>
        </aside>
      </div>
    </div>,
    document.body,
  )
}
