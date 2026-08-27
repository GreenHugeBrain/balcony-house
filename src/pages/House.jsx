import { useState } from 'react'

import { Page, PageHead, SectionHead } from '../components/Chrome.jsx'
import { HOUSE, SPACES, NEARBY, FAQ } from '../data.js'
import { href } from '../lib/paths.js'

import roofs from '../assets/roofs.jpg'

export default function House() {
  return (
    <Page>
      <PageHead
        eyebrow="The house"
        title="Built in 1884, put back together in 2021"
        note="It spent most of the last century divided into flats. Two years of work went into the balcony carvings, the tiled stove in the hall and the courtyard that had become a car park."
      />

      <section className="section section-tight">
        <div className="shell">
          <div className="spaces">
            {SPACES.map((s) => (
              <article key={s.title}>
                <img src={s.photo} alt={s.title} loading="lazy" />
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
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
            <Faq />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell cta">
          <div>
            <h2>Nine rooms, and a person on the end of the phone.</h2>
            <p>Check-in from {HOUSE.checkIn}, check-out by {HOUSE.checkOut}, and someone will wait up if your flight is late.</p>
          </div>
          <a className="btn btn-solid btn-lg" href={href('book')}>Check dates</a>
        </div>
      </section>
    </Page>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
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
  )
}
