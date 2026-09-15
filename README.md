# Kirosim

Travel eSIM storefront — Next.js 16 (App Router) + Tailwind CSS v4, TypeScript, Neon Postgres.

Forked from the Velusim codebase: the commerce, auth, mailer and catalogue layers are unchanged;
the entire interface was rebuilt on a new design system.

## Design system — "Chipwave"

Bold Swiss clarity, powered by the SIM chip itself. Cool porcelain canvas, heavy graphite type set
huge (data amounts and prices are the visual heroes), one electric lime accent used as a live
signal. Flat by construction: hairlines and solid plates carry the structure; shadow appears only
as a hover lift.

Every token lives in `src/app/globals.css` — there are no ad-hoc colours or magic numbers in
components.

| Token group | Values |
| --- | --- |
| Surfaces | `--porcelain #F7F8F7`, `--concrete #EFF1EF`, `--card #FFFFFF` |
| Ink | `--ink #141714`, `--ink-muted #6A716B` |
| Accent | `--lime #C6F135` (+ `--lime-tint`, `--lime-edge`), `--on-lime #141714` |
| Secondary | `--signal #1E7A4A` (+ `--signal-tint`) |
| Inverted band | `--graphite #141714` via the `.band-graphite` class |
| Semantic | `--warning`, `--danger` (+ plates and tints) |
| Structure | `--hairline`, `--hairline-strong`, `--ring` |
| Radii | `0 / 2 / 4 / 6px` — deliberately not uniform |
| Motion | `140 / 180 / 220ms`, `--ease-snap` |

Dark mode ("Graphite mode") is a first-class inversion of the same token set, toggled by the
`.dark` class; light remains the primary theme.

### Signature motifs

- **Chip glyph** (`src/components/ui/Chip.tsx`) — the ISO-7816 contact-pad geometry. Logo,
  favicon, loading state (pads light in sequence), success beat, section watermark.
- **Lime marker plate** (`Marked` in `src/components/ui/Plate.tsx`) — one plated word per heading.
- **Swiss data grid** — index numerals (`01/02/03`), hairline rules, aligned columns.
- **Signal ticks** — a four-bar strength glyph used for coverage and as the list bullet.
- **Pad grid** — the chip's pad layout as a faint background, on graphite bands only.

Typography: **Archivo** (display, weight 800) for headlines and every number, **Inter** for UI,
**JetBrains Mono** for technical readouts (country codes, validity, activation codes).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string |
| `SESSION_SECRET` | Session signing key |
| `APP_URL` | Public origin, used in emails and reset links |
| `SMTP_*`, `MAIL_FROM` | Transactional email; unset means emails log to the console |
| `YESIM_API_URL`, `YESIM_API_KEY` | Partner API; unset means the local catalogue is used |
| `NEXT_PUBLIC_COMPANY_*` | Legal entity shown in the footer and policy pages |

> The SMTP mailbox is still the one inherited from the fork. Point `SMTP_USER` / `MAIL_FROM` at a
> `kirosim.com` mailbox once the domain's email is set up — the From domain has to match a verified
> mailbox or deliverability suffers.

## Structure

```
src/app            routes (App Router) + globals.css (the token system)
src/components/ui  primitives: Chip, Plate, Section, Button, Tabs, Accordion…
src/components     feature components by area (home, cards, checkout, account, auth…)
src/lib/data       country, region, plan, device, FAQ and policy catalogues
src/lib/auth       sessions, DAL, mailer, invoices
src/lib/api        partner API client (falls back to the local catalogue)
```
