import { useEffect, useMemo, useState } from 'react'
import './styles.css'

import { HOUSE, ROOMS, SPACES, GALLERY, NEARBY, FAQ } from './data.js'
import hero from './assets/hero.jpg'
import roofs from './assets/roofs.jpg'

const NAV = [
  ['Rooms', 'rooms'],
  ['The house', 'house'],
  ['Gallery', 'gallery'],
  ['Find us', 'find'],
]

export default function App() {
  const [enquiryRoom, setEnquiryRoom] = useState(ROOMS[0].id)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Rooms onEnquire={setEnquiryRoom} />
        <Spaces />
        <Booking room={enquiryRoom} setRoom={setEnquiryRoom} />
        <Gallery />
        <Find />
      </main>
      <Footer />
    </>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="shell header-inner">
        <a className="wordmark" href="#top">
          <span>The Balcony House</span>
          <em>Sololaki · Tbilisi</em>
        </a>
        <nav className={open ? 'nav is-open' : 'nav'}>
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="btn btn-solid" href="#book">Check dates</a>
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

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-img" src={hero} alt="" />
      <div className="hero-veil" />
      <div className="shell hero-inner">
        <p className="kicker">Nine rooms · Old Tbilisi</p>
        <h1>A house with a<br /><em>balcony</em>, and time<br />to sit on it.</h1>
        <p className="hero-lede">
          A restored nineteenth-century house on Amaghleba Street, five minutes
          from Gudiashvili Square. Book direct — there is no commission on top,
          and a person answers the phone.
        </p>
        <div className="hero-cta">
          <a className="btn btn-solid btn-lg" href="#book">Check dates</a>
          <a className="btn btn-ghost btn-lg" href="#rooms">See the rooms</a>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="section intro">
      <div className="shell intro-grid">
        <p className="lede">
          The house was built in 1884 and spent most of the last century divided
          into flats. We spent two years putting it back together — the balcony
          carvings, the tiled stove in the hall, the courtyard that had become a
          car park.
        </p>
        <div className="intro-facts">
          <div><dt>Rooms</dt><dd>Nine</dd></div>
          <div><dt>From</dt><dd>130<Lari /></dd></div>
          <div><dt>Breakfast</dt><dd>Included</dd></div>
          <div><dt>Check-in</dt><dd>{HOUSE.checkIn}</dd></div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- rooms */

function Rooms({ onEnquire }) {
  const [open, setOpen] = useState(null)

  return (
    <section className="section section-cream" id="rooms">
      <div className="shell">
        <SectionHead
          eyebrow="Rooms"
          title="Four kinds of room, nine in total"
          note="Rates are per night for the room, not per person, and include breakfast and taxes. Longer stays are quoted lower — ask."
        />
        <div className="room-list">
          {ROOMS.map((r) => (
            <article key={r.id} className={open === r.id ? 'room is-open' : 'room'}>
              <button
                className="room-head"
                type="button"
                onClick={() => setOpen(open === r.id ? null : r.id)}
                aria-expanded={open === r.id}
              >
                <span className="room-title">
                  <h3>{r.name}</h3>
                  <span className="room-aspect">{r.aspect}</span>
                </span>
                <span className="room-numbers">
                  <b>{r.rate}<Lari /></b>
                  <i>per night</i>
                </span>
                <span className="room-toggle" aria-hidden="true">{open === r.id ? '−' : '+'}</span>
              </button>

              {open === r.id && (
                <div className="room-detail">
                  <p>{r.blurb}</p>
                  <dl className="room-specs">
                    <div><dt>Sleeps</dt><dd>{r.sleeps}</dd></div>
                    <div><dt>Size</dt><dd>{r.size}</dd></div>
                    <div><dt>Bed</dt><dd>{r.bed}</dd></div>
                  </dl>
                  <ul className="features">
                    {r.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <a
                    className="btn btn-ghost"
                    href="#book"
                    onClick={() => onEnquire(r.id)}
                  >
                    Check this room
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Spaces() {
  return (
    <section className="section" id="house">
      <div className="shell">
        <SectionHead eyebrow="The house" title="The rooms you do not sleep in" />
        <div className="spaces">
          {SPACES.map((s) => (
            <article key={s.title}>
              <img src={s.photo} alt={s.title} loading="lazy" />
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- booking */

function isoToday(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

function nightsBetween(a, b) {
  if (!a || !b) return 0
  const ms = new Date(b) - new Date(a)
  return ms > 0 ? Math.round(ms / 86400000) : 0
}

function prettyDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function Booking({ room, setRoom }) {
  const [arrive, setArrive] = useState(isoToday(14))
  const [depart, setDepart] = useState(isoToday(17))
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  const chosen = useMemo(() => ROOMS.find((r) => r.id === room) ?? ROOMS[0], [room])
  const nights = nightsBetween(arrive, depart)
  const total = nights * chosen.rate
  const overCapacity = guests > chosen.sleeps

  function submit(e) {
    e.preventDefault()
    const next = {}
    if (nights < 1) next.dates = 'Departure has to be after arrival.'
    if (overCapacity) next.guests = `${chosen.name} sleeps ${chosen.sleeps}.`
    if (name.trim().length < 2) next.name = 'Your name, please.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = 'A working email.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSent({ name, email, room: chosen, arrive, depart, nights, total, guests })
  }

  if (sent) {
    return (
      <section className="section section-dark" id="book">
        <div className="shell">
          <div className="sent">
            <p className="kicker">Enquiry received</p>
            <h2>We will write back today, {sent.name.split(' ')[0]}.</h2>
            <dl className="sent-list">
              <div><dt>Room</dt><dd>{sent.room.name}</dd></div>
              <div><dt>Dates</dt><dd>{prettyDate(sent.arrive)} — {prettyDate(sent.depart)}</dd></div>
              <div><dt>Nights</dt><dd>{sent.nights}</dd></div>
              <div><dt>Guests</dt><dd>{sent.guests}</dd></div>
              <div><dt>Estimate</dt><dd>{sent.total}<Lari /> including breakfast</dd></div>
            </dl>
            <p className="sent-note">
              Nothing was actually sent and no room is held — this is a demonstration
              build. On a live site the house would have this in its inbox now.
            </p>
            <button className="btn btn-ghost" type="button" onClick={() => setSent(null)}>
              Change the dates
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section section-dark" id="book">
      <div className="shell book-grid">
        <div>
          <SectionHead
            eyebrow="Book direct"
            title="Check the dates"
            note="This sends an enquiry, not a card charge. We confirm by email, usually within a few hours."
          />
          <p className="book-aside">
            Booking through us rather than a platform saves the commission, which is
            somewhere between twelve and eighteen per cent. We would rather that
            stayed in the house.
          </p>
        </div>

        <form className="book-form" onSubmit={submit} noValidate>
          <label className="field">
            <span className="field-label">Room</span>
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              {ROOMS.map((r) => (
                <option key={r.id} value={r.id}>{r.name} — {r.rate}₾</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field-label">Guests</span>
            <input
              type="number"
              min="1"
              max="4"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
            {errors.guests && <span className="field-error">{errors.guests}</span>}
          </label>

          <label className="field">
            <span className="field-label">Arriving</span>
            <input type="date" value={arrive} min={isoToday()} onChange={(e) => setArrive(e.target.value)} />
          </label>

          <label className="field">
            <span className="field-label">Leaving</span>
            <input type="date" value={depart} min={arrive} onChange={(e) => setDepart(e.target.value)} />
            {errors.dates && <span className="field-error">{errors.dates}</span>}
          </label>

          <div className="quote" data-empty={nights < 1}>
            {nights > 0 ? (
              <>
                <span>
                  {nights} {nights === 1 ? 'night' : 'nights'} · {chosen.rate}<Lari /> each
                </span>
                <b>{total}<Lari /></b>
              </>
            ) : (
              <span>Pick a departure date after the arrival date.</span>
            )}
          </div>

          <label className={errors.name ? 'field has-error' : 'field'}>
            <span className="field-label">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label className={errors.email ? 'field has-error' : 'field'}>
            <span className="field-label">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <button className="btn btn-solid btn-lg" type="submit">Send enquiry</button>
        </form>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- gallery */

function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + GALLERY.length) % GALLERY.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section className="section section-cream" id="gallery">
      <div className="shell">
        <SectionHead eyebrow="Gallery" title="The house and its street" />
        <div className="gallery">
          {GALLERY.map((img, i) => (
            <button key={img.src} type="button" className="shot" onClick={() => setActive(i)}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <img src={GALLERY[active].src} alt={GALLERY[active].alt} />
          <p>{GALLERY[active].alt}</p>
          <button className="lightbox-close" type="button" aria-label="Close">&times;</button>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ find */

function Find() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="find">
      <div className="shell find-grid">
        <div>
          <SectionHead eyebrow="Find us" title="Amaghleba Street, Sololaki" />
          <address>
            {HOUSE.street}<br />
            {HOUSE.district}<br />
            {HOUSE.city}
          </address>
          <p className="contact-links">
            <a href={`tel:${HOUSE.phone.replace(/\s/g, '')}`}>{HOUSE.phone}</a>
            <a href={`mailto:${HOUSE.email}`}>{HOUSE.email}</a>
          </p>
          <ul className="nearby">
            {NEARBY.map(([time, what]) => (
              <li key={what}><b>{time}</b><span>{what}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <img className="find-img" src={roofs} alt="Rooftops of the old town" loading="lazy" />
          <div className="faq">
            {FAQ.map((item, i) => (
              <div key={item.q} className={open === i ? 'qa is-open' : 'qa'}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {item.q}
                  <span aria-hidden="true">{open === i ? '−' : '+'}</span>
                </button>
                <div className="qa-body"><p>{item.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- pieces */

/** Cormorant has no lari sign, so the symbol is set in the body face. */
function Lari() {
  return <span className="lari">&#8382;</span>
}

function SectionHead({ eyebrow, title, note }) {
  return (
    <div className="section-head">
      <p className="kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p className="foot-mark">The Balcony House</p>
        <p>{HOUSE.street}, {HOUSE.district}, {HOUSE.city}</p>
        <p>
          <a href={`tel:${HOUSE.phone.replace(/\s/g, '')}`}>{HOUSE.phone}</a>
          {' · '}
          <a href={`mailto:${HOUSE.email}`}>{HOUSE.email}</a>
        </p>
        <p className="fine">
          A concept site, built as a demonstration. The Balcony House is not a real
          guesthouse. Some photographs from Wikimedia Commons — see CREDITS.md.
        </p>
      </div>
    </footer>
  )
}
