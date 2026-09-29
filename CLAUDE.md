# NEXT.io Retreats 2027 — partner brochure

Single-page React (Vite + Tailwind v4) app covering **both** 2027 retreats:

| | Retreat Europe | Retreat LatAm |
|---|---|---|
| Dates | 11–13 October 2027 | 15–17 November 2027 |
| Venue | Cap St Georges Hotel & Resort, Cyprus | Secrets Maroma Beach Riviera Cancun, Mexico |

Both share one product set, so the site is **one page with three screens**: a
chooser (no `?retreat`) and one screen per retreat (`?retreat=europe`,
`?retreat=latam`), with a retreat switch between the two (see "The chooser, the
guest lists and the switch (29 Sep 2026)"). Everything content-bearing lives in
`src/App.jsx`; `src/PresentMode.jsx` is the presentation machinery and holds no
content.

## Workflow

- Develop on branch `claude/new-session-h6ajdg`: the live site is built from it
  (27 Sep 2026). It supersedes `claude/next-retreat-2027-brochures-py826y`, last touched
  26 Aug 2026 and 10 commits behind; never develop on or deploy from that
  branch. More than one session works on this branch, so pull before every
  deploy.
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
  target delegate mix, feedback scores, the two company walls (`guests`, the
  2026 guest list; `previous`, earlier editions), activity naming and
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
  — shared audience data and messaging. `SENIORITY` and `COMPOSITION` describe
  previous editions and always print with `AUDIENCE_BASIS`.
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
  from the official 2026 partner brochures and trimmed to their content box
  (the marks added on 29 Sep 2026 and their sources are listed in the section
  of that date).
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
  hero → the 2026 guest list (`GuestStrip`, unnumbered, directly under the
  hero) → 01 the verdict (feedback first, it is the credibility hook) → 02 why
  it works → 03 the room → 04 who is in it (previous editions, then the
  titles) → 05 three days → 06 partnerships → 07 leisure → 08 build a package →
  09 previous partners → both retreats → close. Every numbered section uses
  the shared `SectionHead`; if you add one, renumber and add it to `NAV`.
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
- Deep links: `?retreat=latam` opens LatAm, `?retreat=europe` Europe, and a
  `#hash` is landed after render, e.g. `?retreat=latam#partner-general`. No
  `?retreat` is the chooser (29 Sep 2026 section for the old links).

## Present mode and seller tools (26 Sep 2026)

Stuart: make every brochure easy to navigate, easy for buyers to understand,
and easy to take a buyer through on a call. What exists:

- **Present mode**: a full-screen walk-through for a screen share.
  `src/PresentMode.jsx` is the machinery (house reference behaviour, this
  brochure's look); the slides are composed in `buildDeck` in `src/App.jsx`
  from the page's own arrays and components, so a new `PACKAGES` or `ADDONS`
  item gets its slide automatically. 19 slides: cover (hero content, the
  value lines, the facts, "In this presentation", the only slide with the
  "Use the arrow keys, or swipe" hint) → on the 2026 guest list → the verdict
  → the room → previous editions → the titles → three days → Partnerships &
  tickets (family slide, then one per package) → Leisure activities (family
  slide, then one per slot) → build a package → previous partners → both
  retreats → next steps. A deck exists on a retreat screen only.
- **The deck follows the retreat on screen**: dates, venue, feedback, both
  company walls, titles, programme, activity naming and photography come
  from `DESTINATIONS[x]`. "View this retreat" on the both-retreats slide
  switches the deck and the page (the package empties, as on the page); in
  the deck that replaces the address rather than pushing it.
- **Entry points**: a Present pill in the header from md (labelled from lg to
  xl and from 1400px, icon-only elsewhere, the label kept for screen
  readers), the phone menu (after Both retreats), Present beside the
  rate-card button in the hero panel (opens the cover), and a quiet
  "Copy link · Present" row under every card's add button (opens that
  product's slide). The card row sits inside the card's last subgrid row, so
  the three package cards (row-span-6) and leisure cards (row-span-5) stay
  aligned; keep it there.
- **URL**: `?present` opens the cover, `?present=<slide id>` a slide, e.g.
  `?retreat=latam&present=leisure-tasting`. Product slide ids are the card
  ids: `partner-<id>` and `leisure-<id>` (leisure cards now carry
  `id="leisure-<id>"` and `jump-card`, so `#leisure-pool` lands too). Other
  ids: `cover`, `guests`, `verdict`, `room`, `who` (previous editions),
  `who-titles`, `days`, `partner`, `leisure`, `build`, `partners`, `both`,
  `next`. The address follows the slide by replaceState; Esc drops `present`.
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
- **Shared section copy**: `GUESTS_HEAD`, `VERDICT_HEAD`, `ROOM_HEAD`,
  `WHO_HEAD`, `TITLES_HEAD`, `DAYS_HEAD`, `PARTNER_HEAD`, `LEISURE_HEAD`,
  `BUILD_HEAD`, `PARTNERS_HEAD`, `BOTH_HEAD`, `HERO_VALUE`, `HERO_FACTS`,
  `CloseHeadline`, `INVENTORY_LINE` and `CONTACT_LINE` are read by the page
  and the slides.
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
- Chevrons only on flat charcoal (the placeholder a leisure slot shows when it
  has no photograph; none does since 29 Sep 2026), never over the cover
  photograph, the both-retreats photos or the chooser cards; `--sea` stays
  atmosphere (the deck's caustics).
- Every slide fits 1280x800 without scrolling, for both destinations (the
  build slide holds a package of up to four lines; five or more scroll, which
  is fine); on a phone a long slide scrolls vertically, never sideways.
- Cards that are anchor targets (`.jump-card.reveal`) fade in without the
  26px rise, so a landing rests where its scroll margin says. The rise used
  to carry them 10px under the header after a deep link or an in-page jump.
- Keyboard focus is a 2px yellow ring (`:focus-visible` in `index.css`).


## Decisions after the product-list audit (Stuart, 27 Sep 2026)

- **Operator invitations are suggestions, and capped.** Ten General Partners
  inviting five operators each would fill the operator half of the room, so
  a General Partner now suggests up to 2 operator professionals and the
  Headline up to 5, "for NEXT.io to invite (by approval; an invitation does
  not guarantee attendance)". Stuart said "two, maybe three": 2 is published
  because raising a published benefit later is easier than cutting one. Ask
  him before moving it to 3.
- **Gifts are the partner's to supply**: "Opportunity to give other
  attendees a gift, supplied by you and approved by NEXT.io".

## The chooser, the guest lists and the switch (29 Sep 2026)

Stuart, 29 Sep 2026: "make those buttons where we switch between LATAM and
Europe a lot clearer. In fact, if I could have a landing page again for this,
where you get to choose between the two, that would be amazing ... What I want
again is the logos of the attending companies to be much, much higher ...
nearer to the hero ... The value of the retreat is genuinely a five-star
experience. C-level operators ... and then there's 50 slots for suppliers, and
the suppliers are the ones that should be buying these packages." Also: an
image for Sport & Relaxation by the Pool, keep the scarcity, and the Z-Gaming
logo was hard to see. Later the same day: "whenever you write iGaming, it
should always be a lowercase i."

- **Three screens, one address rule** (the media pack's brand chooser and
  Valletta's event chooser). `destId` in App is `null` for the chooser,
  `'europe'` or `'latam'` for a retreat, and the address is the only source
  of truth: `?retreat=europe`, `?retreat=latam`, no `?retreat` is the
  chooser. `readRetreat` reads it; an unknown `?retreat=` leaves the address
  and shows the chooser (`?retreat=LatAm` is read as `latam`).
- **Links made before the chooser still land.** Europe was the default and
  carried no parameter, so with no `?retreat` these open Europe and gain
  `?retreat=europe` by replaceState: a `#hash` that lives on a retreat
  (`RETREAT_IDS`: the sections, `#top`, `#guests`, `#who`, `#partners` and
  every card, e.g. `#partner-general`), a `?present=<slide id>` other than
  the cover, and a `?plan=` package link. A bare `?present` or
  `?present=cover` on the chooser is dropped: the chooser has no deck.
- **Moving between screens** goes through `goTo(next, id)`: a chooser card,
  the retreat switch, Both retreats, a both-retreats card and the chooser's
  list labels. It pushes the address (so Back returns), drops `present` and
  `plan`, and opens the new screen at its top or on `id` (`landReq`, a layout
  effect). Back and Forward only swap the screen (`popstate` calls
  `applyRetreat(readRetreat())`) and leave the scroll to the browser: never
  force a scroll there (Valletta's lesson). Every one of these is a real
  link (`retreatHref`), so it copies and opens in a new tab; a plain click is
  handled in place (`isPlainClick`).
- **The package is per retreat.** `cartFor` remembers which retreat the
  package was built for; arriving on the other one empties it (as the old
  switch did), going to the chooser and back to the same retreat keeps it.
- **The switch** (`RetreatSwitch`, links with `aria-current="page"` on the
  retreat on screen, every option a 44px target). `hero`: from md, at the top
  of the hero, "Retreat Europe · Cyprus · 11–13 Oct 2027" beside "Retreat
  LatAm · Cancún · 15–17 Nov 2027", the current one filled yellow with a
  check. `bar`: the phone header's second row, "Europe / Cyprus" beside
  "LatAm / Cancún", with Prices. `compact`: the header between md and xl,
  sliding in once the hero's switch has scrolled away (never two on one
  screen). From xl the section nav fills the bar, so there is no compact
  switch there: the way across is the hero's switch, the both-retreats cards
  and Both retreats. `BackToChooser` ("Both retreats", an arrow where the bar
  is tight) is the header's first item on a retreat and the phone menu's
  first line. The caller passes the switch's display class.
- **The chooser** (`Chooser`, `CHOOSER`): the lockup, "Choose your retreat.",
  a value line, one card per retreat (`RetreatChoiceCard`: its hero
  photograph, edition, place, venue, dates, lede and a yellow "View this
  retreat"), `BOTH_HEAD`'s line, then both 2026 lists (`ChooserGuests`, one
  moving row each, each label opening that retreat on `#guests`). No deck,
  no Present, no package, no prices; Enquire there is a mailto to
  sales@next.io.
- **Two company walls, never mixed, names only.** The old wall called the
  2026 brochure's attendee page "the 2026 guest list", but 10 of the 24
  Cyprus logos and 28 of the 38 LatAm logos were not on Rory's lists. Now:
  - `guests` (`GUESTS_HEAD`, "On the 2026 guest list · Cyprus", "Already on
    the list."): companies on Rory Credland's weekly delegate updates of
    18 Sep 2026 (NEXT Cyprus Retreat 2026, 12–14 October; NEXT Cancún Retreat
    2026, 17–19 November), delegates first, then the partners: Cyprus
    partners from Rory's list, Cancún partners from Mathias's confirmations
    (SOFTSWISS, the Headline; Alea; Playson). Only companies with a real logo
    on file; the rest of each list is left out, never guessed or fetched
    from the web. `GuestStrip` shows it directly under the hero (two moving
    rows) and it is the deck's second slide.
  - `previous` (`WHO_HEAD`, "Previous editions · Cyprus", "The companies who
    were already there."): the 2026 brochure's attendee page (earlier
    editions) minus anyone on the 2026 list. Section 04 shows it as a still
    grid (`LogoGrid`) above the titles, and it has its own slide (`who`).
  - Paths are relative to `public/logos/`, one file per brand: a mark already
    on the other retreat's wall or the partner wall is referenced, not
    copied (1xBet on Cyprus reads `attendees/latam/1xbet`; the partners read
    `partners/*`). Never pair a person or a title with a company.
  - When Rory's list moves: add a company to `guests` only if it is on the
    latest list and a real logo exists (a sibling repo's brand asset, or the
    brochure artwork); move it out of `previous` if it was there; say in the
    lede only what the list says ("on the list", never "confirmed").
- **Logos added or re-baked on 29 Sep 2026.** Every file is baked with the
  hub's own `bake()` (next-2027/scripts/build_logos.py, imported, not copied)
  from an untouched colour source, never from a file already baked:
  `attendees/cyprus/betsson.png` (next-2027 logo-src `betsson-ab.png`, auto),
  `attendees/latam/betmgm.png` (`BetMGM.png`, shape, the hub's own
  treatment), `attendees/cyprus/ll-europe.png` (`l-l-europe.png`, 1000px, in
  place of the faint 195px cut), `partners/{softswiss,alea,playson,betby}.png`
  (the hub's larger sources; identical to the hub's wall files),
  `partners/z-gaming-asia.png` and `attendees/latam/apuesteria.png` (their
  own pristine originals from `ea7c4e4^`, shape: the auto bake had kept only
  Z-Gaming's hairline letter outlines and a faint gradient of Apuestería).
  TaDa Gaming (a Cancún 2026 partner) is not on the wall: its logo exists
  only as `TaDa_LOGO_SVG.svg`, attached to TaDa's own 1 Sep 2026 email to
  Mathias with its brand guidelines, which the M365 tools cannot download.
  Save that file into the repo and bake it the same way to add it. Evoke has
  only the old 888 Holdings mark, so it stays off.
- **The value near the top** (`HERO_VALUE`, three lines under the hero
  headline and on the deck's cover, except 1024 to 1279px where the cover's
  column is too narrow): a five-star retreat at a five-star resort; C-level
  operators, from the largest groups to the fast-growing names that bring new
  business; fifty places for suppliers, and a partnership or a ticket is how
  you take one. No new figures (the fifty is the page's own 50 / 50). The
  chooser's lede says the same. `POSITIONING` now says "at a five-star
  resort". The scarcity lines are unchanged.
- **Previous-edition figures say so.** 83% C-level / 17% senior management
  and the 52 / 35 / 10 / 3 mix are BR26 p4, which describes the editions
  before 2026. They carry `AUDIENCE_BASIS` ("previous editions") on the room
  panels, the Why section's 83% figure, the titles lede ("At previous
  editions, eighty-three per cent of the room was C-level") and the rate card
  (`roomLine`). The current lists' own seniority is not published.
- **Sport & Relaxation by the Pool, Europe** now has NEXT's own photograph:
  `images/cyprus-pool.jpg`, the infinity pool at Cap St Georges over the sea,
  no people and no branding (IMG_0376, 19 Oct 2025, from SharePoint
  EliteRetreats "NEXT Retreat EU/2025/Marketing/Event Photos For The
  Website"; levelled 1.2 degrees and cut to 1400x1050). `pos` on an `imgs`
  entry sets its crop in the card's letterbox.
- **iGaming keeps its lowercase i, NEXT.io and NEXTPredict their case.**
  Anything that can land in capitals goes through `keepCase` (a normal-case
  span): `Eyebrow`, slide eyebrows, the cover lines, kickers, the Why labels,
  the deck's top bar and slide-list headings (`formatText` on PresentMode),
  and the printouts (`keepCaseHtml`, text between tags only). Check the
  rendered innerText of the chooser, both retreats, both decks (every slide
  and the slide list) and both PDFs for /IGAMING|NEXT\.IO|NEXTPREDICT/: all
  clean on 29 Sep 2026.
- **Fixed in the same pass:** Europe's room slide scrolled 11px at 1280x800
  (its lede now takes a wider measure: `SlideHead` has `ledeMeasure`); the
  close's mailto subject carried an encoded em dash (it now uses
  `CHOOSER_MAILTO`); the header's controls are 44px targets.

Rules to keep:

- The address is the only source of truth; every move between screens is a
  real link through `goTo`; popstate never forces a scroll; old links keep
  opening Europe.
- The two walls stay separate and labelled. Nothing goes on the 2026 wall
  that is not on the latest list or a confirmed partner; no logo lifted from
  a sales email (a brand file the company itself sent for use at the event,
  as TaDa did, is fine); no person or title beside a company.
- The chooser has no deck, no package and no prices.
- QA a change here by walking: the chooser, both retreats and the switch at
  390, 1024, 1280 and 1440 (no sideways scroll, no clipped header control);
  Back from a retreat to the chooser; `#partner-general` and
  `?retreat=latam#partner-general`; `?present` on both retreats with
  ArrowRight (19 slides each, none scrolling at 1280x800).
