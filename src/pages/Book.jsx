import { useMemo, useState } from 'react'

import { Page, PageHead } from '../components/Chrome.jsx'
import Lari from '../components/Lari.jsx'
import { ROOMS } from '../data.js'
import { href } from '../lib/paths.js'

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
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

/** The rooms page links here as ?room=attic-studio, so honour that on arrival. */
function roomFromQuery() {
  const wanted = new URLSearchParams(window.location.search).get('room')
  return ROOMS.some((r) => r.id === wanted) ? wanted : ROOMS[0].id
}

export default function Book() {
  const [room, setRoom] = useState(roomFromQuery)
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
      <Page>
        <section className="section">
          <div className="shell">
            <div className="sent">
              <p className="kicker">Enquiry received</p>
              <h1>We will write back today, {sent.name.split(' ')[0]}.</h1>
              <dl className="sent-list">
                <div><dt>Room</dt><dd>{sent.room.name}</dd></div>
                <div><dt>Dates</dt><dd>{prettyDate(sent.arrive)} — {prettyDate(sent.depart)}</dd></div>
                <div><dt>Nights</dt><dd>{sent.nights}</dd></div>
                <div><dt>Guests</dt><dd>{sent.guests}</dd></div>
                <div><dt>Estimate</dt><dd>{sent.total}<Lari /> including breakfast</dd></div>
              </dl>
              <p className="sent-note">
                Nothing was actually sent and no room is held — this is a
                demonstration build. On a live site the house would have this in its
                inbox now.
              </p>
              <div className="confirm-actions">
                <button className="btn btn-ghost" type="button" onClick={() => setSent(null)}>
                  Change the dates
                </button>
                <a className="btn btn-ghost" href={href('')}>Back to the house</a>
              </div>
            </div>
          </div>
        </section>
      </Page>
    )
  }

  return (
    <Page>
      <PageHead
        eyebrow="Book direct"
        title="Check the dates"
        note="This sends an enquiry, not a card charge. We confirm by email, usually within a few hours."
      />

      <section className="section section-tight">
        <div className="shell book-grid">
          <div>
            <p className="book-aside">
              Booking through us rather than a platform saves the commission, which
              is somewhere between twelve and eighteen per cent. We would rather
              that stayed in the house.
            </p>
            <p className="book-aside">
              If the dates you want are taken we will say so and suggest the nearest
              thing, rather than leaving you to guess from a greyed-out calendar.
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

            <label className={errors.guests ? 'field has-error' : 'field'}>
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

            <label className={errors.dates ? 'field has-error' : 'field'}>
              <span className="field-label">Leaving</span>
              <input type="date" value={depart} min={arrive} onChange={(e) => setDepart(e.target.value)} />
              {errors.dates && <span className="field-error">{errors.dates}</span>}
            </label>

            <div className="quote" data-empty={nights < 1}>
              {nights > 0 ? (
                <>
                  <span>{nights} {nights === 1 ? 'night' : 'nights'} · {chosen.rate}<Lari /> each</span>
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
    </Page>
  )
}
