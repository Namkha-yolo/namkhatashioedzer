import { Fragment } from 'react'
import { lotsawaMeta, lotsawaSections, lotsawaResults } from '../site/lotsawa'

export function ResearchSection({ active, onBack }: { active: boolean; onBack: () => void }) {
  return (
    <section className={`projects-section full-bleed${active ? ' active' : ''}`} id="ai-section" data-section="ai">
      <div className="section-header">
        <h1 className="section-title">RESEARCH</h1>
        <button className="back-btn" onClick={onBack}>
          ← return
        </button>
      </div>

      <div className="research-doc">
        <h2 className="research-title">{lotsawaMeta.title}</h2>
        <p className="research-sub">{lotsawaMeta.subtitle}</p>
        <p className="research-byline">
          {lotsawaMeta.author} · <a href={`mailto:${lotsawaMeta.email}`}>{lotsawaMeta.email}</a>
        </p>
        <a className="research-pdf" href={lotsawaMeta.pdf} target="_blank" rel="noopener noreferrer">
          read the full paper (pdf) ↗
        </a>

        {lotsawaSections.map((s, i) => (
          <Fragment key={i}>
            <section className="research-section">
              <h3 className="research-h">{s.heading}</h3>
              {s.paras.map((p, j) => (
                <p className="research-p" key={j}>
                  {p}
                </p>
              ))}
            </section>
            {s.heading.startsWith('Evaluation') && (
              <>
                <table className="research-table">
                  <thead>
                    <tr>
                      <th>system</th>
                      <th>top-1</th>
                      <th>top-5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotsawaResults.map((r) => (
                      <tr key={r.system}>
                        <td>{r.system}</td>
                        <td>{r.top1}</td>
                        <td>{r.top5}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="research-cap">held-out accuracy on 20,000 sentence-level queries.</p>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
