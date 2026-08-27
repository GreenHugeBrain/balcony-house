import { Page, SectionHead } from '../components/Chrome.jsx'
import Lari from '../components/Lari.jsx'
import { HOUSE, ROOMS, SPACES, GALLERY } from '../data.js'
import { href } from '../lib/paths.js'

import hero from '../assets/hero.jpg'

export default function Home() {
  return (
    <Page transparentHeader>
      <section className="hero">
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
            <a className="btn btn-solid btn-lg" href={href('book')}>Check dates</a>
            <a className="btn btn-ghost btn-lg" href={href('rooms')}>See the rooms</a>
          </div>
        </div>
      </section>

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

      <section className="section section-cream">
        <div className="shell">
          <SectionHead
            eyebrow="Rooms"
            title="Four kinds of room, nine in total"
            note="Rates are per night for the room, not per person, and include breakfast and taxes."
          />
          <div className="room-teasers">
            {ROOMS.map((r) => (
              <a className="room-teaser" key={r.id} href={href('rooms')}>
                <span className="room-teaser-name">{r.name}</span>
                <span className="room-teaser-aspect">{r.aspect}</span>
                <span className="room-teaser-rate">{r.rate}<Lari /></span>
              </a>
            ))}
          </div>
          <div className="after-list">
            <a className="btn btn-ghost" href={href('rooms')}>All four in detail</a>
          </div>
        </div>
      </section>

      <section className="section">
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
          <div className="after-list">
            <a className="btn btn-ghost" href={href('house')}>More about the house</a>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="shell">
          <SectionHead eyebrow="Gallery" title="The house and its street" />
          <div className="gallery">
            {GALLERY.slice(0, 4).map((img) => (
              <a className="shot" key={img.src} href={href('gallery')}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell cta">
          <div>
            <h2>Book direct and keep the commission in the house.</h2>
            <p>
              Booking through a platform costs somewhere between twelve and eighteen
              per cent. We would rather that stayed here.
            </p>
          </div>
          <a className="btn btn-solid btn-lg" href={href('book')}>Check dates</a>
        </div>
      </section>
    </Page>
  )
}
