# next-retreat-2027

Partner brochure for the **NEXT.io Retreats 2027** — a single page covering both
editions, with a destination switch rather than two sites.

- **Retreat Europe** · Cap St Georges Hotel & Resort, Cyprus · 11–13 October 2027
- **Retreat LatAm** · Secrets Maroma Beach Riviera Cancun, Mexico · 15–17 November 2027

Built for the sales team: published pricing and availability, the deliverables for
each partnership, the audience data, the C-level feedback, the companies already in
the room, a package builder, and one-click proposal / rate-card export.

## Run it

```
npm install
npm run dev      # local dev server
npm run build    # production build
npm run deploy   # build + publish to gh-pages
```

Live: https://nextdotio.github.io/next-retreat-2027/

## Where things are

| Path | What |
|---|---|
| `src/App.jsx` | All content and components — destinations, products, copy, and the presentation's slides |
| `src/PresentMode.jsx` | Present mode (`?present`) and the copy-link helpers; no content |
| `src/index.css` | Design tokens, the two destination themes, water/grain effects |
| `src/fonts/` | Self-hosted Jost (no CDN at runtime) |
| `public/images/` | Event and resort photography |
| `public/logos/attendees/` | 2026 attendee company marks, per destination |
| `public/logos/partners/` | 2026 headline and general partner marks |
| `CLAUDE.md` | How to work on this repo |
| `DATA_SOURCES.md` | Provenance for every figure, and the open questions |

**Read `DATA_SOURCES.md` before changing a number.** Two things in particular need
a human sign-off: the LatAm dates (the source deck contradicts itself) and the
feedback scores (they are prior-edition, not 2026).
