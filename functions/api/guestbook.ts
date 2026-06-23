/// <reference types="@cloudflare/workers-types" />
//
// Cloudflare Pages Function — the guestbook backend.
//   GET  /api/guestbook  → newest-first list of signed entries
//   POST /api/guestbook  → add an entry  { name, origin?, body, website? }
//
// Storage is a D1 (SQLite) database bound as `DB` (see wrangler.toml).
// `website` is a honeypot: real visitors never fill it, bots do — we accept
// the request but silently drop it so the bot thinks it succeeded.

interface Env {
  DB: D1Database
}

interface GuestbookRow {
  id: number
  name: string
  origin: string
  body: string
  tib: string | null
  created_at: string
}

const LIMITS = { name: 40, origin: 80, body: 500 }

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: CORS })

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { status: 204, headers: CORS })

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    'SELECT id, name, origin, body, tib, created_at FROM guestbook ORDER BY id DESC LIMIT 200'
  ).all<GuestbookRow>()
  return json(results ?? [])
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'invalid JSON' }, 400)
  }

  // honeypot — silently accept-and-drop anything that filled the hidden field
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true }, 202)
  }

  const name = String(payload.name ?? '').trim().slice(0, LIMITS.name)
  const origin = (String(payload.origin ?? '').trim() || 'unknown').slice(0, LIMITS.origin)
  const body = String(payload.body ?? '').trim().slice(0, LIMITS.body)

  if (!name || !body) {
    return json({ error: 'name and message are required' }, 400)
  }

  const { results } = await env.DB.prepare(
    'INSERT INTO guestbook (name, origin, body) VALUES (?, ?, ?) ' +
      'RETURNING id, name, origin, body, tib, created_at'
  )
    .bind(name, origin, body)
    .all<GuestbookRow>()

  return json(results?.[0] ?? { ok: true }, 201)
}
