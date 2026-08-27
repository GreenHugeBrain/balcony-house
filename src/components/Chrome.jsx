import { useEffect, useState } from 'react'

import { HOUSE } from '../data.js'
import { NAV } from './Nav.js'
import { href, isCurrent } from '../lib/paths.js'

/** Wraps every page so the header, footer and skip link exist in one place. */
export function Page({ children, transparentHeader = false }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header transparent={transparentHeader} />
      {/* Only the hero page sits under the fixed header; the rest clear it. */}
      <main id="main" className={transparentHeader ? undefined : 'below-header'}>
        {children}
      </main>
      <Footer />
    </>
  )
}

function Header({ transparent }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!transparent) return undefined
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const solid = !transparent || scrolled

  return (
    <header className={solid ? 'site-header is-solid' : 'site-header'}>
      <div className="shell header-inner">
        <a className="wordmark" href={href('')}>
          <span>The Balcony House</span>
          <em>Sololaki · Tbilisi</em>
        </a>

        <nav className={open ? 'nav is-open' : 'nav'} aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.path}
              href={href(item.path)}
              aria-current={isCurrent(item.path) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-solid" href={href('book')}>Check dates</a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="foot-mark">The Balcony House</p>
          <p>{HOUSE.street}, {HOUSE.district}, {HOUSE.city}</p>
          <p>
            <a href={`tel:${HOUSE.phone.replace(/\s/g, '')}`}>{HOUSE.phone}</a>
            {' · '}
            <a href={`mailto:${HOUSE.email}`}>{HOUSE.email}</a>
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {NAV.map((item) => (
            <a key={item.path} href={href(item.path)}>{item.label}</a>
          ))}
        </nav>
      </div>

      <div className="shell">
        <p className="fine">
          A concept site, built as a demonstration. The Balcony House is not a real
          guesthouse. Some photographs from Wikimedia Commons — see CREDITS.md.
        </p>
      </div>
    </footer>
  )
}

export function PageHead({ eyebrow, title, note }) {
  return (
    <section className="page-head">
      <div className="shell">
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        {note && <p className="page-note">{note}</p>}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, note }) {
  return (
    <div className="section-head">
      <p className="kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}
