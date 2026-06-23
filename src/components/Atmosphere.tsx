// Visible atmosphere only — the soft dusk wash + paper grain. The mandala,
// cursor, clock-overlay, marquee, horizon and prayer-wheel are display:none in
// the stylesheet, so they are intentionally not rendered.
export function Atmosphere() {
  return (
    <>
      <div className="dusk-wash" aria-hidden="true"></div>
      <svg className="paper-grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="paperNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            values="0 0 0 0 0.075
                    0 0 0 0 0.066
                    0 0 0 0 0.058
                    0 0 0 0.55 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperNoise)" />
      </svg>
    </>
  )
}
