// ─── Present mode (26 Sep 2026) ─────────────────────────────────────────────
// Adapted from the house reference component so it behaves exactly like every
// other NEXT.io brochure; only the look is this brochure's own: charcoal and
// yellow, Jost, uppercase tracked labels, and the destination's --sea as
// atmosphere (never as type, a border or a data bar). This file holds no
// content. The slides are composed in App.jsx from the page's own arrays, so a
// new package or leisure slot appears in the deck automatically.
//
// Open:   ?present             -> the first slide
//         ?present=<slide id>  -> that slide (a product slide's id is its card
//                                 id, partner-<id> or leisure-<id>, so card
//                                 links and slides agree)
// Keys:   → Space PageDown = next · ← PageUp = back · Home End · G = all
//         slides · Esc = close (closes the slide list first when it is open)
// Touch:  swipe left or right; the slide itself scrolls vertically.

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, LayoutGrid, Link2, Check } from 'lucide-react'

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The URL carries the open slide, so the address bar can be copied and sent
// as it is. replaceState only: opening and moving through the deck are not
// navigations, and Back should not step through slides.
export function readPresentParam() {
  try {
    const p = new URLSearchParams(window.location.search)
    return p.has('present') ? (p.get('present') || '') : null
  } catch { return null }
}
export function writePresentParam(id) {
  try {
    const url = new URL(window.location.href)
    if (id === null) url.searchParams.delete('present')
    else url.searchParams.set('present', id)
    window.history.replaceState(window.history.state, '', url)
  } catch { /* no URL access: the deck still works */ }
}

// App-side state: `present` is null (closed), '' (first slide) or a slide id.
export function usePresent() {
  const [present, setPresent] = useState(readPresentParam)
  const open = useCallback((id = '') => { writePresentParam(id); setPresent(id) }, [])
  const close = useCallback(() => { writePresentParam(null); setPresent(null) }, [])
  return { present, open, close }
}

// ─── Copy link ──────────────────────────────────────────────────────────────
// The link to send: this page, its retreat (?retreat=latam), and the card's
// anchor. Never the present parameter, never a plan that was already restored.
export function linkTo(id) {
  const url = new URL(window.location.href)
  url.searchParams.delete('present')
  url.searchParams.delete('plan')
  url.hash = id
  return url.href
}
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch { /* fall back below */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-1000px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch { return false }
}
// Quiet by design: the caller passes the look (a card's action row, a slide).
// `link` builds a different address (the package link); the default is the
// card link for `id`.
export function CopyLinkButton({ id, link, label = 'Copy link', title = 'Copy a link to this product', className = '' }) {
  const [state, setState] = useState(null) // null | 'ok' | 'fail'
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const onClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const ok = await copyText(link ? link() : linkTo(id))
    setState(ok ? 'ok' : 'fail')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState(null), 1800)
  }
  return (
    <button type="button" onClick={onClick} title={title}
      className={`inline-flex items-center gap-2 transition-colors ${className}`}>
      {state === 'ok'
        ? <Check size={13} strokeWidth={1.75} className="shrink-0 text-brand-yellow" aria-hidden />
        : <Link2 size={13} strokeWidth={1.5} className="shrink-0" aria-hidden />}
      <span aria-live="polite">{state === 'ok' ? 'Link copied' : state === 'fail' ? 'Copy failed' : label}</span>
    </button>
  )
}

// ─── The deck ───────────────────────────────────────────────────────────────
// slides: [{ id, label, group, ...anything renderSlide needs }]
//   id     unique; product slides use the card id
//   label  short title, shown on the Next button and in the slide list
//   group  heading the slide sits under in the slide list and the footer
// renderSlide(slide, { go, goId, close, index }) returns the slide body.
// renderBackdrop(slide) may return a full-bleed layer behind the slide (the
// cover's photograph); it stays still while a long slide scrolls over it.
// theme is the destination class, so --sea and --ground reach the portal.
// logo may be a function of the slide (the cover carries its own lockup, so
// the bar leaves its one out there); shortTitle replaces title on a phone.
export function PresentMode({ slides, startId, onClose, renderSlide, renderBackdrop, title, shortTitle, logo = null, theme = '' }) {
  const [i, setI] = useState(() => {
    const at = slides.findIndex((s) => s.id === startId)
    return at >= 0 ? at : 0
  })
  const [listOpen, setListOpen] = useState(false)
  const [dir, setDir] = useState(0)
  const boxRef = useRef(null)
  const bodyRef = useRef(null)
  const touch = useRef(null)
  const last = slides.length - 1
  const slide = slides[Math.min(i, last)]

  const go = useCallback((n) => {
    setI((cur) => {
      const next = Math.max(0, Math.min(last, typeof n === 'function' ? n(cur) : n))
      setDir(next > cur ? 1 : next < cur ? -1 : 0)
      return next
    })
    setListOpen(false)
  }, [last])
  const goId = useCallback((id) => {
    const at = slides.findIndex((s) => s.id === id)
    if (at >= 0) go(at)
  }, [slides, go])

  // the page behind stays still and out of the tab order; focus returns to
  // whatever opened the deck (captured first, before any other effect can
  // move focus)
  useEffect(() => {
    const root = document.getElementById('root')
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    const opener = document.activeElement
    html.style.overflow = 'hidden'
    if (root) root.setAttribute('inert', '')
    boxRef.current?.focus()
    return () => {
      html.style.overflow = prevOverflow
      if (root) root.removeAttribute('inert')
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
  }, [])

  // the address bar follows the slide
  const slideId = slide ? slide.id : null
  useEffect(() => { if (slideId !== null) writePresentParam(slideId) }, [slideId])
  // a new slide starts at its top; when the button that had focus went with
  // the old slide, focus comes back to the deck instead of the page body
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    const active = document.activeElement
    if (boxRef.current && (!active || active === document.body)) boxRef.current.focus({ preventScroll: true })
  }, [i])

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target && e.target.tagName) || ''
      const typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable)
      if (e.key === 'Escape') { e.preventDefault(); if (listOpen) setListOpen(false); else onClose(); return }
      if (typing) return
      // Space on a focused button presses it; only an unfocused Space turns the page
      const onControl = tag === 'BUTTON' || tag === 'A'
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !onControl)) { e.preventDefault(); go((c) => c + 1) }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go((c) => c - 1) }
      else if (e.key === 'Home') { e.preventDefault(); go(0) }
      else if (e.key === 'End') { e.preventDefault(); go(last) }
      else if (e.key === 'g' || e.key === 'G') { e.preventDefault(); setListOpen((v) => !v) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, last, listOpen, onClose])

  // Back or Forward to an address without ?present closes the deck
  useEffect(() => {
    const onPop = () => { if (readPresentParam() === null) onClose() }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [onClose])


  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY } }
  const onTouchEnd = (e) => {
    const s = touch.current
    touch.current = null
    if (!s) return
    const t = e.changedTouches[0]
    const dx = t.clientX - s.x
    const dy = t.clientY - s.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go((c) => c + (dx < 0 ? 1 : -1))
  }

  if (!slide) return null
  const next = slides[i + 1]
  const backdrop = renderBackdrop ? renderBackdrop(slide) : null
  const groups = slides.reduce((acc, s, n) => {
    const g = acc[acc.length - 1]
    if (g && g.group === s.group) g.items.push([s, n])
    else acc.push({ group: s.group, items: [[s, n]] })
    return acc
  }, [])

  return createPortal(
    <div ref={boxRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${title}, presentation`}
      data-present
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      className={`${theme} fixed inset-0 z-[300] flex flex-col bg-[var(--ground)] text-white outline-none`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {/* the water, faint, behind every slide */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="caustics opacity-45" />
      </div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      {/* top bar: what this is, where you are, the way out */}
      <header className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-ink/55 backdrop-blur-md px-4 sm:px-8 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          {typeof logo === 'function' ? logo(slide) : logo}
          <span className={`${shortTitle ? 'hidden sm:block' : ''} truncate font-sans text-[10.5px] sm:text-[11px] uppercase track-mid text-white/70`}>{title}</span>
          {shortTitle && <span className="truncate font-sans text-[10.5px] uppercase track-mid text-white/70 sm:hidden">{shortTitle}</span>}
        </div>
        <button type="button" onClick={() => setListOpen((v) => !v)} aria-expanded={listOpen}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/15 px-3.5 sm:px-4 font-sans text-[12px] text-white/80 num
                     hover:border-brand-yellow/60 hover:text-brand-yellow transition-colors">
          <LayoutGrid size={15} strokeWidth={1.5} aria-hidden />{i + 1} / {slides.length}
          <span className="sr-only">, show all slides</span>
        </button>
        <button type="button" onClick={onClose} aria-label="Close the presentation"
          className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-white/75
                     hover:bg-white/10 hover:text-white transition-colors">
          <X size={18} strokeWidth={1.6} aria-hidden /><span className="hidden md:inline font-sans text-[10.5px] uppercase track-mid text-white/45">Esc</span>
        </button>
      </header>

      {/* the slide, over its backdrop when it has one */}
      <div className="relative z-10 min-h-0 flex-1">
        {backdrop && <div key={slide.id} aria-hidden className="absolute inset-0 overflow-hidden">{backdrop}</div>}
        <main ref={bodyRef} className="relative h-full overflow-y-auto overflow-x-hidden overscroll-contain">
          <div key={slide.id}
            className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-5 sm:px-10 py-8 sm:py-10"
            style={reducedMotion() ? undefined : { animation: `pm-in-${dir < 0 ? 'back' : 'fwd'} .28s ease-out both` }}>
            {renderSlide(slide, { go, goId, close: onClose, index: i })}
          </div>
        </main>
      </div>

      {/* bottom bar: back, how far along, next */}
      <footer className="relative z-10 border-t border-white/10 bg-ink/55 backdrop-blur-md">
        <div className="h-0.5 bg-white/10" aria-hidden>
          <div className="h-full bg-brand-yellow transition-[width] duration-300" style={{ width: `${((i + 1) / slides.length) * 100}%` }} />
        </div>
        <div className="flex items-center gap-3 px-4 sm:px-8 py-2.5">
          <button type="button" onClick={() => go((c) => c - 1)} disabled={i === 0} aria-label="Previous slide"
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/15 px-3 sm:px-4
                       font-sans text-[11px] uppercase track-mid text-white/80 disabled:opacity-30 hover:border-brand-yellow/60 hover:text-brand-yellow transition-colors">
            <ChevronLeft size={17} strokeWidth={1.6} aria-hidden /><span className="hidden sm:inline">Back</span>
          </button>
          <p className="min-w-0 flex-1 truncate text-center font-sans text-[10.5px] uppercase track-mid text-white/50">{slide.group}</p>
          <button type="button" onClick={() => go((c) => c + 1)} disabled={!next}
            className="inline-flex h-11 max-w-[64%] shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-yellow px-4 sm:px-5
                       font-sans text-[11px] uppercase track-mid font-medium text-brand-dark disabled:opacity-30 hover:brightness-110 transition">
            <span className="truncate">{next ? <><span className="hidden md:inline text-brand-dark/60">Next: </span>{next.label}</> : 'End'}</span>
            <ChevronRight size={17} strokeWidth={1.75} className="shrink-0" aria-hidden />
          </button>
        </div>
      </footer>

      {/* every slide, grouped: jump straight to whatever the buyer asks about */}
      {listOpen && (
        <div className="absolute inset-0 z-20 flex flex-col bg-ink/[0.97] backdrop-blur-md" role="dialog" aria-label="All slides">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-8 py-2.5">
            <p className="font-sans text-[11px] uppercase track-wide text-white/80">All slides</p>
            <button type="button" onClick={() => setListOpen(false)} aria-label="Close the slide list"
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-full text-white/75 hover:bg-white/10 hover:text-white transition-colors">
              <X size={18} strokeWidth={1.6} aria-hidden />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
            <div className="mx-auto max-w-6xl sm:columns-2 lg:columns-3 gap-10">
              {groups.map((g, gi) => (
                <div key={`${g.group}-${gi}`} className="mb-7 break-inside-avoid">
                  <p className="mb-2 px-2 font-sans text-[10.5px] uppercase track-wide text-brand-yellow">{g.group}</p>
                  <ul>
                    {g.items.map(([s, n]) => (
                      <li key={s.id}>
                        <button type="button" onClick={() => go(n)} aria-current={n === i ? 'step' : undefined}
                          className={`flex min-h-11 w-full items-center gap-3 px-2 py-1.5 text-left font-sans text-[14px] transition-colors
                                      ${n === i ? 'bg-brand-yellow text-brand-dark font-medium' : 'font-light text-white/85 hover:bg-white/[0.06]'}`}>
                          <span className={`w-7 shrink-0 text-right text-[12px] num ${n === i ? 'text-brand-dark/65' : 'text-white/40'}`}>{n + 1}</span>
                          <span className="min-w-0">{s.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}
