import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react'
import {
  Anchor, ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown,
  Crown, Download, Handshake, Lock, Mail, Menu, Mic, Minus, Plus,
  Sailboat, ShieldCheck, Sparkles, Sun, Ticket, Trophy, Users,
  Waves, Wine, X,
} from 'lucide-react'
// Hashed URL of the self-hosted face, so the printables can load Jost too
import jostLatin from './fonts/jost-latin.woff2?url'

/* ═══════════════════════════════════════════════════════════════════════════
   NEXT.io Retreats 2027 — partner brochure

   Brand: official NEXT.io charcoal + yellow, and the official NEXT.io RETREAT
   lockup. The only thing that changes between destinations is --sea, which
   tints the caustics and the fine detail — the identity never moves.

   Every figure below traces to one of:
     · NEXT.io_Retreats_2027_Drive_1.pptx  (2027 inventory, dates, format,
       audience targets, selection method, positioning)
     · Retreat_Cyprus_2026 / Retreat_LATAM_2026 partner brochures
       (deliverables, audience split, attendee logos, C-level feedback)
     · Attendee snapshots, 21 Aug 2026 (roles on the confirmed guest list)

   Deliberately excluded: revenue/profit/commission targets, cost lines,
   marketing budget, internal KPIs and delegate-acquisition milestones.
   This file is a client-facing document — keep the language client-facing.
   ═══════════════════════════════════════════════════════════════════════════ */

const asset = (p) => `${import.meta.env.BASE_URL}${p}`
const eur = (n) => '€' + n.toLocaleString('en-US')

/* ─── Destinations ──────────────────────────────────────────────────────── */

const DESTINATIONS = {
  europe: {
    id: 'europe',
    theme: 'theme-europe',
    tag: 'Europe',
    place: 'Cyprus',
    // Mirrors the official cover lockup line
    coverLine: 'EUROPE · 11–13 OCTOBER, 2027',
    venue: 'Cap St Georges Hotel & Resort',
    venueShort: 'Cap St Georges',
    dates: '11 – 13 October 2027',
    datesTight: '11–13 Oct 2027',
    edition: '4th edition',
    focus: 'Senior iGaming executives with a direct interest in the emerging verticals and crypto in Europe.',
    lede: 'Three days on the western tip of Cyprus, where the Mediterranean does the work of a hundred introductions.',
    hero: 'images/cyprus-networking-dinner.jpg',
    heroAlt: 'Delegates at a long table dinner overlooking the sea at Cap St Georges, Cyprus',
    resortShots: [
      { src: 'images/cyprus-dinner-table.jpg', alt: 'Table set for a networking dinner at Cap St Georges' },
      { src: 'images/cyprus-suite.jpg', alt: 'Sea-view suite at Cap St Georges Hotel & Resort' },
    ],
    lifeShots: [
      { src: 'images/cyprus-wine-tasting.jpg', alt: 'Delegates at a hosted wine tasting under olive trees, Cyprus' },
      { src: 'images/cyprus-networking-dinner.jpg', alt: 'Networking dinner by the sea, NEXT Retreat Europe' },
    ],
    target: [
      { n: 35, label: 'Operators', note: '15 operators · 20 crypto operators' },
      { n: 10, label: 'Affiliates', note: 'European affiliate leadership' },
      { n: 5, label: 'Influencers', note: 'Nominated, not applied' },
    ],
    feedback: {
      source: 'C-level delegate survey · most recent surveyed edition',
      headline: { score: '9.32', label: 'Would recommend to an industry friend' },
      rows: [
        ['Would recommend to an industry friend', '9.32'],
        ['Communication from the NEXT.io team', '9.35'],
        ['Cap St Georges as a resort', '9.32'],
        ['Activities during the retreat', '9.27'],
        ['Likelihood of returning', '9.24'],
        ['Overall experience', '9.11'],
        ['Opportunities to network', '9.00'],
      ],
    },
    titles: [
      'CEO', 'COO', 'CFO', 'CTO', 'CMO', 'CPO', 'CCO', 'Managing Director',
      'Board Member', 'Head of Trading', 'Head of Affiliates',
      'Head of Business Development', 'Director of Gaming', 'Senior Director of Sales',
    ],
    logoDir: 'logos/attendees/cyprus',
    attendees: [
      ['1win', '1win'], ['7bet', '7bet'], ['888africa', '888 Africa'],
      ['bckend', 'BCKEND Innovations'], ['bet365', 'bet365'], ['betb2b', 'BetB2B'],
      ['coolbet', 'Coolbet'], ['entain', 'Entain'], ['flutter', 'Flutter Entertainment'],
      ['gamingtec', 'Gamingtec'], ['highbet', 'Highbet'], ['immense', 'Immense'],
      ['kingmakers', 'KingMakers'], ['ll-europe', 'L&L Europe'], ['leon', 'LEON'],
      ['lottoland', 'Lottoland'], ['midnite', 'Midnite'], ['odds96', 'odds96'],
      ['play-north', 'Play North'], ['super-group', 'Super Group'], ['tipico', 'Tipico'],
      ['tonybet', 'Tonybet'], ['wildz', 'Wildz Group'], ['yolo-group', 'Yolo Group'],
    ],
    days: [
      {
        n: 1, date: 'Monday 11 October',
        items: ['Delegates check in', 'Golf tournament or boat day (if sold)', 'Welcome reception'],
      },
      {
        n: 2, date: 'Tuesday 12 October',
        items: ['Networking breakfast', 'Educational content', 'Networking lunch', 'Leisure activities', 'Networking dinner'],
      },
      {
        n: 3, date: 'Wednesday 13 October',
        items: ['Networking breakfast', 'Educational content', 'Delegates check out', 'Networking lunch'],
      },
    ],
    activities: {
      'yacht-golf': {
        title: 'Golf or padel tournament, or a day on the water',
        blurb: 'The flagship leisure slot. A golf or padel tournament, or a boat day along the Akamas coast — your brand hosts it end to end.',
        imgs: [{ src: 'images/cyprus-padel.jpg', alt: 'Padel tournament at Cap St Georges' }],
      },
      tasting: {
        title: 'Wine tasting in the hills, buggies through the Akamas',
        blurb: 'Two curated experiences off the resort — a hosted tasting at a Cypriot vineyard and an off-road buggy run. Small groups, long conversations.',
        imgs: [
          { src: 'images/cyprus-wine-vineyard.jpg', alt: 'Wine tasting overlooking a Cypriot vineyard' },
          { src: 'images/cyprus-buggies.jpg', alt: 'Off-road buggy on a coastal trail in Cyprus' },
        ],
      },
      pool: {
        title: 'Sport and slow hours by the pool',
        blurb: 'The most relaxed real estate at the retreat. Poolside sessions, morning movement, sunrise swims — branded, hosted and impossible to walk past.',
        imgs: [],
      },
    },
  },

  latam: {
    id: 'latam',
    theme: 'theme-latam',
    tag: 'LatAm',
    place: 'Cancún, Mexico',
    coverLine: 'CANCÚN · 15–17 NOVEMBER, 2027',
    venue: 'Secrets Maroma Beach Riviera Cancun',
    venueShort: 'Secrets Maroma Beach',
    // The 2027 plan's summary slide reads 15–18; its own day-by-day schedule
    // and the "3 days & 2 nights" format both land on 15–17. Confirmed 15–17.
    dates: '15 – 17 November 2027',
    datesTight: '15–17 Nov 2027',
    edition: '4th edition',
    focus: 'Senior iGaming executives with a direct interest in the Latin American market.',
    lede: 'Three days on what is regularly voted the best stretch of beach in Mexico, with the region\'s operators in the room.',
    hero: 'images/cancun-yacht.jpg',
    heroAlt: 'The bow of a yacht on the open Caribbean off Riviera Maya',
    resortShots: [
      { src: 'images/cancun-aerial.jpg', alt: 'Aerial view of Secrets Maroma Beach and the Caribbean shoreline' },
      { src: 'images/cancun-pool-dusk.jpg', alt: 'Infinity pool at Secrets Maroma Beach at dusk' },
    ],
    lifeShots: [
      { src: 'images/cancun-networking-dinner.jpg', alt: 'Long-table networking dinner under palms, NEXT Retreat LatAm' },
      { src: 'images/cancun-tequila-tasting.jpg', alt: 'Hosted tequila tasting for delegates at Secrets Maroma Beach' },
    ],
    target: [
      { n: 30, label: 'Operators', note: 'LatAm operator leadership' },
      { n: 10, label: 'Affiliates', note: 'Mexico, Brazil, Colombia, Peru, Chile' },
      { n: 10, label: 'Influencers', note: 'Nominated, not applied' },
    ],
    feedback: {
      source: 'C-level delegate survey · most recent surveyed edition',
      headline: { score: '9.90', label: 'Likelihood of returning' },
      rows: [
        ['Likelihood of returning', '9.90'],
        ['Would recommend to an industry friend', '9.86'],
        ['Communication from the NEXT.io team', '9.79'],
        ['Overall experience', '9.76'],
        ['Quality of food and beverage', '9.76'],
        ['Opportunities to network', '9.45'],
        ['Secrets Maroma Beach as a resort', '9.41'],
        ['Activities during the event', '9.10'],
        ['Quality of conference content', '8.83'],
        ['Found qualified leads and new connections', '8.62'],
      ],
    },
    titles: [
      'CEO', 'COO', 'CCO', 'Chief Strategy Officer', 'Chief Corporate Development Officer',
      'CBDO', 'Founder', 'Founding Partner', 'Managing Partner', 'Country Manager',
      'Director LatAm', 'Regional Markets Director', 'Director de Operaciones',
      'VP LatAm', 'Legal Director', 'Investor',
    ],
    logoDir: 'logos/attendees/latam',
    attendees: [
      ['1xbet', '1xBet'], ['aieja', 'AIEJA'], ['anakatech', 'Anakatech'],
      ['apostou', 'Apostou'], ['apuestagana', 'ApuestaGana'], ['apuestatotal', 'Apuesta Total'],
      ['apuesteria', 'Apuestería'], ['bandbet', 'BandBet'], ['betcris', 'Betcris'],
      ['betjara', 'Betjara'], ['betplay', 'BetPlay'], ['betsul', 'Betsul'],
      ['betsw', 'BetSW'], ['better-collective', 'Better Collective'], ['betxico', 'BetXico'],
      ['brazino777', 'Brazino777'], ['caliente', 'Caliente Interactive'],
      ['casa-de-apostas', 'Casa de Apostas'], ['casino-club', 'Casino Club'],
      ['draftkings', 'DraftKings'], ['estoril-sol-digital', 'Estoril Sol Digital'],
      ['estrelabet', 'EstrelaBet'], ['golden-lion', 'Golden Lion'],
      ['hard-rock-digital', 'Hard Rock Digital'], ['highbet', 'Highbet'],
      ['island-luck', 'Island Luck'], ['jokerbet', 'Jokerbet'], ['js', 'JS'],
      ['kto', 'KTO'], ['latamwin', 'Latamwin'], ['logrand', 'Logrand'],
      ['nossabet', 'NossaBet'], ['novibet', 'Novibet'], ['orenes', 'Orenes Grupo'],
      ['rubyplay', 'RubyPlay'], ['rushbet', 'Rushbet'], ['stake', 'Stake'],
      ['tinbet', 'Tinbet'],
    ],
    days: [
      {
        n: 1, date: 'Monday 15 November',
        items: ['Delegates check in', 'Yacht day (if sold)', 'Welcome reception'],
      },
      {
        n: 2, date: 'Tuesday 16 November',
        items: ['Networking breakfast', 'Educational content', 'Networking lunch', 'Leisure activities', 'Networking dinner'],
      },
      {
        n: 3, date: 'Wednesday 17 November',
        items: ['Networking breakfast', 'Educational content', 'Delegates check out', 'Networking lunch'],
      },
    ],
    activities: {
      'yacht-golf': {
        title: 'A private yacht day on the Caribbean',
        blurb: 'The flagship leisure slot, and the one delegates talk about afterwards. Your brand hosts the boat, the guest list and the whole afternoon.',
        imgs: [{ src: 'images/cancun-yacht.jpg', alt: 'Yacht bow on the open Caribbean' }],
      },
      tasting: {
        title: 'Tequila tasting and the cenotes',
        blurb: 'Two curated experiences with a local anchor — a hosted tasting at the resort and a guided swim in a Yucatán cenote. Small groups, long conversations.',
        imgs: [
          { src: 'images/cancun-tequila-tasting.jpg', alt: 'Hosted tequila tasting for delegates' },
          { src: 'images/cancun-cenote.jpg', alt: 'Delegates at a Yucatán cenote' },
        ],
      },
      pool: {
        title: 'Beach volleyball and slow hours by the pool',
        blurb: 'Sunset volleyball on Maroma beach and the poolside hours either side of it. The most relaxed real estate at the retreat, hosted by you.',
        imgs: [{ src: 'images/cancun-volleyball.jpg', alt: 'Beach volleyball at sunset on Maroma beach' }],
      },
    },
  },
}

/* ─── Product inventory · identical across both retreats ────────────────── */

const PACKAGES = [
  {
    id: 'headline',
    name: 'Headline Partner',
    price: 85000,
    avail: 1,
    passes: 4,
    exclusive: true,
    kicker: 'One per retreat',
    line: 'The retreat carries your name.',
    deliverables: [
      'NEXT Retreat “presented by…” — your name on the event itself',
      'Speaker opportunity',
      'Headline branding pre, during and post event',
      '4 all-inclusive tickets',
      'Delegate list pre-event (job title + company)',
      'Opportunity to contribute a gift to other attendees',
      'Invite up to 5 operator professionals (by approval)',
    ],
  },
  {
    id: 'general',
    name: 'General Partner',
    price: 35000,
    avail: 10,
    passes: 2,
    kicker: 'Ten per retreat',
    line: 'Two of your people in a room of a hundred.',
    deliverables: [
      'Branding pre, during and post event',
      '2 all-inclusive tickets',
      'Delegate list pre-event (job title + company)',
      'Opportunity to contribute a gift to other attendees',
      'Invite up to 5 operator professionals (by approval)',
    ],
  },
  {
    id: 'individual',
    name: 'Individual Ticket',
    price: 15000,
    avail: 21,
    passes: 1,
    kicker: 'Twenty-one per retreat',
    line: 'One pass. The full three days.',
    deliverables: [
      '1 all-inclusive delegate pass',
      'Two nights at the host resort',
      'Full programme: content sessions, networking breakfasts, lunches and dinners',
      'Leisure programme alongside the rest of the room',
      'No branding or speaking rights — those sit with the partnerships above',
    ],
  },
]

const ADDONS = [
  { id: 'yacht-golf', name: 'Yacht / Golf', price: 20000, avail: 1, icon: Sailboat, kicker: 'One per retreat' },
  { id: 'tasting', name: 'Tasting & Adventure', price: 15000, avail: 2, icon: Wine, kicker: 'Two per retreat' },
  { id: 'pool', name: 'Sport & Relaxation by the Pool', price: 10000, avail: 2, icon: Sun, kicker: 'Two per retreat' },
]

const ADDON_CONDITION =
  'Leisure activities are sold only alongside a Headline or General Partnership.'

/* Shared audience data — from the 2026 partner brochures */
const SENIORITY = [
  { label: 'C-level', pct: 83, tone: 'brand' },
  { label: 'Senior management', pct: 17, tone: 'quiet' },
]
const COMPOSITION = [
  { label: 'Operators', pct: 52, tone: 'brand' },
  { label: 'Service providers', pct: 35, tone: 'quiet' },
  { label: 'Investors', pct: 10, tone: 'quiet' },
  { label: 'Associations', pct: 3, tone: 'quiet' },
]
const DELEGATE_BUILD = [
  { n: 50, label: 'Complimentary operators, affiliates and influencers', tone: 'brand' },
  { n: 24, label: 'Partner passes', tone: 'white' },
  { n: 21, label: 'Individual tickets', tone: 'white' },
  { n: 5, label: 'Advisory board', tone: 'muted' },
]

const SELECTION = [
  { n: '01', title: 'Blask data', body: 'Market-share ranking across the region, so the invitation list starts with who actually matters.' },
  { n: '02', title: 'Relationships', body: 'Existing NEXT relationships and trusted operator contacts built over three editions.' },
  { n: '03', title: 'Advisory board', body: 'Nominations and validation from advisory board members on who belongs in the room.' },
  { n: '04', title: 'Ambassadors', body: 'Peer referrals from ambassadors who can carry the invitation credibly.' },
]

const POSITIONING = [
  {
    title: 'The most valuable room in iGaming',
    body: '100 senior leaders at an exact 50 operators / 50 suppliers balance. Deal-making, not networking.',
    icon: Handshake,
  },
  {
    title: 'Exclusive by design',
    body: 'A guest list capped at 100 delegates, under Chatham House Rule. The exclusivity is the asset.',
    icon: Lock,
  },
  {
    title: 'Built for business outcomes',
    body: 'Hosted meetings, curated content and premium leisure engineered for real deals, in a world-class resort.',
    icon: Trophy,
  },
  {
    title: 'The definitive regional forum',
    body: 'The retreat leading the conversation in iGaming\'s fastest-growing markets.',
    icon: Sparkles,
  },
]

const PARTNERS_2026 = [
  ['alea', 'Alea'], ['anakatech', 'Anakatech'], ['betby', 'BetBy'], ['flows', 'Flows'],
  ['optimove', 'Optimove'], ['playson', 'Playson'], ['softswiss', 'SoftSwiss'],
  ['spinoro', 'Spinoro'], ['z-gaming-asia', 'Z-Gaming Asia'],
]

/* ─── Brand furniture ───────────────────────────────────────────────────── */

/* The official NEXT.io arrow device: a stack of skewed slats whose right
   edges trace a chevron. Used as atmosphere, never as decoration for its
   own sake. */
function Chevrons({ className = '', rows = 8 }) {
  const H = 100
  const gap = H / rows
  const slatH = gap * 0.58
  const skew = 6
  const apex = 97
  const step = 10.5
  const mid = (rows - 1) / 2
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      {Array.from({ length: rows }, (_, i) => {
        const right = apex - Math.abs(i - mid) * step
        const y = i * gap + (gap - slatH) / 2
        return (
          <path
            key={i}
            d={`M0,${y} L${right},${y} L${right - skew},${y + slatH} L${-skew},${y + slatH} Z`}
            fill="currentColor"
          />
        )
      })}
    </svg>
  )
}

function Lockup({ className = 'h-10' }) {
  return (
    <img
      src={asset('logos/next-retreat-lockup.png')}
      alt="NEXT.io Retreat"
      className={`${className} w-auto`}
    />
  )
}

/* ─── Small hooks & primitives ──────────────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-scale')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

function Eyebrow({ n, children, className = '' }) {
  return (
    <div className={`font-sans text-[10px] sm:text-[11px] uppercase track-wide text-brand-yellow ${className}`}>
      {n && <><span className="num">{n}</span><span className="mx-2 opacity-40">/</span></>}
      {children}
    </div>
  )
}

function Rule({ className = '' }) {
  return <div className={`h-px hairline ${className}`} />
}

/* One header pattern for every section — this is what keeps the page from
   feeling like a stack of unrelated blocks. The title and the lede keep
   separate measures: display type sets about twenty characters to the line
   in its own size (two balanced lines at desktop, not a narrow tower with a
   stranded last word), while the lede keeps a reading measure. */
function SectionHead({ n, eyebrow, title, lede, aside, wide = false }) {
  return (
    <div className={`reveal ${aside ? 'flex flex-wrap items-end justify-between gap-8' : ''}`}>
      <div className={wide ? 'max-w-[36rem]' : ''}>
        <Eyebrow n={n}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 sm:mt-6 max-w-[20ch] text-balance font-display font-light text-white leading-[1.03] tracking-[-0.012em]
                       text-[2.3rem] sm:text-[3.3rem] lg:text-[4rem]">
          {title}
        </h2>
        {lede && (
          <p className={`mt-5 sm:mt-6 font-sans text-[15px] sm:text-[17px] font-light leading-relaxed text-white/60
                         ${wide ? '' : 'max-w-[29rem]'}`}>
            {lede}
          </p>
        )}
      </div>
      {aside}
    </div>
  )
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`jump relative py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  )
}

function Shell({ children, className = '' }) {
  return <div className={`mx-auto max-w-[1400px] px-5 sm:px-8 ${className}`}>{children}</div>
}

/* A logo on a wall. A shared height makes a long wordmark look huge next to
   a square mark, so each logo is sized to the same visual area instead:
   height ∝ 1/√(aspect), width ∝ √(aspect). The wall sets the scale with
   --logo-k (the side of the target square, in px) and caps it with the
   max-h / max-w classes passed in; object-contain keeps the ratio whichever
   cap bites. Until the file loads it simply renders at its natural size. */
function WallLogo({ src, alt, className = '' }) {
  const ref = useRef(null)
  const [ar, setAr] = useState(0)
  const measure = useCallback((img) => {
    if (img?.naturalWidth && img.naturalHeight) setAr(img.naturalWidth / img.naturalHeight)
  }, [])
  useEffect(() => {
    if (ref.current?.complete) measure(ref.current)
  }, [src, measure])
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      decoding="async"
      onLoad={(e) => measure(e.currentTarget)}
      style={ar ? { '--logo-h': 1 / Math.sqrt(ar), '--logo-w': Math.sqrt(ar) } : undefined}
      className={`object-contain ${ar
        ? 'h-[calc(var(--logo-k)*var(--logo-h))] w-[calc(var(--logo-k)*var(--logo-w))]'
        : 'h-auto w-auto'} ${className}`}
    />
  )
}

function useCountdown(iso) {
  const [left, setLeft] = useState(() => Math.max(0, new Date(iso) - new Date()))
  useEffect(() => {
    setLeft(Math.max(0, new Date(iso) - new Date()))
    const t = setInterval(() => setLeft(Math.max(0, new Date(iso) - new Date())), 60000)
    return () => clearInterval(t)
  }, [iso])
  return { d: Math.floor(left / 86400000) }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Proposal & rate-card exports
   ═══════════════════════════════════════════════════════════════════════════ */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function openPrintable(html) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 120000)
}

/* The printables are opened from a blob: URL, so every asset they load needs
   an absolute URL. They carry the same identity as the page: the official
   lockup file (never re-set as live text) and Jost, serif-free. */
const absUrl = (p) => new URL(p, window.location.href).href

function printShell(title, subtitle, body, { addonTerms = true } = {}) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${esc(title)}</title>
<script>window.addEventListener('load',function(){var go=function(){setTimeout(function(){window.print()},400)};if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go)}else{go()}});<\/script>
<style>
  @font-face{font-family:'Jost';font-style:normal;font-weight:200 700;src:url('${absUrl(jostLatin)}') format('woff2')}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Jost',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;color:#242426;background:#fff;font-size:12.5px;line-height:1.55}
  .cover{background:#242426;color:#fff;padding:44px 48px 42px;position:relative;overflow:hidden}
  .cover .lockup{display:block;height:46px;width:auto}
  .cover h1{font-size:31px;font-weight:300;letter-spacing:-0.005em;line-height:1.15;margin-top:26px}
  .cover p{color:#bdbdbd;margin-top:9px;font-size:12.5px}
  .cover .bar{position:absolute;right:0;top:0;bottom:0;width:120px;
    background:repeating-linear-gradient(180deg,#ffcf33 0 12px,transparent 12px 22px);opacity:.9;
    clip-path:polygon(0 0,70% 0,100% 50%,70% 100%,0 100%)}
  section{padding:26px 48px 6px}
  h2{font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;border-bottom:2px solid #ffcf33;padding-bottom:7px;margin-bottom:16px;page-break-after:avoid}
  .note{margin:-6px 0 14px;font-size:11.5px;color:#61616a}
  .item{border:1px solid #e3e3e5;border-radius:6px;padding:14px 16px;margin-bottom:12px;page-break-inside:avoid}
  .ihead{display:flex;justify-content:space-between;align-items:baseline;gap:14px}
  .ihead h3{font-size:15px;font-weight:600}
  .avail{font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:#6b5216;background:#fff6d9;border-radius:3px;padding:3px 8px;white-space:nowrap;margin-left:8px}
  .price{font-size:18px;font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums lining-nums}
  .line{font-style:italic;color:#61616a;margin:7px 0 9px}
  ul{padding-left:17px}
  li{margin-bottom:3px;color:#45454d}
  table{width:100%;border-collapse:collapse}
  thead tr{background:#f4f4f5}
  th{padding:9px 14px;text-align:left;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.14em;color:#82828c}
  th:last-child{text-align:right}
  td{padding:11px 14px;border-bottom:1px solid #ebebee;vertical-align:top}
  td:last-child{text-align:right;font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums lining-nums}
  .total td{background:#242426;color:#fff;font-weight:600;font-size:14px;border:0}
  .total td:last-child{color:#ffcf33;font-size:20px}
  .foot{padding:26px 48px 40px;border-top:2px solid #ffcf33;margin-top:26px;color:#61616a;font-size:11px;line-height:1.75}
  .foot strong{color:#242426;font-weight:600}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="cover">
  <div class="bar"></div>
  <img class="lockup" src="${absUrl(asset('logos/next-retreat-lockup.png'))}" alt="NEXT.io Retreat">
  <h1>${esc(title)}</h1>
  <p>${subtitle}</p>
</div>
${body}
<div class="foot">
  All prices exclude VAT. Availability is live and subject to change without notice.<br>
  ${addonTerms ? `${esc(ADDON_CONDITION)}<br>` : ''}
  Partnerships: <strong>sales@next.io</strong> &nbsp;·&nbsp; next.io
</div>
</body></html>`
}

const today = () =>
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function exportProposal(dest, cart) {
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const passes = cart.reduce((s, l) => s + (l.passes || 0) * l.qty, 0)
  const rows = cart.map((l) => `<tr>
      <td><div style="font-weight:700">${esc(l.name)}${l.qty > 1 ? ` &times;${l.qty}` : ''}</div>
      <div style="font-size:11px;color:#82828c;margin-top:2px">${esc(l.group)}</div></td>
      <td>${eur(l.price * l.qty)}</td></tr>`).join('')
  const body = `<section>
    <h2>Selected inventory</h2>
    <table><thead><tr><th>Product</th><th>Investment</th></tr></thead><tbody>
      ${rows}
      <tr class="total"><td>Total investment</td><td>${eur(total)}</td></tr>
    </tbody></table>
    <p style="margin-top:14px;font-size:11.5px;color:#61616a">
      Includes <strong>${passes}</strong> all-inclusive delegate pass${passes === 1 ? '' : 'es'}
      in a room capped at 100, split evenly between operators and suppliers.
    </p>
  </section>`
  openPrintable(printShell(
    `Retreat ${dest.tag} 2027 — Partnership Proposal`,
    `${esc(dest.dates)} &nbsp;·&nbsp; ${esc(dest.venue)}, ${esc(dest.place)} &nbsp;·&nbsp; Prepared ${today()}`,
    body,
  ))
}

function exportRateCard(dest) {
  const pkgs = PACKAGES.map((p) => `<div class="item">
      <div class="ihead"><div><h3 style="display:inline">${esc(p.name)}</h3>
      <span class="avail">${p.avail} available · ${p.passes} pass${p.passes === 1 ? '' : 'es'}</span></div>
      <div class="price">${eur(p.price)}</div></div>
      <p class="line">${esc(p.line)}</p>
      <ul>${p.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
    </div>`).join('')
  const adds = ADDONS.map((a) => {
    const local = dest.activities[a.id]
    return `<div class="item">
      <div class="ihead"><div><h3 style="display:inline">${esc(a.name)}</h3>
      <span class="avail">${a.avail} available</span></div>
      <div class="price">${eur(a.price)}</div></div>
      <p class="line">${esc(local.title)}</p>
      <ul><li>${esc(local.blurb)}</li></ul>
    </div>`
  }).join('')
  // The add-on condition is stated once, where it applies, rather than boxed
  // under every activity and repeated again in the footer.
  const body = `<section><h2>Partnerships &amp; tickets</h2>${pkgs}</section>
    <section><h2>Leisure activities · ${esc(dest.place)}</h2>
      <p class="note">${esc(ADDON_CONDITION)}</p>${adds}</section>
    <section><h2>The room</h2>
      <div class="item">
        <ul>
          <li>100 delegates, capped — an even 50 operators / 50 suppliers split</li>
          <li>83% C-level, 17% senior management</li>
          <li>52% operators, 35% service providers, 10% investors, 3% associations</li>
          <li>All content under Chatham House Rule</li>
          <li>Personalised onboarding and meeting matchmaking completed one month out</li>
          <li>${esc(dest.focus)}</li>
        </ul>
      </div>
    </section>`
  openPrintable(printShell(
    `Retreat ${dest.tag} 2027 — Rate Card`,
    `${esc(dest.dates)} &nbsp;·&nbsp; ${esc(dest.venue)}, ${esc(dest.place)} &nbsp;·&nbsp; Generated ${today()}`,
    body,
    { addonTerms: false },
  ))
}

function buildMailto(dest, cart) {
  const subject = `NEXT Retreat ${dest.tag} 2027 — partnership enquiry`
  if (!cart.length) return `mailto:sales@next.io?subject=${encodeURIComponent(subject)}`
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const body = [
    `NEXT Retreat ${dest.tag} 2027 — ${dest.dates}`,
    `${dest.venue}, ${dest.place}`,
    '',
    'Interested in:',
    ...cart.map((l) => `· ${l.name}${l.qty > 1 ? ` x${l.qty}` : ''} — ${eur(l.price * l.qty)}`),
    '',
    `Total: ${eur(total)} (excl. VAT)`,
    '',
    'Please confirm availability and next steps.',
  ].join('\n')
  return `mailto:sales@next.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/* ═══════════════════════════════════════════════════════════════════════════
   Chrome
   ═══════════════════════════════════════════════════════════════════════════ */

const NAV = [
  ['verdict', 'The verdict'],
  ['why', 'Why it works'],
  ['room', 'The room'],
  ['days', 'Three days'],
  ['partner', 'Partnerships'],
  ['leisure', 'Leisure'],
  ['build', 'Build a package'],
]

/* The compact switch lives in the header. Each tab is a full 40px-tall target;
   the yellow pill is drawn 3px inside it, so the control reads as compact as
   it did while being easy to hit with a thumb. */
function DestinationSwitch({ active, onChange, compact = false }) {
  return (
    <div
      role="tablist"
      aria-label="Choose a retreat"
      className={`relative inline-flex items-center rounded-full border border-white/15 bg-ink/70 backdrop-blur-md
                  ${compact ? '' : 'p-1'}`}
    >
      {Object.values(DESTINATIONS).map((d) => {
        const on = d.id === active
        return (
          <button
            key={d.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(d.id)}
            className={`relative whitespace-nowrap rounded-full transition-all duration-500 font-sans
                        ${compact ? 'h-10 px-3 min-[360px]:px-4 text-[11px]' : 'min-h-10 px-5 sm:px-7 py-2.5 text-xs sm:text-[13px]'}
                        ${on
                          ? `${compact ? '' : 'bg-brand-yellow'} text-brand-dark font-medium`
                          : 'text-white/60 hover:text-white/90'}`}
          >
            {compact && (
              <span
                aria-hidden="true"
                className={`absolute inset-[3px] rounded-full transition-colors duration-500 ${on ? 'bg-brand-yellow' : ''}`}
              />
            )}
            <span className="relative uppercase track-mid">{d.tag}</span>
            {!compact && (
              <span className={`ml-2.5 hidden sm:inline num ${on ? 'text-brand-dark/65' : 'text-white/35'}`}>
                {d.datesTight}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* The product is one tap away at every width. From xl the section nav carries
   "Partnerships"; below xl, where that nav does not fit, a Prices link sits in
   the header (the second row on a phone, beside the switch) and a menu holds
   the same sections as the desktop nav. */
/* Display comes from the caller (inline-flex, or hidden + a breakpoint), so a
   base display class can never override the caller's "hidden". */
function PricesLink({ className = 'inline-flex', onClick }) {
  return (
    <a
      href="#partner"
      data-prices
      onClick={onClick}
      className={`h-[42px] shrink-0 items-center gap-2 rounded-full border border-white/20 bg-ink/70
                  px-3 min-[360px]:px-4 font-sans text-[11px] uppercase track-mid text-white/85 backdrop-blur-md
                  hover:border-brand-yellow/60 hover:text-brand-yellow transition ${className}`}
    >
      <Ticket size={13} strokeWidth={1.6} className="text-brand-yellow" aria-hidden="true" />
      Prices
    </a>
  )
}

function Nav({ destId, setDestId, cartCount }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)
  const menuBtnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Anchors land below the header at every breakpoint because its real height
  // (two rows on a phone, one from md) is measured into --nav-h, not assumed.
  // Only the bar is measured: the open menu hangs below it.
  useLayoutEffect(() => {
    const el = barRef.current
    if (!el) return
    const root = document.documentElement
    const set = () => root.style.setProperty('--nav-h', `${Math.round(el.getBoundingClientRect().height)}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Escape closes the menu and hands focus back to its button; reaching xl,
  // where the full nav takes over, closes it too.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 1280px)')
    const onMq = () => { if (mq.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-ink/55 md:bg-transparent xl:hidden" onClick={close} aria-hidden="true" />
      )}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
                    ${solid || open
                      ? 'bg-ink/92 backdrop-blur-xl border-b border-white/10'
                      : 'bg-gradient-to-b from-ink/85 via-ink/45 to-transparent'}`}
      >
        <div ref={barRef} data-bar>
          <Shell className="h-14 md:h-20 flex items-center gap-3 md:gap-4">
            {/* The hero carries the full-size lockup, so the header only shows its
                own once the hero's has scrolled away — never two on one screen. */}
            <a
              href="#top"
              onClick={close}
              className={`inline-flex h-10 shrink-0 items-center transition-[opacity,visibility] duration-500
                          ${solid ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              aria-label="Top"
            >
              <Lockup className="h-8 md:h-10" />
            </a>
            <nav aria-label="Sections" className="hidden xl:flex items-center gap-5 ml-7 font-sans text-[11.5px] uppercase track-mid whitespace-nowrap">
              {NAV.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="inline-flex h-10 items-center text-white/60 hover:text-brand-yellow transition-colors">
                  {label}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:gap-3">
              <div className="hidden md:block">
                <DestinationSwitch active={destId} onChange={setDestId} compact />
              </div>
              <PricesLink className="hidden md:inline-flex xl:hidden" onClick={close} />
              <a
                href="#build"
                onClick={close}
                className="relative inline-flex h-[42px] items-center gap-2 rounded-full bg-brand-yellow px-4 md:px-5
                           font-sans text-[11px] md:text-xs uppercase track-mid text-brand-dark font-medium
                           hover:brightness-110 transition"
              >
                Enquire
                {cartCount > 0 && (
                  <span className="grid place-items-center h-4 w-4 rounded-full bg-brand-dark text-brand-yellow text-[9px] num">
                    {cartCount}
                  </span>
                )}
              </a>
              <button
                ref={menuBtnRef}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-controls="site-menu"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Menu'}
                className="xl:hidden grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-white/20
                           bg-ink/70 text-white/85 backdrop-blur-md hover:border-brand-yellow/60 hover:text-brand-yellow transition"
              >
                {open ? <X size={17} strokeWidth={1.6} /> : <Menu size={17} strokeWidth={1.6} />}
              </button>
            </div>
          </Shell>
          <div className="md:hidden px-5 pb-2 flex items-center justify-between gap-2 min-[360px]:gap-3">
            <DestinationSwitch active={destId} onChange={setDestId} compact />
            <PricesLink onClick={close} />
          </div>
        </div>

        {open && (
          <nav
            id="site-menu"
            aria-label="Sections"
            className="menu-in absolute top-full inset-x-0 md:left-auto md:right-8 md:mt-2 md:w-80 xl:hidden
                       max-h-[calc(100svh-var(--nav-h))] overflow-y-auto
                       bg-ink/[0.97] border-b md:border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            <ul className="px-5 md:px-6 py-2">
              {NAV.map(([id, label]) => (
                <li key={id} className="border-b border-white/[0.07] last:border-b-0">
                  <a
                    href={`#${id}`}
                    onClick={close}
                    className="group flex h-12 items-center justify-between gap-4 font-sans text-[12px] uppercase track-mid
                               text-white/80 hover:text-brand-yellow transition-colors"
                  >
                    {label}
                    <ArrowRight size={14} strokeWidth={1.6} className="text-white/35 group-hover:text-brand-yellow transition-colors" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}


/* ═══════════════════════════════════════════════════════════════════════════
   SeaWaves — drifting sea-tinted bands (atmosphere only, like the caustics)
   ═══════════════════════════════════════════════════════════════════════════ */

function wavePath(amp, y) {
  let d = `M0 ${y}`
  for (let x = 0; x < 2880; x += 360) {
    d += ` C ${x + 90} ${y - amp}, ${x + 270} ${y + amp}, ${x + 360} ${y}`
  }
  return d + ' L2880 140 L0 140 Z'
}

function SeaWaves({ className = '' }) {
  return (
    <div aria-hidden className={`pointer-events-none h-[72px] sm:h-[110px] overflow-hidden ${className}`}>
      {[
        ['wave-track', 26, 58, 'var(--sea)', 0.16],
        ['wave-track-2', 18, 74, 'var(--sea-soft)', 0.13],
        ['wave-track-3', 30, 88, 'var(--sea)', 0.24],
      ].map(([track, amp, y, fill, op]) => (
        <svg
          key={track}
          viewBox="0 0 2880 140"
          preserveAspectRatio="none"
          className={`absolute bottom-0 left-0 h-full w-[200%] ${track}`}
        >
          <path d={wavePath(amp, y)} fill={fill} fillOpacity={op} />
        </svg>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   First-screen price panel
   Stuart, 23 Sep 2026: "it's hard to find products when i have to scroll
   right down for them". The hero now says what a partner can buy and what it
   costs: each package with its price, availability and passes, and the
   leisure range stated together with its condition. Every figure is read from
   PACKAGES / ADDONS / ADDON_CONDITION, so it cannot drift from the cards.
   Each row links to its own card (#partner-<id>); the rate-card export and
   the leisure line follow the destination switch. A summary, not a copy of
   the product section.
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroPrices({ dest, className = '' }) {
  const addonPrices = ADDONS.map((a) => a.price)
  const lo = Math.min(...addonPrices)
  const hi = Math.max(...addonPrices)
  return (
    <aside
      data-panel="prices"
      aria-labelledby="hero-prices-title"
      className={`relative border border-white/12 bg-ink/70 backdrop-blur-xl
                  shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)] ${className}`}
    >
      <span aria-hidden="true" className="absolute top-0 inset-x-0 h-[2px] bg-brand-yellow" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 sm:px-7 pt-5 pb-4">
        <p id="hero-prices-title" className="whitespace-nowrap font-sans text-[10px] sm:text-[11px] uppercase track-wide text-brand-yellow">
          Partnerships &amp; tickets
        </p>
        <span className="whitespace-nowrap font-sans text-[11px] font-light text-white/55">All prices exclude VAT.</span>
      </div>

      <ul>
        {PACKAGES.map((p) => (
          <li key={p.id} className="border-t border-white/10">
            {/* Name and price share the first line; the facts run the full
                width beneath, so they stay on one line on a phone */}
            <a
              href={`#partner-${p.id}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 px-5 sm:px-7 py-3.5
                         transition-colors hover:bg-white/[0.04]"
            >
              <span className="font-display text-[1.2rem] sm:text-[1.3rem] font-light leading-tight text-white
                               group-hover:text-brand-yellow transition-colors">
                {p.name}
              </span>
              <span className="font-display text-[1.45rem] sm:text-[1.6rem] font-light leading-tight text-white num">
                {eur(p.price)}
              </span>
              <span className="col-span-2 mt-1 flex flex-wrap items-center gap-x-2 font-sans text-[11.5px] leading-snug text-white/60">
                {p.exclusive && (
                  <>
                    <span className="inline-flex items-center gap-1 text-brand-yellow">
                      <Crown size={11} strokeWidth={1.5} aria-hidden="true" /> Exclusive
                    </span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                  </>
                )}
                <span className="num">{p.avail} available</span>
                <span aria-hidden="true" className="text-white/30">·</span>
                <span className="num">{p.passes} all-inclusive pass{p.passes === 1 ? '' : 'es'}</span>
              </span>
            </a>
          </li>
        ))}
        <li className="border-t border-white/10">
          <a href="#leisure" className="group block px-5 sm:px-7 py-3.5 transition-colors hover:bg-white/[0.04]">
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <span className="font-sans text-[14px] text-white/85 group-hover:text-brand-yellow transition-colors">
                Leisure activities · {dest.place}
              </span>
              <span className="shrink-0 font-display text-[1.15rem] font-light leading-snug text-white num">
                {eur(lo)} – {eur(hi)}
              </span>
            </span>
            <span className="mt-1.5 flex items-start gap-2 font-sans text-[11.5px] leading-snug text-white/60">
              <Lock size={12} strokeWidth={1.5} className="mt-[2px] shrink-0 text-brand-yellow" aria-hidden="true" />
              {ADDON_CONDITION}
            </span>
          </a>
        </li>
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5 border-t border-white/10 px-5 sm:px-7 py-4">
        <a
          href="#partner"
          className="inline-flex h-11 items-center gap-2.5 whitespace-nowrap bg-brand-yellow px-5 font-sans text-[11px] uppercase
                     track-mid font-medium text-brand-dark hover:brightness-110 transition"
        >
          See partnerships <ArrowRight size={13} strokeWidth={1.75} />
        </a>
        <button
          type="button"
          onClick={() => exportRateCard(dest)}
          className="inline-flex h-10 items-center gap-2 whitespace-nowrap font-sans text-[10.5px] uppercase track-mid
                     text-white/65 hover:text-brand-yellow transition"
        >
          <Download size={13} strokeWidth={1.5} /> Rate card · {dest.tag}
        </button>
      </div>
    </aside>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Hero
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero({ dest, destId, setDestId }) {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        {Object.values(DESTINATIONS).map((d) => (
          <img
            key={d.id}
            src={asset(d.hero)}
            alt={d.heroAlt}
            className={`absolute inset-0 h-full w-full object-cover [filter:saturate(1.14)_contrast(1.04)]
                        transition-opacity duration-[1400ms] ease-out
                        ${d.id === destId ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/58 via-ink/34 to-ink" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(100deg, rgba(28,28,31,0.93) 0%, rgba(28,28,31,0.62) 42%, transparent 68%)' }}
        />
        <div className="caustics" />
      </div>

      <div className="grain absolute inset-0" />
      <SeaWaves className="absolute inset-x-0 bottom-0 z-[1] w-full" />

      {/* Clears the measured header (two rows on a phone, one from md) */}
      <Shell className="relative flex-1 w-full flex flex-col justify-center pt-[calc(var(--nav-h)+1.75rem)] pb-14">
        {/* One grid, so nothing renders twice: on a phone and tablet the price
            panel follows the headline (it is on the first screen); from lg it
            takes the right-hand column beside the whole text block. */}
        <div className="reveal in grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22.5rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,28.5rem)]
                        lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <Lockup className="h-14 sm:h-20 lg:h-24" />

            {/* The official cover line, set the way the brochure sets it */}
            <div className="mt-6 sm:mt-7">
              <div className="font-sans text-[13px] sm:text-base font-medium uppercase track-mid text-white">
                {dest.coverLine}
              </div>
              <div className="mt-1.5 font-sans text-[15px] sm:text-lg font-medium text-brand-yellow">
                {dest.venue}
              </div>
            </div>
          </div>

          <h1 className="lg:col-start-1 lg:row-start-2 mt-9 sm:mt-12 font-display font-light text-white leading-[0.92] tracking-[-0.015em]
                         text-[3rem] sm:text-[4.6rem] lg:text-[5.2rem] xl:text-[6.4rem] max-w-[19ch]">
            Fifty operators.
            <br />
            <span className="italic text-brand-yellow">Fifty suppliers.</span>
            <br />
            One shoreline.
          </h1>

          <HeroPrices
            dest={dest}
            className="mt-7 sm:mt-11 lg:mt-0 max-w-[34rem] lg:max-w-none
                       lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:self-center"
          />

          <p className="lg:col-start-1 lg:row-start-3 mt-8 max-w-[46ch] font-sans text-[15px] sm:text-lg font-light leading-relaxed text-white/65">
            One hundred senior executives, three days, two nights, and a room built
            so that the people who buy and the people who build finally have time
            to talk. Everything said in it stays in it.
          </p>

          <div className="lg:col-start-1 lg:row-start-4 mt-9 sm:mt-11 hidden sm:block">
            <DestinationSwitch active={destId} onChange={setDestId} />
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <Rule className="mb-7 opacity-60" />
          {/* Each value is a run of unbreakable phrases: a line may only break
              between them (after the "·"), so "50 / 50" or "Chatham House Rule"
              never split and no single word is left on a line of its own. */}
          <dl className="grid grid-cols-2 gap-y-8 gap-x-6 lg:flex lg:justify-between lg:gap-x-8">
            {[
              [Users, 'The room', ['100 delegates', '50 / 50'], true],
              [Waves, 'Format', ['Retreat', '3 days, 2 nights'], true],
              [Crown, 'Edition', ['4th', 'capped guest list'], true],
              [ShieldCheck, 'On the record', ['Nothing.', 'Chatham House Rule'], false],
            ].map(([Icon, k, parts, dotted], i) => (
              <div key={k} className="reveal in min-w-0" style={{ transitionDelay: `${120 + i * 90}ms` }}>
                <dt className="flex items-center gap-2 font-sans text-[10px] uppercase track-wide text-white/55">
                  <Icon size={13} className="text-brand-yellow" strokeWidth={1.5} />
                  {k}
                </dt>
                <dd className="mt-2 font-display text-[17px] sm:text-xl xl:text-2xl font-light text-white leading-snug num">
                  {parts.map((p, j) => (
                    <span key={p}>
                      {j > 0 && ' '}
                      <span className="whitespace-nowrap">
                        {p}
                        {dotted && j < parts.length - 1 && <span className="text-white/35"> ·</span>}
                      </span>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Shell>

      <a
        href="#verdict"
        className="relative mx-auto mb-8 grid place-items-center h-11 w-11 rounded-full border border-white/20
                   text-white/45 hover:text-brand-yellow hover:border-brand-yellow/50 transition"
        aria-label="Scroll on"
      >
        <ChevronDown size={17} strokeWidth={1.5} />
      </a>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   01 · The verdict — C-level feedback, up front
   ═══════════════════════════════════════════════════════════════════════════ */

function Verdict({ dest }) {
  const fb = dest.feedback
  return (
    <Section id="verdict" className="overflow-hidden">
      <Shell>
        <SectionHead
          n="01"
          eyebrow="The verdict"
          title={<>They score it themselves. Then they come back.</>}
          lede="Every delegate is surveyed afterwards. These are the numbers the room gave us, before anybody asked them for money."
        />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-[0.8fr_1fr] gap-14 lg:gap-24 items-start">
          <div className="reveal lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <div className="flex items-start gap-4">
              <span className="font-display text-[5.5rem] sm:text-[7.5rem] font-light leading-[0.78] text-brand-yellow num">
                {fb.headline.score}
              </span>
              <span className="mt-3 font-display text-3xl font-light text-white/30">/10</span>
            </div>
            <p className="mt-4 font-sans text-[15px] text-white/75 max-w-[30ch]">{fb.headline.label}</p>
            <Rule className="my-8 opacity-40" />
            {/* Breaks only between its phrases, never "… · MOST / RECENT …" */}
            <p className="font-sans text-[11.5px] uppercase track-mid text-white/55 max-w-[42ch]">
              {fb.source.split(' · ').map((part, i) => (
                <span key={part}>
                  {i > 0 && ' '}
                  <span className="whitespace-nowrap">{part}{i < fb.source.split(' · ').length - 1 && ' ·'}</span>
                </span>
              ))}
            </p>
          </div>

          <ul className="reveal">
            {fb.rows.map(([label, score], i) => (
              <li key={label} className="flex items-baseline gap-5 py-5 border-b border-white/[0.09]">
                <span className="font-sans text-[10px] num text-white/25 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-balance font-sans text-[14px] sm:text-[15px] font-light text-white/75 leading-snug">
                  {label}
                </span>
                <span className="relative h-[2px] flex-1 max-w-[7rem] hidden sm:block bg-white/10 self-center">
                  <span
                    className="absolute inset-y-0 left-0"
                    style={{ width: `${(parseFloat(score) / 10) * 100}%`, background: 'var(--color-brand-yellow)', opacity: 0.65 }}
                  />
                </span>
                <span className="font-display text-2xl sm:text-[1.75rem] font-light text-white num shrink-0 w-16 text-right">
                  {score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   02 · Why it works
   ═══════════════════════════════════════════════════════════════════════════ */

function Why({ dest }) {
  return (
    <Section id="why" className="overflow-hidden">
      <Shell>
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-14 lg:gap-24 items-start">
          <div>
            <SectionHead
              n="02"
              eyebrow="Why it works"
              wide
              title={<>Suppliers get the one thing a trade floor never gives them —<span className="italic text-brand-yellow"> unhurried time with the decision-maker.</span></>}
            />
            <div className="reveal mt-9 space-y-5 font-sans text-[15px] sm:text-[17px] font-light leading-relaxed text-white/65 max-w-[54ch]">
              <p>
                At a conference you get ninety seconds at a stand. Here you get three
                days at the same resort as the person who signs — over breakfast, on
                the boat, at the long table after dinner. Half the room runs an
                operator. The other half supplies them. That ratio is enforced, not
                hoped for.
              </p>
              <p>
                Everything is under Chatham House Rule, so the conversations are the
                real ones. And every delegate is onboarded and matched personally a
                month out, which means nobody arrives wondering who to find.
              </p>
            </div>

            <div className="reveal mt-10 grid grid-cols-3 gap-x-5 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-5">
              {[['100', 'delegates, capped'], ['50/50', 'operators to suppliers'], ['83%', 'C-level']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[2.1rem] sm:text-5xl font-light text-brand-yellow num leading-none">{n}</div>
                  <div className="mt-2.5 font-sans text-[10px] sm:text-[11px] leading-relaxed uppercase track-mid text-white/55">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal-scale">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={asset(dest.lifeShots[0].src)}
                alt={dest.lifeShots[0].alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-5 sm:-left-12 w-[52%] aspect-[5/4] overflow-hidden
                            ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
              <img
                src={asset(dest.lifeShots[1].src)}
                alt={dest.lifeShots[1].alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 sm:mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {POSITIONING.map((p, i) => (
            <div
              key={p.title}
              className="reveal bg-[var(--ground)] p-7 sm:p-9 hover:bg-[var(--ground-2)] transition-colors duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p.icon size={20} className="text-brand-yellow mb-6" strokeWidth={1.25} />
              <h3 className="font-display text-xl sm:text-[1.6rem] font-light leading-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3.5 font-sans text-[13.5px] font-light leading-relaxed text-white/55">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   03 · The room
   ═══════════════════════════════════════════════════════════════════════════ */

function Bar({ label, pct, delay = 0, tone = 'brand' }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setW(pct), delay)
        io.unobserve(el)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [pct, delay])
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-sans text-[13px] font-light text-white/70">{label}</span>
        <span className="font-display text-2xl font-light text-white num">{pct}%</span>
      </div>
      <div className="mt-2 h-[3px] bg-white/10 overflow-hidden">
        <div
          className="h-full transition-[width] duration-[1600ms] ease-out"
          style={{ width: `${w}%`, background: tone === 'brand' ? 'var(--color-brand-yellow)' : 'rgba(255,255,255,0.34)' }}
        />
      </div>
    </div>
  )
}

const numTone = {
  brand: 'var(--color-brand-yellow)',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.4)',
}

function TheRoom({ dest }) {
  return (
    <Section id="room" className="overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ground-2)]/50 to-transparent" />
      <Shell className="relative">
        <SectionHead
          n="03"
          eyebrow="The room"
          title="A hundred people, chosen one at a time."
          lede={`${dest.focus} Growth never dilutes the cap — the hundred is the product.`}
        />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-3 gap-px bg-white/10">
          <div className="bg-[var(--ground)] p-8 sm:p-10 reveal">
            <h3 className="font-sans text-[11px] uppercase track-mid text-white/55">Seniority</h3>
            <div className="mt-8 space-y-7">
              {SENIORITY.map((s, i) => <Bar key={s.label} {...s} delay={i * 180} />)}
            </div>
            <p className="mt-9 font-sans text-[12px] font-light leading-relaxed text-white/55">
              Every delegate is a C-level executive or a senior decision-maker with
              budget. There is no junior tier.
            </p>
          </div>

          <div className="bg-[var(--ground)] p-8 sm:p-10 reveal" style={{ transitionDelay: '110ms' }}>
            <h3 className="font-sans text-[11px] uppercase track-mid text-white/55">Who they are</h3>
            <div className="mt-8 space-y-7">
              {COMPOSITION.map((c, i) => <Bar key={c.label} {...c} delay={i * 150} />)}
            </div>
            <p className="mt-9 font-sans text-[12px] font-light leading-relaxed text-white/55">
              Operators lead the mix. The rest of the room is there to meet them.
            </p>
          </div>

          <div className="bg-[var(--ground)] p-8 sm:p-10 reveal" style={{ transitionDelay: '220ms' }}>
            <h3 className="font-sans text-[11px] uppercase track-mid text-white/55">How the hundred is built</h3>
            <ul className="mt-8 space-y-5">
              {DELEGATE_BUILD.map((d) => (
                <li key={d.label} className="flex items-baseline gap-4">
                  {/* Wide enough for the three-digit total below, so every
                      label (and "Total") starts on one left edge */}
                  <span
                    className="font-display text-3xl font-light num shrink-0 w-14"
                    style={{ color: numTone[d.tone] }}
                  >
                    {d.n}
                  </span>
                  <span className="font-sans text-[13px] font-light leading-snug text-white/70">{d.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-baseline gap-4">
              <span className="font-display text-3xl font-light text-white num shrink-0 w-14">100</span>
              <span className="font-sans text-[13px] uppercase track-mid text-white/55">Total</span>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-28 grid lg:grid-cols-[0.85fr_1fr] gap-14 lg:gap-20 items-center">
          <div className="reveal">
            <Eyebrow className="mb-5">{dest.tag} · the fifty we invite</Eyebrow>
            <h3 className="font-display text-3xl sm:text-[2.7rem] font-light leading-[1.06] text-white">
              Fifty C-level guests attend on us, so the fifty who pay have someone to meet.
            </h3>
            <p className="mt-5 font-sans text-[14px] font-light leading-relaxed text-white/55 max-w-[46ch]">
              Operators, affiliates and influencers come as guests of NEXT.io. Partner
              investment is what puts them in the room — and what makes the room worth
              being in.
            </p>
          </div>
          <div className="reveal grid grid-cols-3 gap-px bg-white/10" style={{ transitionDelay: '120ms' }}>
            {dest.target.map((t) => (
              <div key={t.label} className="bg-[var(--ground-2)] px-4 py-6 sm:p-7">
                <div className="font-display text-[2.6rem] sm:text-5xl font-light text-brand-yellow num leading-none">{t.n}</div>
                <div className="mt-4 font-sans text-[13px] text-white/80">{t.label}</div>
                <div className="mt-1.5 font-sans text-[11.5px] font-light leading-snug text-white/55">{t.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 sm:mt-32">
          <div className="reveal flex items-end justify-between gap-6 flex-wrap">
            <h3 className="font-display text-2xl sm:text-[2.2rem] font-light text-white">
              How the list gets made
            </h3>
            <p className="font-sans text-[12px] uppercase track-mid text-white/55">Four filters, no applications</p>
          </div>
          <Rule className="mt-6 mb-10 opacity-50" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            {SELECTION.map((s, i) => (
              <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="font-display text-[2.6rem] font-light text-brand-yellow/40 num leading-none">{s.n}</div>
                <h4 className="mt-4 font-sans text-[15px] text-white">{s.title}</h4>
                <p className="mt-2.5 font-sans text-[13px] font-light leading-relaxed text-white/50">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   04 · Who is in the room
   ═══════════════════════════════════════════════════════════════════════════ */

function WhoIsIn({ dest }) {
  const half = Math.ceil(dest.attendees.length / 2)
  const rows = [dest.attendees.slice(0, half), dest.attendees.slice(half)]
  return (
    <Section id="who" className="overflow-hidden">
      <Shell>
        <SectionHead
          n="04"
          eyebrow={`In the room · ${dest.tag} 2026`}
          title="The companies who were already there."
          lede={`${dest.attendees.length} businesses on the ${dest.tag === 'LatAm' ? 'Cancún' : 'Cyprus'} guest list for 2026 — operators, affiliates, suppliers and investors, sat at the same tables for three days.`}
        />
      </Shell>

      <div className="mt-14 sm:mt-20 rail-host space-y-4 sm:space-y-6">
        {rows.map((row, ri) => (
          <div key={ri} className="overflow-hidden edge-fade-x">
            <div
              className={`flex w-max items-center ${ri % 2 ? 'rail-slow' : 'rail'}`}
              style={ri % 2 ? { animationDirection: 'reverse' } : undefined}
            >
              {/* Not lazy-loaded: tiles slide in from outside a clipped rail, so
                  lazy images arrive late and read as empty boxes. */}
              {[...row, ...row].map(([file, name], i) => (
                <div
                  key={`${file}-${i}`}
                  className="shrink-0 mx-3 sm:mx-5 h-16 sm:h-20 w-32 sm:w-44 grid place-items-center
                             bg-white/[0.04] border border-white/[0.07] px-4 sm:px-6
                             [--logo-k:40px] sm:[--logo-k:52px]
                             hover:bg-white/[0.09] hover:border-brand-yellow/30 transition-colors duration-400"
                  title={name}
                >
                  <WallLogo
                    src={asset(`${dest.logoDir}/${file}.png`)}
                    alt={name}
                    className="max-h-9 sm:max-h-11 max-w-full
                               opacity-90 [filter:brightness(0)_invert(1)] mix-blend-screen"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Shell className="mt-20 sm:mt-28">
        <div className="reveal grid lg:grid-cols-[0.8fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow className="mb-5">The titles on the 2026 guest list</Eyebrow>
            <h3 className="font-display text-3xl sm:text-[2.6rem] font-light leading-[1.08] text-white">
              Who you are actually sitting with.
            </h3>
            <p className="mt-5 font-sans text-[13.5px] font-light leading-relaxed text-white/55 max-w-[42ch]">
              A sample of the roles confirmed for the {dest.tag} 2026 retreat.
              Eighty-three per cent of the room is C-level.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {dest.titles.map((t, i) => (
              <span
                key={t}
                className="reveal font-sans text-[12px] sm:text-[13px] font-light text-white/80
                           border border-white/15 rounded-full px-4 py-2
                           hover:border-brand-yellow/50 hover:text-brand-yellow transition-colors"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   05 · Three days
   ═══════════════════════════════════════════════════════════════════════════ */

/* "Monday 11 October" → its parts, so the day can be set as a dated tile.
   Anything in another shape is rendered exactly as written. */
function splitDate(s) {
  const m = /^(\S+)\s+(\d{1,2})\s+(.+)$/.exec(s)
  return m ? { weekday: m[1], day: m[2], month: m[3] } : null
}

function ThreeDays({ dest }) {
  return (
    <Section id="days" className="overflow-hidden">
      <div className="absolute inset-0 opacity-[0.12]">
        <img src={asset(dest.resortShots[0].src)} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ground)] via-[var(--ground)]/60 to-[var(--ground)]" />
      </div>

      <Shell className="relative">
        <SectionHead
          n="05"
          eyebrow="The programme"
          title="Three days, two nights, one guest list."
          aside={
            <div className="font-sans lg:text-right">
              <div className="text-[11px] uppercase track-mid text-white/55">{dest.tag}</div>
              <div className="mt-1.5 font-display text-2xl sm:text-3xl font-light text-brand-yellow num">
                {dest.dates}
              </div>
              <div className="mt-1 text-[12.5px] font-light text-white/50">{dest.venue}</div>
            </div>
          }
        />

        {/* A timeline, not three cards: on desktop a rail joins the three days
            and each day drops its own spine; on a phone the spine runs
            unbroken from arrival to check-out. */}
        <div className="relative mt-14 sm:mt-20">
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-[7px] right-0 top-[7px] h-px
                       bg-gradient-to-r from-white/25 via-white/15 to-transparent"
          />
          <ol className="grid md:grid-cols-3 md:gap-x-10 lg:gap-x-14">
            {dest.days.map((day, i) => {
              const d = splitDate(day.date)
              const last = i === dest.days.length - 1
              return (
                <li
                  key={day.n}
                  className={`reveal relative pl-10 md:self-start ${last ? '' : 'pb-14 md:pb-0'}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-[7px] top-[7px] w-px bg-white/15 ${last ? 'bottom-2.5' : 'bottom-0 md:bottom-2.5'}`}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 grid h-[15px] w-[15px] place-items-center rounded-full
                               border border-brand-yellow bg-[var(--ground)]"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-brand-yellow" />
                  </span>
  
                  <div className="md:pt-10">
                    <div className="font-sans text-[10px] leading-[15px] uppercase track-wide text-brand-yellow">
                      Day {day.n}
                    </div>
                    {d ? (
                      <div className="mt-4 flex items-end gap-3.5">
                        <span className="font-display text-[3.5rem] sm:text-[4.2rem] font-light leading-[0.78] text-white num">
                          {d.day}
                        </span>
                        <span className="pb-px">
                          <span className="block font-sans text-[15px] leading-tight text-white/90">{d.weekday}</span>
                          <span className="mt-1 block font-sans text-[10.5px] leading-tight uppercase track-mid text-white/55">
                            {d.month}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="mt-3 font-sans text-[15px] text-white/90">{day.date}</div>
                    )}
                  </div>
  
                  <ul className="mt-8 space-y-3.5">
                    {day.items.map((it) => (
                      <li key={it} className="relative font-sans text-[14.5px] font-light leading-snug text-white/75">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[35px] top-[0.7em] h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-white/45"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-16 sm:mt-20 pt-12 border-t border-white/10 grid sm:grid-cols-3 gap-8">
          {[
            [Mic, 'Content that operators front', 'Operator and influencer speakers on the agenda, with strong C-level representation on stage. Interactive, workshop and roundtable formats — not a lecture theatre.'],
            [ShieldCheck, 'Chatham House Rule', 'Every session is off the record, which is why the answers are candid and the room says what it actually thinks.'],
            [BadgeCheck, 'Matched a month out', 'Personalised onboarding and meeting matchmaking completed one month before arrival. First-timers leave with a network; returners leave with fresh contacts.'],
          ].map(([Icon, title, body], i) => (
            <div key={title} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <Icon size={19} className="text-brand-yellow mb-4" strokeWidth={1.25} />
              <h4 className="font-display text-xl font-light text-white">{title}</h4>
              <p className="mt-2.5 font-sans text-[13px] font-light leading-relaxed text-white/55">{body}</p>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   06 · Partnerships
   ═══════════════════════════════════════════════════════════════════════════ */

/* Six rows, the same in every card. On desktop the cards are subgrids of one
   shared row set (row-span-6 must match the number of direct children), so
   the price, the spec line, the list and the button sit at the same height
   across all three however long each name, promise or list runs. */
function PackageCard({ pkg, onAdd, inCart, featured }) {
  return (
    <div
      id={`partner-${pkg.id}`}
      className={`jump-card reveal relative flex flex-col p-8 sm:p-10 lg:p-8 xl:p-10 transition-colors duration-500
                  lg:grid lg:grid-rows-subgrid lg:row-span-6 lg:gap-y-0
                  ${featured
                    ? 'bg-[var(--ground-2)] ring-1 ring-brand-yellow/35'
                    : 'bg-[var(--ground)] hover:bg-[var(--ground-2)]'}`}
    >
      {featured && <div className="absolute top-0 inset-x-0 h-[2px] bg-brand-yellow" />}

      <div className="flex min-h-[24px] items-center justify-between gap-3">
        <span className="font-sans text-[10px] uppercase track-mid text-white/55">{pkg.kicker}</span>
        {pkg.exclusive && (
          <span className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase track-mid
                           text-brand-yellow border border-brand-yellow/35 rounded-full px-2.5 py-1">
            <Crown size={11} strokeWidth={1.5} /> Exclusive
          </span>
        )}
      </div>

      <div className="mt-7">
        <h3 className="text-balance font-display text-[2rem] lg:text-[1.9rem] xl:text-[2.3rem] font-light leading-[1.05] text-white">
          {pkg.name}
        </h3>
        <p className="mt-3 text-balance font-display italic text-[17px] leading-snug text-brand-yellow">{pkg.line}</p>
      </div>

      <div className="mt-9 font-display text-[2.75rem] sm:text-5xl font-light text-white num leading-none">
        {eur(pkg.price)}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/10 py-3.5
                      font-sans text-[12px] text-white/65">
        <span className="inline-flex items-center gap-2">
          <Ticket size={14} className="text-brand-yellow" strokeWidth={1.5} />
          {pkg.passes} all-inclusive pass{pkg.passes === 1 ? '' : 'es'}
        </span>
        <span className="inline-flex items-center gap-2">
          <Users size={14} className="text-brand-yellow" strokeWidth={1.5} />
          {pkg.avail} available
        </span>
      </div>

      <ul className="mt-7 space-y-3 flex-1">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <Check size={14} className="mt-[3px] text-brand-yellow shrink-0" strokeWidth={2} />
            <span className="font-sans text-[13.5px] font-light leading-snug text-white/70">{d}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onAdd(pkg)}
        disabled={inCart >= pkg.avail}
        className={`mt-9 inline-flex items-center justify-center gap-2 w-full py-3.5 font-sans text-[12px]
                    uppercase track-mid transition
                    ${inCart >= pkg.avail
                      ? 'bg-white/[0.06] text-white/35 cursor-not-allowed'
                      : featured
                        ? 'bg-brand-yellow text-brand-dark hover:brightness-110'
                        : 'bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark'}`}
      >
        {inCart >= pkg.avail
          ? 'All allocated'
          : <>{inCart > 0 ? `Added · ${inCart}` : 'Add to package'} <Plus size={13} strokeWidth={2} /></>}
      </button>
    </div>
  )
}

function Partnerships({ dest, onAdd, counts }) {
  return (
    <Section id="partner" className="overflow-hidden">
      <Shell>
        <SectionHead
          n="06"
          eyebrow="Partnerships & tickets"
          title="Three ways in. Same shoreline."
          lede="Identical inventory across both retreats — buy Cyprus, Cancún, or both. Prices exclude VAT and every pass is all-inclusive."
          aside={
            <button
              onClick={() => exportRateCard(dest)}
              className="inline-flex items-center gap-2.5 border border-white/20 px-5 py-3
                         font-sans text-[11px] uppercase track-mid text-white/70
                         hover:border-brand-yellow/50 hover:text-brand-yellow transition"
            >
              <Download size={14} strokeWidth={1.5} /> Rate card · {dest.tag}
            </button>
          }
        />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-3 gap-px bg-white/10">
          {PACKAGES.map((p) => (
            <PackageCard
              key={p.id}
              pkg={p}
              onAdd={onAdd}
              inCart={counts[p.id] || 0}
              featured={p.id === 'headline'}
            />
          ))}
        </div>

        <p className="mt-8 font-sans text-[12px] font-light text-white/55 max-w-[72ch]">
          Twenty-four partner passes and twenty-one individual tickets. The remaining
          fifty-five seats — operators, affiliates, influencers and the advisory board
          — attend as guests of NEXT.io.
        </p>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   07 · Leisure
   ═══════════════════════════════════════════════════════════════════════════ */

function ActivityCard({ addon, dest, onAdd, count, locked, i }) {
  const local = dest.activities[addon.id]
  const Icon = addon.icon
  const imgs = local.imgs || []
  // Same shared-row idea as the package cards: five rows (photo, name, local
  // title, blurb, action) so a name that wraps never staggers the text below.
  return (
    <div
      className="reveal group relative flex flex-col bg-[var(--ground)] overflow-hidden
                 md:grid md:grid-rows-subgrid md:row-span-5 md:gap-y-0"
      style={{ transitionDelay: `${i * 110}ms` }}
    >
      <div className="relative h-52 sm:h-60 overflow-hidden">
        {imgs.length > 0 ? (
          <div className={`absolute inset-0 grid ${imgs.length > 1 ? 'grid-cols-2 gap-px' : ''}`}>
            {imgs.map((im) => (
              <img
                key={im.src}
                src={asset(im.src)}
                alt={im.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms]
                           ease-out group-hover:scale-[1.06]"
              />
            ))}
          </div>
        ) : (
          /* No photography for this slot yet — the brand device carries it */
          <div className="absolute inset-0 bg-[var(--ground-2)]">
            <Chevrons className="absolute inset-y-0 right-0 h-full w-[72%] text-brand-yellow/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ground)] via-transparent to-transparent" />
        {/* Price rides the photograph, so a long product name never fights it.
            Kicker and price share one row; on a narrow card the price drops
            beneath the kicker instead of covering it. */}
        <div className="absolute inset-x-4 top-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-ink/75 backdrop-blur-sm px-3 py-1.5">
            <Icon size={13} className="text-brand-yellow" strokeWidth={1.5} />
            <span className="font-sans text-[10px] uppercase track-mid text-white/80 whitespace-nowrap">{addon.kicker}</span>
          </div>
          <div className="ml-auto bg-ink/75 backdrop-blur-sm px-3 py-1
                          font-display text-2xl sm:text-[1.7rem] font-light leading-tight text-white num">
            {eur(addon.price)}
          </div>
        </div>
      </div>

      <h3 className="px-7 sm:px-8 pt-7 sm:pt-8 md:self-end text-balance font-display text-[1.6rem] sm:text-[1.85rem] font-light leading-tight text-white">
        {addon.name}
      </h3>
      <p className="px-7 sm:px-8 mt-3.5 text-balance font-display italic text-[16px] leading-snug text-brand-yellow">
        {local.title}
      </p>
      <p className="px-7 sm:px-8 mt-3.5 font-sans text-[13.5px] font-light leading-relaxed text-white/55 flex-1">
        {local.blurb}
      </p>
      <div className="px-7 sm:px-8 pt-7 pb-7 sm:pb-8">
        <button
          onClick={() => onAdd(addon)}
          disabled={locked || count >= addon.avail}
          className={`inline-flex items-center justify-center gap-2 w-full py-3.5 font-sans text-[12px]
                      uppercase track-mid transition
                      ${locked || count >= addon.avail
                        ? 'bg-white/[0.06] text-white/35 cursor-not-allowed'
                        : 'bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark'}`}
        >
          {locked
            ? <><Lock size={12} strokeWidth={1.75} /> Requires a partnership</>
            : count >= addon.avail
              ? 'All allocated'
              : <>{count > 0 ? `Added · ${count}` : 'Add to package'} <Plus size={13} strokeWidth={2} /></>}
        </button>
      </div>
    </div>
  )
}

function Leisure({ dest, onAdd, counts, locked }) {
  return (
    <Section id="leisure" className="overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ground-2)]/50 to-transparent" />
      <Shell className="relative">
        <SectionHead
          n="07"
          eyebrow={`Leisure activities · ${dest.place}`}
          wide
          title="Own the afternoon everyone remembers."
          lede="The content sessions are where the room learns. The leisure programme is where it relaxes enough to talk properly — and each slot is hosted by a single brand. There are five in total across the three days."
        />

        <div className="mt-14 sm:mt-20 grid md:grid-cols-3 gap-px bg-white/10">
          {ADDONS.map((a, i) => (
            <ActivityCard
              key={a.id}
              addon={a}
              dest={dest}
              onAdd={onAdd}
              count={counts[a.id] || 0}
              locked={locked}
              i={i}
            />
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 max-w-[70ch]">
          <Lock size={14} className="mt-0.5 text-brand-yellow shrink-0" strokeWidth={1.5} />
          <p className="font-sans text-[12.5px] font-light leading-relaxed text-white/50">
            {ADDON_CONDITION} They are an amplifier on a partnership, not a way in.
          </p>
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   08 · Build a package
   ═══════════════════════════════════════════════════════════════════════════ */

function Builder({ dest, cart, setCart }) {
  const total = cart.reduce((s, l) => s + l.price * l.qty, 0)
  const passes = cart.reduce((s, l) => s + (l.passes || 0) * l.qty, 0)
  const bump = (id, delta) =>
    setCart((c) => c.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0))

  return (
    <Section id="build" className="overflow-hidden">
      {/* Faded at both edges so the backdrop dissolves into the page's sea
          atmosphere instead of cutting a hard line across the page. */}
      <div className="absolute inset-0 edge-fade-y">
        <img
          src={asset(dest.resortShots[dest.resortShots.length - 1].src)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ground)] via-[var(--ground)]/80 to-[var(--ground)]" />
        <div className="caustics opacity-40" />
      </div>

      <Shell className="relative max-w-[1100px]">
        <SectionHead
          n="08"
          eyebrow="Build a package"
          title="Put it together, then send it."
          lede="Add inventory above and it lands here. Export it as a proposal or send it straight to the partnerships team."
        />

        <div className="reveal mt-14 border border-white/12 bg-ink/60 backdrop-blur-xl">
          <div className="px-5 sm:px-9 py-5 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="font-sans text-[11px] uppercase track-mid text-white/55">
              Retreat {dest.tag} 2027 · <span className="whitespace-nowrap num">{dest.datesTight}</span>
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="-my-3 -mr-3 inline-flex h-10 items-center px-3 font-sans text-[11px] uppercase track-mid
                           text-white/55 hover:text-white/85 transition"
              >
                Clear
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="px-5 sm:px-9 py-16 text-center">
              <Anchor size={26} className="mx-auto text-white/20 mb-5" strokeWidth={1.25} />
              <p className="font-display text-2xl font-light text-white/50">Nothing selected yet.</p>
              <p className="mt-3 font-sans text-[13px] font-light text-white/55">
                Start with a partnership, then add the leisure slots you want to own.
              </p>
              <a
                href="#partner"
                className="mt-8 inline-flex items-center gap-2 border border-white/20 px-5 py-3
                           font-sans text-[11px] uppercase track-mid text-white/70
                           hover:border-brand-yellow/50 hover:text-brand-yellow transition"
              >
                See partnerships <ArrowRight size={13} strokeWidth={1.75} />
              </a>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-white/[0.08]">
                {cart.map((l) => (
                  /* A phone gives the name its own line, then quantity, price
                     and remove underneath; from sm it is one row again (the
                     price/remove pair dissolves into it via sm:contents).
                     Every control is a 40px target. */
                  <li
                    key={l.id}
                    className="px-5 sm:px-9 py-4 sm:py-5 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5
                               sm:flex sm:gap-5"
                  >
                    <div className="col-span-2 min-w-0 sm:flex-1">
                      <div className="font-sans text-[15px] text-white truncate">{l.name}</div>
                      <div className="mt-1 font-sans text-[11px] uppercase track-mid text-white/55">
                        {l.group}
                        {l.passes ? ` · ${l.passes * l.qty} pass${l.passes * l.qty === 1 ? '' : 'es'}` : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => bump(l.id, -1)}
                        className="grid place-items-center h-10 w-10 border border-white/15 text-white/65
                                   hover:border-brand-yellow/50 hover:text-brand-yellow transition"
                        aria-label={`Remove one ${l.name}`}
                      >
                        <Minus size={13} strokeWidth={2} />
                      </button>
                      <span className="w-8 text-center font-sans text-[14px] text-white num">{l.qty}</span>
                      <button
                        onClick={() => bump(l.id, 1)}
                        disabled={l.qty >= l.avail}
                        className="grid place-items-center h-10 w-10 border border-white/15 text-white/65
                                   hover:border-brand-yellow/50 hover:text-brand-yellow
                                   disabled:opacity-30 disabled:cursor-not-allowed transition"
                        aria-label={`Add one ${l.name}`}
                      >
                        <Plus size={13} strokeWidth={2} />
                      </button>
                    </div>
                    <div className="flex items-center justify-end gap-1 sm:contents">
                      <div className="text-right font-display text-xl font-light text-white num shrink-0 sm:w-28">
                        {eur(l.price * l.qty)}
                      </div>
                      <button
                        onClick={() => setCart((c) => c.filter((x) => x.id !== l.id))}
                        className="-mr-3 grid h-10 w-10 shrink-0 place-items-center text-white/45 hover:text-white/85 transition"
                        aria-label={`Remove ${l.name}`}
                      >
                        <X size={15} strokeWidth={1.75} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-5 sm:px-9 py-7 border-t border-white/12 bg-[var(--ground-2)]/60">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="font-sans text-[11px] uppercase track-mid text-white/55">
                      Total investment · excl. VAT
                    </div>
                    <div className="mt-2 font-display text-5xl sm:text-6xl font-light text-brand-yellow num leading-none">
                      {eur(total)}
                    </div>
                    {passes > 0 && (
                      <div className="mt-3 font-sans text-[12.5px] font-light text-white/55">
                        {passes} all-inclusive delegate pass{passes === 1 ? '' : 'es'} in a room of 100
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => exportProposal(dest, cart)}
                      className="inline-flex items-center gap-2.5 border border-white/25 px-5 py-3.5
                                 font-sans text-[11px] uppercase track-mid text-white
                                 hover:border-brand-yellow hover:text-brand-yellow transition"
                    >
                      <Download size={14} strokeWidth={1.5} /> Export proposal
                    </button>
                    <a
                      href={buildMailto(dest, cart)}
                      className="inline-flex items-center gap-2.5 bg-brand-yellow px-5 py-3.5
                                 font-sans text-[11px] uppercase track-mid text-brand-dark font-medium
                                 hover:brightness-110 transition"
                    >
                      <Mail size={14} strokeWidth={1.75} /> Send to partnerships
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   09 · Previous partners
   ═══════════════════════════════════════════════════════════════════════════ */

function Partners2026() {
  // Three across at every width: nine partners make a full 3 × 3 with no
  // orphan tile. Fillers only appear if the list stops being a multiple of 3.
  const fillers = (3 - (PARTNERS_2026.length % 3)) % 3
  return (
    <Section id="partners" className="overflow-hidden">
      <Shell>
        <SectionHead
          n="09"
          eyebrow="Previous partners"
          title="The brands that backed the 2026 retreats."
          lede="Headline and general partners across Cyprus and Cancún."
        />
        <div className="reveal mt-14 grid grid-cols-3 gap-px bg-white/[0.08]">
          {PARTNERS_2026.map(([file, name], i) => (
            <div
              key={file}
              className="bg-[var(--ground)] h-24 sm:h-32 lg:h-36 grid place-items-center px-3 sm:px-8
                         [--logo-k:40px] sm:[--logo-k:58px] lg:[--logo-k:66px]
                         hover:bg-[var(--ground-2)] transition-colors duration-500"
              style={{ transitionDelay: `${i * 50}ms` }}
              title={name}
            >
              <WallLogo
                src={asset(`logos/partners/${file}.png`)}
                alt={name}
                className="max-h-9 sm:max-h-12 lg:max-h-14 max-w-full opacity-85 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {Array.from({ length: fillers }).map((_, i) => (
            <div key={`fill-${i}`} className="bg-[var(--ground)]" aria-hidden="true" />
          ))}
        </div>
      </Shell>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Both retreats + close
   ═══════════════════════════════════════════════════════════════════════════ */

function BothRetreats({ destId, setDestId }) {
  return (
    <Section className="overflow-hidden !pt-0">
      <SeaWaves className="relative mb-16 sm:mb-24" />
      <Shell>
        <SectionHead
          eyebrow="Two retreats, 2027"
          title="Do one. Or do the year."
          lede="One product set, two rooms, five weeks apart. Partners who take both get the same brand in front of Europe and LatAm inside a single financial year."
        />

        <div className="mt-14 sm:mt-20 grid md:grid-cols-2 gap-px bg-white/10">
          {Object.values(DESTINATIONS).map((d, i) => {
            const active = d.id === destId
            return (
              <button
                key={d.id}
                onClick={() => {
                  setDestId(d.id)
                  document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`reveal group relative text-left overflow-hidden min-h-[26rem] sm:min-h-[32rem] ${d.theme}`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <img
                  src={asset(d.resortShots[0].src)}
                  alt={d.resortShots[0].alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover
                             transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
                <div className="caustics opacity-40" />
                <div className="relative h-full p-8 sm:p-11 flex flex-col justify-end">
                  <div className="font-sans text-[11px] uppercase track-wide text-brand-yellow">
                    Retreat {d.tag} · {d.edition}
                  </div>
                  <h3 className="mt-4 font-display text-[2.4rem] sm:text-[3.2rem] font-light leading-[0.98] text-white">
                    {d.place}
                  </h3>
                  <p className="mt-3 font-display italic text-xl text-white/70">{d.dates}</p>
                  <p className="mt-5 font-sans text-[13.5px] font-light leading-relaxed text-white/60 max-w-[40ch]">
                    {d.lede}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 font-sans text-[11px] uppercase track-mid
                                  text-white/80 group-hover:text-brand-yellow transition-colors">
                    {active ? 'Currently viewing' : 'View this retreat'}
                    <ArrowUpRight size={14} strokeWidth={1.75} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </Shell>
    </Section>
  )
}

function Close({ dest }) {
  const { d } = useCountdown(dest.id === 'europe' ? '2027-10-11T09:00:00Z' : '2027-11-15T09:00:00Z')
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]">
        <img src={asset(dest.hero)} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ground)] via-ink/90 to-ink" />
        <div className="caustics" />
      </div>
      {/* Only where the margin is wide enough to hold it clear of the headline */}
      <Chevrons className="absolute left-0 top-1/2 -translate-y-1/2 h-[44vh] w-[11vw] rotate-180 text-brand-yellow/[0.10] hidden 2xl:block" />

      <Shell className="relative py-28 sm:py-44 text-center">
        <div className="reveal">
          <Eyebrow className="mb-8">
            {dest.venue} · <span className="whitespace-nowrap num">{dest.dates}</span>
          </Eyebrow>
          <h2 className="font-display font-light text-white leading-[0.98] tracking-[-0.015em]
                         text-[2.7rem] sm:text-[4.4rem] lg:text-[5.6rem] max-w-[24ch] mx-auto">
            There are only
            <span className="italic text-brand-yellow"> a hundred seats</span>,
            and fifty of them are already spoken for.
          </h2>
          <p className="mt-8 font-sans text-[15px] sm:text-lg font-light leading-relaxed text-white/60 max-w-[52ch] mx-auto">
            One headline partnership. Ten general partnerships. Twenty-one individual
            tickets. Five leisure slots. {d > 0 ? `${d.toLocaleString('en-US')} days out.` : ''}
          </p>
          <div className="mt-12 mx-auto flex max-w-xs flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            {/* An address is set as written: uppercase would print the brand
                as "NEXT.IO". The yellow button carries a border of its own
                colour so it matches the outlined one beside it exactly. */}
            <a
              href="mailto:sales@next.io?subject=NEXT.io%20Retreats%202027%20%E2%80%94%20partnership%20enquiry"
              className="inline-flex items-center justify-center gap-2.5 border border-brand-yellow bg-brand-yellow px-7 py-4
                         font-sans text-[14px] leading-[18px] tracking-[0.04em] text-brand-dark font-medium hover:brightness-110 transition"
            >
              <Mail size={15} strokeWidth={1.75} /> sales@next.io
            </a>
            <a
              href="#build"
              className="inline-flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 font-sans text-[12px]
                         uppercase track-mid text-white hover:border-brand-yellow hover:text-brand-yellow transition"
            >
              Build a package <ArrowRight size={14} strokeWidth={1.75} />
            </a>
          </div>
          <p className="mt-10 font-sans text-[12px] font-light text-white/55">
            Partnerships · William Purchase, Sales Director
          </p>
        </div>
      </Shell>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <Shell className="py-14">
        <div className="flex flex-wrap gap-10 justify-between">
          <div>
            <Lockup className="h-10" />
            {/* The two editions as two dated entries, not one run-on line each */}
            <dl className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-12 font-sans text-[12.5px] font-light leading-relaxed">
              {[
                ['Retreat Europe', 'Cap St Georges Hotel & Resort, Cyprus', '11–13 October 2027'],
                ['Retreat LatAm', 'Secrets Maroma Beach Riviera Cancun, Mexico', '15–17 November 2027'],
              ].map(([name, venue, dates]) => (
                <div key={name} className="max-w-[44ch]">
                  <dt className="text-[10px] uppercase track-mid text-brand-yellow/80">{name}</dt>
                  <dd className="mt-2 text-white/75 num">{dates}</dd>
                  <dd className="text-white/55">{venue}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="-mt-2.5 flex flex-col items-start font-sans text-[12.5px] font-light text-white/60">
            <a href="mailto:sales@next.io" className="inline-flex min-h-10 items-center hover:text-brand-yellow transition">
              sales@next.io
            </a>
            <a href="https://next.io" target="_blank" rel="noreferrer" className="inline-flex min-h-10 min-w-10 items-center hover:text-brand-yellow transition">
              next.io
            </a>
          </div>
        </div>
        <Rule className="my-10 opacity-40" />
        <p className="font-sans text-[11px] font-light leading-relaxed text-white/50 max-w-[80ch]">
          All prices exclude VAT. Availability is live and subject to change without
          notice. Leisure activities are sold only alongside a Headline or General
          Partnership. Attendee and partner marks are the property of their respective
          owners and are shown to indicate participation in previous editions.
        </p>
      </Shell>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   App
   ═══════════════════════════════════════════════════════════════════════════ */

/* Deep links. ?retreat=latam opens the page on that retreat (Europe is the
   default and needs no parameter); a #hash then lands on a section or card,
   e.g. ?retreat=latam#partner or #partner-general. */
const readDest = () => {
  try {
    const q = new URLSearchParams(window.location.search).get('retreat')
    return q && DESTINATIONS[q] ? q : 'europe'
  } catch {
    return 'europe'
  }
}

export default function App() {
  const [destId, setDestId] = useState(readDest)
  const [cart, setCart] = useState([])
  const dest = DESTINATIONS[destId]

  useReveal()

  // The address always names the retreat on screen, so a copied link opens
  // the same one.
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      if (destId === 'europe') url.searchParams.delete('retreat')
      else url.searchParams.set('retreat', destId)
      if (url.href !== window.location.href) window.history.replaceState(null, '', url)
    } catch { /* an address we cannot rewrite is left as it is */ }
  }, [destId])

  // The browser tries its own fragment scroll before React has rendered the
  // target, so a deep link used to open at the top. Land it once the type has
  // settled; the target's scroll-margin keeps it clear of the header.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    let live = true
    const land = () => {
      const el = document.getElementById(id)
      if (live && el) el.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
    ;(document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(land))
    return () => { live = false }
  }, [])

  // Switching destination resets the package — inventory is per retreat.
  const changeDest = useCallback((id) => {
    setDestId((prev) => {
      if (prev !== id) setCart([])
      return id
    })
  }, [])

  const counts = useMemo(
    () => cart.reduce((acc, l) => ({ ...acc, [l.id]: l.qty }), {}),
    [cart],
  )
  const hasPartnership = cart.some((l) => l.id === 'headline' || l.id === 'general')

  const add = useCallback((item) => {
    const group = PACKAGES.some((p) => p.id === item.id) ? 'Partnership & tickets' : 'Leisure activity'
    setCart((c) => {
      const found = c.find((l) => l.id === item.id)
      if (found) {
        if (found.qty >= item.avail) return c
        return c.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
      }
      return [...c, {
        id: item.id, name: item.name, price: item.price,
        passes: item.passes || 0, avail: item.avail, group, qty: 1,
      }]
    })
  }, [])

  const cartCount = cart.reduce((s, l) => s + l.qty, 0)

  return (
    <div className={`${dest.theme} relative min-h-screen bg-[var(--ground)]`}>
      {/* The sea, everywhere — slow, faint, behind every section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="atmosphere" />
      </div>
      <Nav destId={destId} setDestId={changeDest} cartCount={cartCount} />
      <main className="relative">
        <Hero dest={dest} destId={destId} setDestId={changeDest} />
        <Verdict dest={dest} />
        <Why dest={dest} />
        <TheRoom dest={dest} />
        <WhoIsIn dest={dest} />
        <ThreeDays dest={dest} />
        <Partnerships dest={dest} onAdd={add} counts={counts} />
        <Leisure dest={dest} onAdd={add} counts={counts} locked={!hasPartnership} />
        <Builder dest={dest} cart={cart} setCart={setCart} />
        <Partners2026 />
        <BothRetreats destId={destId} setDestId={changeDest} />
        <Close dest={dest} />
      </main>
      <Footer />
    </div>
  )
}
