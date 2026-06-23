// Curated software work. The four repos below are the pinned projects on
// github.com/Namkha-yolo; OnlyWorks and Rigden Studios are featured separately
// since they're products that span private/org repos rather than a single pin.

interface SoftwareProject {
  name: string
  description: string
  url: string
  stack: string
  live?: string
  featured?: boolean
}

const PROJECTS: SoftwareProject[] = [
  {
    name: 'OnlyWorks',
    featured: true,
    description:
      'Cross-platform Electron productivity app — a screen-aware capture pipeline on Redis handling 10k+ captures a day, a 60+ endpoint REST API, and a Next.js marketing site with Stripe subscriptions.',
    stack: 'Electron · Next.js · Redis · Stripe',
    url: 'https://only-works.com',
    live: 'https://only-works.com',
  },
  {
    name: 'Rigden Studios',
    featured: true,
    description:
      'Custom e-commerce platform built to skip Shopify’s fees — PCI-compliant Stripe checkout handling 200+ monthly orders, with conversion up 40%.',
    stack: 'React · Stripe · MongoDB',
    url: 'https://github.com/Namkha-yolo/rigdenstudios',
  },
  {
    name: 'ClipVibe',
    description:
      'Mood-based video editor on the web: upload clips, auto-enhance and colour-grade them through an FFmpeg + Claude-vision pipeline, pick one of six looks, add royalty-free music, and export a reel.',
    stack: 'TypeScript · FFmpeg · Supabase',
    url: 'https://github.com/Namkha-yolo/video_editor',
    live: 'https://clipvibe-demo.duckdns.org/',
  },
  {
    name: 'mini-siem',
    description:
      'A mini SIEM that watches SSH auth logs and flags brute-force attacks in real time. Built as a CSCI 499 security practicum.',
    stack: 'Python',
    url: 'https://github.com/Namkha-yolo/mini-siem',
  },
  {
    name: 'Brain Tumor Classification',
    description: 'A deep-learning notebook that classifies brain-tumor types from MRI scans.',
    stack: 'Jupyter Notebook',
    url: 'https://github.com/Namkha-yolo/Brain-Tumor-Classification-Model',
  },
  {
    name: 'Snapping Parking Signs to the Curb',
    description:
      'An NYC DOT (Fall ’24) project that snaps parking-sign data onto the correct curb, with a live interactive map.',
    stack: 'JavaScript',
    url: 'https://github.com/Namkha-yolo/DOT-Fall-24-Snapping-Parking-Signs-to-the-curb',
    live: 'https://dot-fall-24-snapping-parking-signs.vercel.app',
  },
]

export function SoftwareSection({ active, onBack }: { active: boolean; onBack: () => void }) {
  return (
    <section className={`projects-section full-bleed${active ? ' active' : ''}`} id="swe-section" data-section="swe">
      <div className="section-header">
        <h1 className="section-title">SOFTWARE</h1>
        <button className="back-btn" onClick={onBack}>
          ← return
        </button>
      </div>
      <p className="repo-intro">
        selected work · more at{' '}
        <a href="https://github.com/Namkha-yolo" target="_blank" rel="noopener noreferrer">
          github.com/Namkha-yolo
        </a>
      </p>
      <div className="repo-list">
        {PROJECTS.map((p) => (
          <a
            className={`repo-card${p.featured ? ' featured' : ''}`}
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="repo-top">
              <span className="repo-name">{p.name}</span>
              <span className="repo-lang">{p.stack}</span>
            </div>
            <p className="repo-desc">{p.description}</p>
            <div className="repo-meta">
              <span className="repo-link">{p.featured ? 'product ✦' : 'github ↗'}</span>
              {p.live && <span>· live demo</span>}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
