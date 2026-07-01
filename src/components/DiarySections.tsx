import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

// journal texts dropped into the /diary folder (non-empty files only)
const diaryTxts = import.meta.glob('/diary/*.txt', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>
const diaryEntries = Object.entries(diaryTxts)
  .map(([path, raw]) => ({
    name: (path.split('/').pop() || '').replace(/\.txt$/i, '').replace(/([a-z])([A-Z])/g, '$1 $2'),
    body: raw.trim(),
  }))
  .filter((e) => e.body.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name))

interface SectionProps {
  active: boolean
  onBack: () => void
}

function Header({
  label,
  tib,
  subtitle,
  onBack,
}: {
  label: string
  tib?: string
  subtitle: ReactNode
  onBack: () => void
}) {
  return (
    <div className="section-header">
      <h1 className="section-title">
        {label}
        {tib && <span className="tib-sub">{tib}</span>}
      </h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
        <span className="section-subtitle">{subtitle}</span>
        <button className="back-btn" onClick={onBack}>
          ← return
        </button>
      </div>
    </div>
  )
}

/* ── NOW ─────────────────────────────────────────────────────────────── */
export function NowSection({
  active,
  onBack,
  nowDate,
  lastTouched,
}: SectionProps & { nowDate: string; lastTouched: string }) {
  return (
    <section className={`diary-section${active ? ' active' : ''}`} id="now-section" data-section="now">
      <Header
        label="now"
        tib="ད་ལྟ"
        onBack={onBack}
        subtitle={
          <>
            a moment in time <span className="dot">·</span> <span id="nowDate">{nowDate}</span>
          </>
        }
      />
      <div className="now-wrap">
        <div className="now-line">
          <span className="now-key">reading</span>
          <span className="now-val">
            <span className="tib">གློག་</span>
            <span className="accent">The Hidden Lamp</span>, alongside <em>Crafting Interpreters</em>
            <span className="sub">stories of awakened women + a tree-walking interpreter, on alternating days</span>
          </span>
        </div>
        <div className="now-line">
          <span className="now-key">listening</span>
          <span className="now-val">
            monastery chants from <span className="accent">Gyutö</span> + a half-finished beat tape
            <span className="sub">low end heavy, slow breath</span>
          </span>
        </div>
        <div className="now-line">
          <span className="now-key">building</span>
          <span className="now-val">
            this <span className="accent">site</span>, and <em>Lotsawa</em> v2 — wider syllable window, learned ranker
            <span className="sub">≥ 80% auto-select confidence is the target</span>
          </span>
        </div>
        <div className="now-line">
          <span className="now-key">watching</span>
          <span className="now-val">
            the <span className="accent">sky</span>
            <span className="sub">that thin saffron line at the cloud-deck</span>
          </span>
        </div>
        <div className="now-line">
          <span className="now-key">thinking</span>
          <span className="now-val">
            how to make the model smaller <em>and</em> kinder
            <span className="sub">distillation is easy; intention is hard</span>
          </span>
        </div>
        <div className="now-line">
          <span className="now-key">last touched</span>
          <span className="now-val">
            <span id="lastTouched">{lastTouched}</span>
            <span className="sub">this site is a slow file</span>
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── WORDS ───────────────────────────────────────────────────────────── */
export function WordsSection({ active, onBack }: SectionProps) {
  return (
    <section className={`diary-section${active ? ' active' : ''}`} id="words-section" data-section="words">
      <Header
        label="words"
        tib="ཡི་གེ"
        onBack={onBack}
        subtitle={
          <>
            journal <span className="dot">·</span> ongoing
          </>
        }
      />
      <div className="words-list">
        <article className="word-entry">
          <div className="word-date">
            2026 · 05 · 28<span className="moon">○</span> waning gibbous
          </div>
          <h3 className="word-title">
            <span className="tib">ས་གཞི།</span>the ground
          </h3>
          <p className="word-excerpt">
            Every morning a fresh empty file is the same as the empty sky over the same mountain. The cursor blinks where
            the wind would. I sit. I write a function. The function compiles. Nothing has happened. Everything has
            happened.
          </p>
        </article>
        <article className="word-entry">
          <div className="word-date">
            2026 · 05 · 12<span className="moon">●</span> full moon
          </div>
          <h3 className="word-title">
            <span className="tib">ཁ་མཐོས།</span>the keyboard remembers
          </h3>
          <p className="word-excerpt">
            Working on Lotsawa: the trie matches in &lt; 100ms, which is faster than thought. Tibetan is read
            left-to-right but stacks vertically — each syllable a tiny vertical mandala. I'm teaching the phone to feel a
            shape my grandmother already knew.
          </p>
        </article>
        <article className="word-entry">
          <div className="word-date">
            2026 · 04 · 22<span className="moon">◐</span> waxing crescent
          </div>
          <h3 className="word-title">
            <span className="tib">རི་བོ།</span>small models, big mountains
          </h3>
          <p className="word-excerpt">
            A 7B model on my laptop is enough — for most of what I actually need. The mountain doesn't get smaller when
            you finally see it clearly. The model doesn't get smaller when you finally know what to ask it. Local first.
            Quiet first. The cloud is far.
          </p>
        </article>
        <article className="word-entry">
          <div className="word-date">
            2026 · 03 · 15<span className="moon">◑</span> last quarter
          </div>
          <h3 className="word-title">
            <span className="tib">གསེར་སྐུད།</span>thread of gold
          </h3>
          <p className="word-excerpt">
            Three things that look the same but aren't: a debug print, a prayer, a mantra. Each one repeats. Each one
            shapes the body around it. Try printing <code>state</code> a hundred times in a row and tell me you don't
            feel different at the end.
          </p>
        </article>
        {diaryEntries.map((e) => (
          <article className="word-entry" key={e.name}>
            <div className="word-date">from the diary</div>
            <h3 className="word-title">{e.name}</h3>
            <p
              className="word-excerpt"
              style={{ whiteSpace: 'pre-line', fontFamily: 'var(--font-serif), var(--font-tibetan)' }}
            >
              {e.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ── TRACES ──────────────────────────────────────────────────────────── */
export function TracesSection({ active, onBack }: SectionProps) {
  return (
    <section className={`diary-section${active ? ' active' : ''}`} id="traces-section" data-section="traces">
      <Header
        label="traces"
        tib="རྗེས་ཤུལ"
        onBack={onBack}
        subtitle={
          <>
            fragments <span className="dot">·</span> collected
          </>
        }
      />
      <div className="traces-grid">
        <div className="trace-card" style={{ animationDelay: '.05s' }}>
          <div className="trace-kind quote">quote</div>
          <div className="trace-meta">
            <span>Gendun Chophel</span>
            <span>1947</span>
          </div>
          <p className="trace-body">
            <span className="tib">རིག་པའི་བུ་ཆུང་ཆགས་པའི་དབྱིངས་སུ་བརྒྱལ།</span>"The small child of awareness swoons in
            the sphere of desire." A line that has been writing itself into my head since I was seventeen.
          </p>
        </div>
        <div className="trace-card" style={{ animationDelay: '.15s' }}>
          <div className="trace-kind code">code</div>
          <div className="trace-meta">
            <span>lotsawa/trie.swift</span>
            <span>L42</span>
          </div>
          <p className="trace-body">
            the moment a trie node falls into <code>self</code> and the recursion finds itself standing on its own
            shoulders — i think that's grace.
          </p>
        </div>
        <div className="trace-card" style={{ animationDelay: '.25s' }}>
          <div className="trace-kind found">found</div>
          <div className="trace-meta">
            <span>courtyard wall</span>
            <span>03/2024</span>
          </div>
          <p className="trace-body">
            <span className="tib">འགྲོ་བ་མི་རྟག་པ།</span>chiseled into a stone that has outlasted every empire that
            pretended to outlast it. "beings are impermanent." carved by hand, painted in vermillion that has not faded.
          </p>
        </div>
        <div className="trace-card" style={{ animationDelay: '.35s' }}>
          <div className="trace-kind dream">dream</div>
          <div className="trace-meta">
            <span>05·02 · 04:17</span>
            <span>logged</span>
          </div>
          <p className="trace-body">
            a stupa made entirely of <code>println!</code> statements, each one a different prayer. the compiler is the
            lama. it tells me the warnings are blessings. i am only frightened by the errors that pass silently.
          </p>
        </div>
        <div className="trace-card" style={{ animationDelay: '.45s' }}>
          <div className="trace-kind quote">quote</div>
          <div className="trace-meta">
            <span>Dilgo Khyentse</span>
            <span>—</span>
          </div>
          <p className="trace-body">
            "Do not be a hindrance to others' practice. This is the entire teaching of all the Buddhas in one sentence."
            — i think about this every time i open a pull request.
          </p>
        </div>
        <div className="trace-card" style={{ animationDelay: '.55s' }}>
          <div className="trace-kind image">image</div>
          <div className="trace-meta">
            <span>thangka, 18th c.</span>
            <span>tinted scan</span>
          </div>
          <p className="trace-body">
            a wrathful protector painted with pigments that are now illegal: orpiment, lapis ground from afghan stone,
            vermillion from cinnabar. the colors that were dangerous to make are the ones that lasted.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── TAPES ───────────────────────────────────────────────────────────── */
interface Tape {
  tib: string
  title: string
  meta: string[]
  duration: string
}
const tapes: Tape[] = [
  { tib: 'དགུན་', title: 'winter, slow', meta: ['ambient', 'field recordings', '04·2026'], duration: '47:22' },
  { tib: 'རྨི་ལམ།', title: 'transformer dreams', meta: ['coding playlist', 'idm + dnb', 'updates monthly'], duration: '1:23:04' },
  { tib: 'སྔགས།', title: 'drangsong', meta: ['tibetan classical', "my father's records", 'digitized'], duration: '38:11' },
  { tib: 'བཀྲ་ཤིས།', title: 'tashi delek 808s', meta: ['beat tape', 'unreleased', 'wip'], duration: '22:38' },
  { tib: 'སྦྱར་', title: 'seam mix', meta: ['sufi + drum & bass', 'edge stitching', '02·2026'], duration: '54:09' },
]

export function TapesSection({ active, onBack }: SectionProps) {
  return (
    <section className={`diary-section${active ? ' active' : ''}`} id="tapes-section" data-section="tapes">
      <Header
        label="tapes"
        tib="སྒྲ"
        onBack={onBack}
        subtitle={
          <>
            audio <span className="dot">·</span> mixes &amp; finds
          </>
        }
      />
      <div className="tapes-list">
        {tapes.map((t) => (
          <div className="tape-item" key={t.title}>
            <div className="tape-reel"></div>
            <div className="tape-info">
              <div className="tape-title">
                <span className="tib">{t.tib}</span>
                {t.title}
              </div>
              <div className="tape-meta">
                {t.meta.map((m, i) => (
                  <span key={i}>
                    {i > 0 && <span className="dot">·</span>}
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="tape-duration">{t.duration}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── GUESTBOOK ───────────────────────────────────────────────────────── */
interface Entry {
  name: string
  from: string
  date: string
  body: string
  tib?: string
}

// Raw row shape returned by the Cloudflare D1 backend (see functions/api/guestbook.ts).
interface ApiRow {
  id: number
  name: string
  origin: string
  body: string
  tib: string | null
  created_at: string
}

// Same-origin by default (the API ships as a Pages Function alongside the site).
// Set VITE_GUESTBOOK_API to point at a standalone Worker if hosting elsewhere.
const API = `${import.meta.env.VITE_GUESTBOOK_API ?? ''}/api/guestbook`

const pad = (n: number) => String(n).padStart(2, '0')

// "2026-05-24 12:00:00" (D1) or any Date-parseable string → "05·24·2026"
function fmtDate(raw: string): string {
  const d = new Date(raw.includes('T') ? raw : raw.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return raw
  return `${pad(d.getMonth() + 1)}·${pad(d.getDate())}·${d.getFullYear()}`
}

const toEntry = (r: ApiRow): Entry => ({
  name: r.name,
  from: r.origin,
  date: fmtDate(r.created_at),
  body: r.body,
  tib: r.tib ?? undefined,
})

// Shown only if the backend can't be reached, so the page never looks broken.
const seedEntries: Entry[] = [
  { name: 'tenzin_', from: 'via twitter', date: '05·24·2026', tib: 'བཀྲ་ཤིས་', body: 'found this site through the Tibetan keyboard project — the mandala spinning behind everything got me. saved.' },
  { name: 'ribosome', from: 'ribo.zone', date: '04·30·2026', body: 'webring me. the friends section is right. saw it. left a 88×31 in your direction.' },
]

export function GuestbookSection({ active, onBack }: SectionProps) {
  const [entries, setEntries] = useState<Entry[]>(seedEntries)
  const [loaded, setLoaded] = useState(false)
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot — must stay empty
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  // load the real guestbook the first time the section is opened
  useEffect(() => {
    if (!active || loaded) return
    setLoaded(true)
    let cancelled = false
    fetch(API)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((rows: ApiRow[]) => {
        if (!cancelled) setEntries(rows.map(toEntry))
      })
      .catch(() => {
        /* offline — silently keep the seed entries as a graceful fallback */
      })
    return () => {
      cancelled = true
    }
  }, [active, loaded])

  async function submit(e: FormEvent) {
    e.preventDefault()
    const n = name.trim()
    const m = message.trim()
    if (!n || !m || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n, origin: from.trim(), body: m, website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      const row = (await res.json()) as ApiRow
      setEntries([toEntry(row), ...entries])
      setName('')
      setFrom('')
      setMessage('')
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={`diary-section${active ? ' active' : ''}`} id="guestbook-section" data-section="guestbook">
      <Header label="guestbook" subtitle="leave a trace" onBack={onBack} />
      <div className="guestbook-wrap">
        <div className="guestbook-entries" id="guestbookEntries">
          {entries.map((g, i) => (
            <article className="gb-entry" key={`${g.name}-${i}`}>
              <div className="gb-meta">
                <span className="gb-name">{g.name}</span>
                <span className="gb-from">{g.from}</span>
                <span className="gb-date">{g.date}</span>
              </div>
              <p className="gb-body">
                {g.tib && <span className="tib">{g.tib}</span>}
                {g.body}
              </p>
            </article>
          ))}
        </div>
        <form className="gb-form" onSubmit={submit}>
          <div className="gb-form-title">leave a sign</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name or handle"
            required
            maxLength={40}
          />
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="where from? (a site, a city, a planet)"
            maxLength={80}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="a sentence is enough"
            required
            maxLength={500}
          />
          {/* honeypot — hidden from people, catnip for bots; must stay empty */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'signing…' : 'sign · the · book'}
          </button>
          {status === 'error' && (
            <p className="gb-error" role="alert">
              couldn't reach the book just now — try again in a moment.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
