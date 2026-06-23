-- D1 schema for the guestbook.
-- Apply with:  wrangler d1 execute namkha-guestbook --file=./schema.sql
-- (add --remote to run it against the deployed database).

CREATE TABLE IF NOT EXISTS guestbook (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  origin     TEXT NOT NULL DEFAULT 'unknown',
  body       TEXT NOT NULL,
  tib        TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_guestbook_created ON guestbook (id DESC);

-- Seed entries (only inserted on an empty table, so re-running is safe).
INSERT INTO guestbook (name, origin, body, tib, created_at)
SELECT * FROM (
  SELECT 'tenzin_'  AS name, 'via twitter' AS origin,
         'found this site through the Tibetan keyboard project — the mandala spinning behind everything got me. saved.' AS body,
         'བཀྲ་ཤིས་' AS tib, '2026-05-24 12:00:00' AS created_at
  UNION ALL SELECT 'm. (lady)', 'madqh.com',
         'hi from the absolute space. love the dusk palette. the prayer wheel in the corner made me smile :)',
         NULL, '2026-05-19 12:00:00'
  UNION ALL SELECT 'stranger', 'unknown',
         '"do not be a hindrance to others'' practice" — i''m stealing this for my own README.',
         NULL, '2026-05-02 12:00:00'
  UNION ALL SELECT 'ribosome', 'ribo.zone',
         'webring me. the friends section is right. saw it. left a 88×31 in your direction.',
         NULL, '2026-04-30 12:00:00'
)
WHERE NOT EXISTS (SELECT 1 FROM guestbook);
