# Guestbook backend — Cloudflare Pages + D1

The guestbook is stored in a **Cloudflare D1** (SQLite) database and served by a
**Pages Function** at `/api/guestbook`. The React frontend
(`src/components/DiarySections.tsx`) calls that endpoint; if it can't reach it,
it falls back to showing a few sample entries so the page never looks broken.

```
functions/api/guestbook.ts   GET (list) + POST (sign) handlers, talk to D1
schema.sql                   table definition + seed entries
wrangler.toml                Pages + D1 config (binding name: DB)
```

## One-time setup

You need a (free) Cloudflare account. Then, from the repo root:

```bash
pnpm install                       # pulls in wrangler + @cloudflare/workers-types
npx wrangler login                 # opens a browser to authorize

# 1. create the database
npx wrangler d1 create namkha-guestbook
#    → copy the printed "database_id" into wrangler.toml (replace the placeholder)

# 2. create the table + seed it
pnpm run db:init                   # local DB, for `pnpm run pages:dev`
pnpm run db:init:remote            # the live DB used in production
```

## Run it locally (full stack)

`pnpm run dev` (plain Vite) runs the UI only — the guestbook shows sample
entries because there's no function server. To exercise the real backend:

```bash
pnpm run pages:dev    # builds the site, serves it + the function + local D1
```

Open the printed URL, go to **say hi**, and sign — it persists to the local D1.

## Deploy

```bash
pnpm run deploy       # builds and runs `wrangler pages deploy ./dist`
```

First deploy will create the Pages project and ask which account/project to use.
After it's live, make sure the **D1 binding** is attached to the Pages project
(Cloudflare dashboard → your Pages project → Settings → Functions → D1 bindings:
variable `DB` → database `namkha-guestbook`). `wrangler.toml` already declares it,
so a CLI deploy picks it up automatically.

## Hosting the site somewhere else?

The frontend defaults to a same-origin `/api/guestbook`. If you host the static
site elsewhere and run only the API on Cloudflare, deploy the function as a
standalone Worker and set `VITE_GUESTBOOK_API` (e.g. in `.env`) to that Worker's
origin before building. The function already sends permissive CORS headers.

## Notes

- Input is length-capped server-side (name 40 / origin 80 / body 500) and a
  hidden honeypot field silently drops obvious bots.
- Entries render as plain text (React escapes them), so stored markup can't run.
