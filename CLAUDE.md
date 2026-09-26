# NEXT.io Retreats 2027 — partner brochure

Single-page React (Vite + Tailwind v4) app covering **both** 2027 retreats:

| | Retreat Europe | Retreat LatAm |
|---|---|---|
| Dates | 11–13 October 2027 | 15–17 November 2027 |
| Venue | Cap St Georges Hotel & Resort, Cyprus | Secrets Maroma Beach Riviera Cancun, Mexico |

Both share one product set, so the page has a **destination switch** rather than
two pages. Everything content-bearing lives in `src/App.jsx`; `src/PresentMode.jsx`
is the presentation machinery and holds no content.

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
  Partnership. Enforced in one place for every way in: `addBlock` / `addToCart`
  (card buttons, slides, the builder's +, the package link) refuse a leisure
  slot with no partnership in the package (`locked`) or past its availability
  (`full`), and `settle` takes leisure slots out with the last partnership (the
  builder names what left, in the condition's own words).
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

## Navigation (23 Sep 2026)

- The first screen carries the offer: `HeroPrices` in the hero lists every
  `PACKAGES` item (price, availability, passes) and the leisure range from
  `ADDONS`, always stated with `ADDON_CONDITION`. It is a summary read from
  those arrays, so it never needs editing by hand. Rows link to their cards
  (`#partner-<id>`), the CTA to `#partner`; the rate-card button and the
  leisure line follow the destination switch.
- Section order is unchanged (the narrative above); the hero panel and the
  header do the navigating. Below xl the header has a Prices link (the
  second row on a phone) and a menu with the same sections as `NAV`.
- Anchors land by measurement: `Nav` writes the header bar's height into
  `--nav-h` (ResizeObserver); `.jump` / `.jump-card` in `index.css` use it
  as scroll-margin. Never hardcode a nav offset.
- Deep links: `?retreat=latam` opens LatAm (the address follows the switch),
  and a `#hash` is landed after render, e.g. `?retreat=latam#partner-general`.

## Present mode and seller tools (26 Sep 2026)

Stuart: make every brochure easy to navigate, easy for buyers to understand,
and easy to take a buyer through on a call. What exists:

- **Present mode**: a full-screen walk-through for a screen share.
  `src/PresentMode.jsx` is the machinery (house reference behaviour, this
  brochure's look); the slides are composed in `buildDeck` in `src/App.jsx`
  from the page's own arrays and components, so a new `PACKAGES` or `ADDONS`
  item gets its slide automatically. 18 slides: cover (hero content, the
  facts, "In this presentation", the only slide with the "Use the arrow
  keys, or swipe" hint) → the verdict → the room → the companies → the titles
  → three days → Partnerships & tickets (family slide, then one per package)
  → Leisure activities (family slide, then one per slot) → build a package →
  previous partners → both retreats → next steps.
- **The deck follows the destination switch**: dates, venue, feedback,
  attendee logos, titles, programme, activity naming and photography come
  from `DESTINATIONS[x]`. "View this retreat" on the both-retreats slide
  switches the deck and the page (the package empties, as on the page).
- **Entry points**: a Present pill in the header from md (icon-only between
  1280 and 1399px, where the section nav leaves little room; the label stays
  for screen readers), the first item of the phone menu, Present beside the
  rate-card button in the hero panel (opens the cover), and a quiet
  "Copy link · Present" row under every card's add button (opens that
  product's slide). The card row sits inside the card's last subgrid row, so
  the three package cards (row-span-6) and leisure cards (row-span-5) stay
  aligned; keep it there.
- **URL**: `?present` opens the cover, `?present=<slide id>` a slide, e.g.
  `?retreat=latam&present=leisure-tasting`. Product slide ids are the card
  ids: `partner-<id>` and `leisure-<id>` (leisure cards now carry
  `id="leisure-<id>"` and `jump-card`, so `#leisure-pool` lands too). Other
  ids: `cover`, `verdict`, `room`, `who`, `who-titles`, `days`, `partner`,
  `leisure`, `build`, `partners`, `both`, `next`. The address follows the
  slide by replaceState; Esc drops `present`.
- **Keys**: → Space PageDown next, ← PageUp back, Home End, G the slide list,
  Esc closes the list, then the deck. Swipe on touch. Focus returns to
  whatever opened the deck; the page behind is inert.
- **Copy link** (cards and product slides): this page, its retreat and the
  card anchor, never `present` or `plan`.
- **Package link** ("Copy package link" in the builder, the build slide and
  next steps): `?plan=<id>,<id>,...`, one id per unit, landing on `#build`,
  e.g. `?retreat=latam&plan=general,general,pool#build`. On load `readPlan`
  puts the ids back through `addToCart`, partnerships before leisure, so caps
  and the leisure condition still refuse what does not fit; unknown ids are
  skipped; then `plan` is removed from the address.
- **Product slides** read the card's own pieces: `PackageFacts` (passes,
  availability), `ExclusiveBadge`, `AddButton` (same states as the card),
  `AddonCondition` (on every leisure slide, as required). Pitches are the
  card's `line` (packages) and the destination's `activities[id].title` and
  `blurb` (leisure), set upright on a slide: no quote marks, no italics
  (the cards keep their italic). A package slide shows every deliverable,
  always, never "+ N more on the card" (Stuart, 26 Sep 2026: "Please do
  include all deliverables. It's important").
  "Open the card" closes the deck and lands on the card.
- **Shared section copy**: `VERDICT_HEAD`, `ROOM_HEAD`, `WHO_HEAD`,
  `TITLES_HEAD`, `DAYS_HEAD`, `PARTNER_HEAD`, `LEISURE_HEAD`, `BUILD_HEAD`,
  `PARTNERS_HEAD`, `BOTH_HEAD`, `HERO_FACTS`, `CloseHeadline`,
  `INVENTORY_LINE` and `CONTACT_LINE` are read by the page and the slides.
  Edit the heading there and both follow; never retype it on a slide.

Rules future edits must keep:

- Nothing new is claimed on a slide: every figure, name and line is read from
  the page's data. No internal material, no data-handling caveats, no source
  decks. Job titles only ever appear on their own slide, never beside a
  company or a name.
- The page never says seller, sales desk, talk track, pitch, objection or
  close; the button is "Present". No em dashes in new copy.
- An email address is set as written, never uppercased (it would print the
  brand as NEXT.IO).
- No slide may carry a `.reveal` class: the page's reveal observer never sees
  the deck, so the element would stay invisible. Shared components take
  `reveal={false}` for slides.
- Chevrons only on flat charcoal (the Europe pool slot's placeholder), never
  over the cover photograph or the both-retreats photos; `--sea` stays
  atmosphere (the deck's caustics).
- Every slide fits 1280x800 without scrolling, for both destinations (the
  build slide holds a package of up to four lines; five or more scroll, which
  is fine); on a phone a long slide scrolls vertically, never sideways.
- Cards that are anchor targets (`.jump-card.reveal`) fade in without the
  26px rise, so a landing rests where its scroll margin says. The rise used
  to carry them 10px under the header after a deep link or an in-page jump.
- Keyboard focus is a 2px yellow ring (`:focus-visible` in `index.css`).

