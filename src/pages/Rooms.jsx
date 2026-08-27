import { useState } from 'react'

import { Page, PageHead } from '../components/Chrome.jsx'
import Lari from '../components/Lari.jsx'
import { ROOMS } from '../data.js'
import { href } from '../lib/paths.js'

export default function Rooms() {
  const [open, setOpen] = useState(ROOMS[0].id)

  return (
    <Page>
      <PageHead
        eyebrow="Rooms"
        title="Four kinds of room, nine in total"
        note="Rates are per night for the room, not per person, and include breakfast and taxes. Longer stays are quoted lower — ask."
      />

      <section className="section section-tight">
        <div className="shell">
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
                    <h2>{r.name}</h2>
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
                    <a className="btn btn-ghost" href={`${href('book')}?room=${r.id}`}>
                      Check this room
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="after-list">
            <a className="btn btn-solid btn-lg" href={href('book')}>Check dates</a>
          </div>
        </div>
      </section>
    </Page>
  )
}
