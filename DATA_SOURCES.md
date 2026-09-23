# Data sources & provenance

Every figure in `src/App.jsx` traces to one of three documents. This file records
which, plus the judgement calls made where sources disagreed.

## Sources

| Ref | Document |
|-----|----------|
| **PLAN** | `NEXT.io_Retreats_2027_Drive_1.pptx` — the 2027 commercial plan |
| **BR26** | `Retreat_Cyprus_2026__Brochure.pdf` and `Retreat_LATAM_2026__Brochure.pdf` — published partner brochures for the 2026 editions |
| **SNAP** | `NEXT_Cyprus_Retreat_2026_Attendee_Snapshot.pdf` and `NEXT_Cancun_Retreat_2026_Attendee_Snapshot.pdf`, generated 21 Aug 2026 from monday.com |

## What came from where

| Content | Source |
|---|---|
| Dates, venues, edition number, 3-day/2-night format | PLAN slide 1 |
| Audience focus lines ("…emerging verticals and crypto in Europe") | PLAN slide 1 |
| Day-by-day schedule | PLAN slide 5 |
| Delegate build: 100 = 50 complimentary + 24 partner + 21 individual + 5 advisory | PLAN slide 6 |
| Product inventory, prices, availability, pass counts | PLAN slide 7 |
| Target C-level mix per destination (35/10/5 and 30/10/10) | PLAN slide 13 |
| Selection method (Blask data, relationships, advisory board, ambassadors) | PLAN slide 13 |
| Matchmaking completed one month out | PLAN slide 14 |
| The four positioning statements | PLAN slide 16 |
| Content formats and operator speakers on stage | PLAN slide 12 |
| Headline / General partnership deliverables | BR26 p5 |
| Seniority split (83% C-level / 17% senior management) | BR26 p4 |
| Composition (52% operators / 35% service providers / 10% investors / 3% associations) | BR26 p4 |
| 50 operators / 50 suppliers balance | BR26 p2, PLAN slide 16 |
| Chatham House Rule | BR26 p2 |
| Attendee company logos | BR26 p3 ("ATTENDEES") |
| 2026 partner logos | BR26 cover pages |
| C-level feedback scores | BR26 p7 |
| Job titles in the room | SNAP, confirmed attendees only, aggregated to titles |
| Activity flavour per destination (wine tasting, buggies, cenotes, tequila, volleyball) | BR26 p6 |
| Official NEXT.io RETREAT lockup | BR26 covers, extracted at 600 dpi |
| Brand charcoal `#242426` and yellow `#ffcf33` | BR26 covers (sampled `#232425` / `#ffd033`), matching the tokens already used in the Summit repos |
| The yellow chevron arrow device | BR26 covers, redrawn as inline SVG |

## Deliberately excluded

The plan is an internal commercial document. None of the following is in the
brochure: revenue targets, commission estimates, cost estimates, profit targets,
% change vs prior year, marketing budget, operational KPIs and their targets,
delegate-acquisition milestones ("retain 15, acquire 35"), confirmation-date
milestones, and the internal team/ownership table. The only person named is the
partnerships sales contact.

## Judgement calls — worth a second opinion

1. ~~**LatAm dates**~~ — **resolved, 26 Aug 2026.** PLAN slide 1 says
   "15 – 18 November 2027", but the same deck labels the format "3 days & 2
   nights" and its own day-by-day schedule (slide 5) runs 15 / 16 / 17 Nov.
   The 2026 edition was 17–19 Nov, also three days. **15–17 November 2027 is
   confirmed correct** (Stuart); slide 1 is the error. If the deck is reissued,
   slide 1 needs fixing rather than this repo.

2. **Feedback scores are prior-edition, not 2026.** The scores shown are the
   "C-LEVEL FEEDBACK" panels from BR26 p7. The Cyprus panel's own question
   wording dates it to the **Retreat Europe 2024** edition ("…at the NEXT.io
   Retreat Europe 2024?", "…returning to the NEXT.io Retreat Europe 2025?").
   The LatAm panel carries no year, so the page labels it "most recent edition"
   rather than asserting a year it may not have.

   The PLAN's KPI slides (9 and 10) also carry numbers like 9.2 and 9.8, but
   those are **targets** — each is annotated "to be reviewed after the event",
   and the 2026 events had not happened when the deck was written. They are
   therefore *not* used as achieved results anywhere in the brochure.

   **Action:** once the Oct/Nov 2026 surveys are in, replace
   `DESTINATIONS[x].feedback` with the real 2026 numbers and drop the
   prior-edition caveat from `feedback.source`.

3. **"Fifty C-level guests attend on us."** The brochure states the delegate
   economics plainly — complimentary operators/affiliates/influencers are what
   the partner fee funds. This is a strength when selling to suppliers, and the
   50/50 balance is already public in BR26, but the framing is a presentational
   choice rather than something the source documents say outright. Approved for
   publication 26 Aug 2026; soften the copy in `TheRoom` if that changes.

4. **Individual Ticket deliverables.** PLAN slide 7 gives only price,
   availability and "1 PASS" for this product. The bullet list in `PACKAGES`
   describes what an all-inclusive delegate pass covers, inferred from the
   retreat format — it invents no entitlement, but it has not been checked
   against a signed spec.

5. **Europe's "Yacht / Golf" card uses a padel photograph.** The 2027 product
   is named "Yacht / Golf"; the equivalent 2026 Cyprus product was
   "Golf/Padel Tournament" at the same €20,000, and padel is the only
   tournament photography available for Cyprus. The card copy covers golf,
   padel and a boat day. Swap the image if a golf or boat shot exists.

6. **Two LatAm logos read oddly** because the source brochure art is small:
   `betjara` and `betsw` are best-guess filenames for marks whose wordmarks are
   hard to resolve at source resolution. The images are correct; only the
   filenames and `alt` text are a guess.

## Will's collateral check (3 Sep 2026) - retreat items applied

- "Six weeks apart" corrected to five (11-13 Oct to 15-17 Nov is 33 days).
- Footer countdown now recomputes immediately on destination switch (it
  previously waited for the next minute tick, so it looked unbound).
- The per-destination complimentary breakdown's third slice is relabelled
  "Influencers": PLAN slide 6 treats the advisory board as the separate 5
  in the delegate build (50 comp + 24 partner + 21 individual + 5 advisory),
  so listing "Advisory board & influencers" inside the 50 double-counted it.
- Survey source lines both read "most recent surveyed edition" (Europe's
  latest is the 2024 survey per BR26; the 2026-survey replacement action
  above still stands).
- "100 C-level leaders" softened to "100 senior leaders" (the room is 83%
  C-level per SENIORITY).
- Padel overlap resolved (flagship slot keeps golf/padel/boat; the pool slot
  no longer lists padel); the "Cap St Georges course" claim dropped pending
  confirmation the resort has its own course; LatAm day one reads "Yacht
  day" to match its leisure set.
- Will's footer title corrected to Sales Director. Cancún accented on the
  cover line (the resort name "Secrets Maroma Beach Riviera Cancun" keeps
  its official unaccented spelling).
