import { Page, PageHead } from '../components/Chrome.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { GALLERY } from '../data.js'
import { href } from '../lib/paths.js'

export default function GalleryPage() {
  return (
    <Page>
      <PageHead
        eyebrow="Gallery"
        title="The house and its street"
        note="The balcony, the facade and the old town around it. Click any of them to see it full size."
      />

      <section className="section section-tight">
        <div className="shell">
          <Lightbox images={GALLERY} />
          <div className="after-list">
            <a className="btn btn-solid btn-lg" href={href('book')}>Check dates</a>
          </div>
        </div>
      </section>
    </Page>
  )
}
