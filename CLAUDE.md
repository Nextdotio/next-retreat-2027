# NEXT.io Retreats 2027 — partner brochure

Single-page React (Vite + Tailwind v4) app covering **both** 2027 retreats:

| | Retreat Europe | Retreat LatAm |
|---|---|---|
| Dates | 11–13 October 2027 | 15–17 November 2027 |
| Venue | Cap St Georges Hotel & Resort, Cyprus | Secrets Maroma Beach Riviera Cancun, Mexico |

Both share one product set, so the page has a **destination switch** rather than
two pages. Everything content-bearing lives in `src/App.jsx`.

## Workflow

- Develop on branch `claude/next-retreat-2027-brochures-py826y`.
- Run `npm run build` to verify changes compile.
- Commit with a clear message and push the branch.
- Open a fresh PR into `main` only when asked.

## Deploying to gh-pages

```
npm run deploy   # = vite build && npx gh-pages -d dist
```

Confirm it prints `Published` before reporting done. Publishes to
`https://nextdotio.github.io/next-retreat-2027/`.

## Structure of `src/App.jsx`

- `DESTINATIONS` — per-retreat data: dates, venue, audience focus, schedule,
  target delegate mix, feedback scores, attendee logos, activity naming and
  photography. Adding a third retreat means adding a third key here.
- `PACKAGES` — Headline €85k (1, 4 passes), General €35k (10, 2 passes),
  Individual Ticket €15k (21, 1 pass). Shared across both retreats.
- `ADDONS` — Yacht/Golf €20k (1), Tasting & Adventure €15k (2), Sport &
  Relaxation by the Pool €10k (2). Priced identically at both retreats; only
  the local flavour text and photography differ (`DESTINATIONS[x].activities`).
- `ADDON_CONDITION` — add-ons are sold only alongside a Headline or General
  Partnership. Enforced in the calculator (`locked` prop on `Leisure`).
- `SENIORITY` / `COMPOSITION` / `DELEGATE_BUILD` / `SELECTION` / `POSITIONING`
  — shared audience data and messaging.
- `exportProposal` / `exportRateCard` — dependency-free PDF export: builds an
  HTML doc in a blob, opens it and calls `window.print()`. Same pattern as the
  Summit repos.

## Notes

- **Brand colours are fixed and official**: charcoal `#242426`, yellow
  `#ffcf33`, white, grey `#bdbdbd` — the same tokens the Summit repos use, and
  the exact values sampled off the 2026 retreat covers. Yellow is the only
  accent. Do not introduce a second accent colour.
- **Theme switching only changes the water.** `.theme-europe` / `.theme-latam`
  in `src/index.css` set `--sea` / `--sea-soft`, which tint the `.caustics` and
  `.atmosphere` layers and nothing else. The identity never moves between
  destinations; the atmosphere does. `--sea` must never be used for a data bar,
  a border or type — atmosphere only.
- **The official lockup** is `public/logos/next-retreat-lockup.png` (white) and
  `-dark.png` (charcoal, for light surfaces), extracted from the 2026 covers at
  600 dpi with the charcoal knocked out to alpha. Use the `<Lockup>` component;
  never re-set "NEXT.io RETREAT" as live text.
- **The chevron device** (`<Chevrons>`) is the official yellow arrow, redrawn as
  inline SVG so it scales and inherits `currentColor`. It belongs on flat
  charcoal only — over photography it fights the subject.
- **Fonts are self-hosted** in `src/fonts/` (Jost only, variable,
  latin + latin-ext). No Google Fonts request at runtime — this gets opened
  on conference wifi. Vite hashes and rewrites the URLs, so keep the
  `@font-face` `url()` paths relative. The Cormorant serif face was retired
  on Stuart's instruction (2 Sep 2026): display headlines are Jost light —
  keep the page serif-free. Jost has no italic file; italics render as
  synthesised oblique, which is fine at quote sizes.
- The `.num` class stays as a lining-figures guarantee on anything numeric
  (harmless under Jost, which is lining by default).
- **The wave device** (`<SeaWaves>`) is three drifting sine bands tinted by
  `--sea`/`--sea-soft` — atmosphere only, same rule as the caustics. It sits
  on the hero's bottom edge and as the divider into the both-retreats
  spread. Base component sets no `position`; pass `absolute`/`relative`
  placement per use (Tailwind class order does not resolve the conflict).
- **Attendee logos** live in `public/logos/attendees/{cyprus,latam}/`, extracted
  from the official 2026 partner brochures and trimmed to their content box.
  The logo wall normalises them to white silhouettes with
  `[filter:brightness(0)_invert(1)] mix-blend-screen`, so a logo with a baked-in
  white background will render as a solid white block — knock the white out to
  transparent before adding one. The same failure hits outline-style logos
  whose letterforms are white fills inside a dark outline (1win, betjara):
  the filter merges fill and outline into one blob. Fix: make the near-white
  fill pixels transparent so the letters survive as counters — done for both
  on 2 Sep 2026.
- **Photography** in `public/images/` is real event and resort photography from
  the 2026 brochures. Several sources are small (720–800px wide); they are used
  in cards rather than full-bleed heroes for that reason. The two heroes
  (`cyprus-networking-dinner.jpg`, `cancun-yacht.jpg`) are the largest sources.
- Job titles in the "who you are actually sitting with" block are aggregated
  from the confirmed 2026 delegate lists, **titles only** — never paired back to
  a company or a name. That is a handling rule for whoever edits this file; it is
  deliberately *not* stated on the page, where it reads as internal process.
- **Section order is the narrative** and the numbered eyebrows depend on it:
  hero → 01 the verdict (feedback first, it is the credibility hook) → 02 why it
  works → 03 the room → 04 who is in it → 05 three days → 06 partnerships →
  07 leisure → 08 build a package → 09 previous partners → both retreats →
  close. Every section uses the shared `SectionHead`; if you add one, renumber
  and add it to `NAV`.
- **Keep the language client-facing.** This page is shown to prospects. No
  internal framing, no data-handling caveats, no references to source decks.
- Provenance for every figure, and the open questions, are in `DATA_SOURCES.md`.
  Read it before changing a number.
