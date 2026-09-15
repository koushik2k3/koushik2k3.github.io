import { useState } from 'react'
import FrozenLakeAgent from './components/FrozenLakeAgent.jsx'
import Lightbox from './components/Lightbox.jsx'
import { profile, featured, prototypes, mlAgents, classicRL, now, about } from './data.js'

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top">{profile.name}</a>
      <nav aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#agents">Agents</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>{profile.headline}</h1>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-actions">
          <a className="button button--solid" href="#work">See the work</a>
          {profile.resume && <a className="button" href={profile.resume}>Download resume</a>}
        </div>
      </div>
      <FrozenLakeAgent />
    </section>
  )
}

function Featured() {
  const media = [
    ...(featured.video ? [{ type: 'video', ...featured.video }] : []),
    ...featured.images.map((img) => ({ type: 'image', ...img })),
  ]
  const [active, setActive] = useState(0)
  const current = media[active]

  return (
    <article className="featured">
      <div className="featured-media">
        <div className="featured-stage">
          {current.type === 'video' ? (
            <iframe
              src={current.embed}
              title={current.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <img src={current.src} alt={current.alt} />
          )}
        </div>
        {media.length > 1 && (
          <div className="featured-thumbs" role="group" aria-label="Video and screenshots">
            {media.map((m, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={active === i}
                aria-label={m.type === 'video' ? 'Play video' : `Show screenshot ${featured.video ? i : i + 1}`}
                onClick={() => setActive(i)}
              >
                <img src={m.type === 'video' ? m.poster : m.src} alt="" />
                {m.type === 'video' && <span className="play-badge" aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="featured-copy">
        <h3>{featured.title}</h3>
        <p className="engine">{featured.engine}</p>
        <p>{featured.summary}</p>
        <ul className="feature-list">
          {featured.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        {featured.video && (
          <p className="featured-watch">
            <a className="text-link" href={featured.video.url} target="_blank" rel="noreferrer">
              Watch on Google Drive
            </a>
          </p>
        )}
      </div>
    </article>
  )
}

function Prototypes({ onOpen }) {
  return (
    <div className="proto-grid">
      {prototypes.map((p) => {
        const span = p.span === 'full' ? ' proto--full' : p.span === 'wide' ? ' proto--wide' : ''
        return (
          <article key={p.title} className={`proto${span}`}>
            <div className="proto-open" onClick={() => onOpen(p)}>
              <span className={`proto-image${p.pixel ? ' is-pixel' : ''}`}>
                <img src={p.images[0].src} alt={p.images[0].alt} loading="lazy" />
              </span>
              <h3 className="proto-title">{p.title}</h3>
              <span className="engine">{p.engine}</span>
              <p className="proto-summary">{p.summary}</p>
            </div>
            <div className="proto-links">
              <button type="button" className="proto-more" onClick={() => onOpen(p)}>
                {p.images.length > 1 ? `View ${p.images.length} screenshots` : 'View screenshot'}
              </button>
              {p.playUrl && (
                <a className="proto-more" href={p.playUrl} target="_blank" rel="noreferrer">
                  Play on itch.io
                </a>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function Agents() {
  return (
    <>
      <div className="subsection">
        <h3>Unity ML-Agents</h3>
        <p className="section-lede">
          Trained agents you can watch live on Hugging Face. When the demo asks for a model, pick koushik2k3.
        </p>
        <div className="ml-grid">
          {mlAgents.map((a) => (
            <article key={a.title} className="ml-agent">
              <div className="ml-shots">
                {a.images.map((img) => <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />)}
              </div>
              <h4>{a.title}</h4>
              <p>{a.summary}</p>
              <a className="text-link" href={a.href} target="_blank" rel="noreferrer">Watch the agent</a>
            </article>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Classic environments</h3>
        <p className="section-lede">Trained models published on Hugging Face.</p>
        <table className="rl-table">
          <thead>
            <tr>
              <th scope="col"><span className="visually-hidden">Preview</span></th>
              <th scope="col">Environment</th>
              <th scope="col">Algorithm</th>
              <th scope="col">What it learned</th>
              <th scope="col"><span className="visually-hidden">Link</span></th>
            </tr>
          </thead>
          <tbody>
            {classicRL.map((r) => (
              <tr key={r.title}>
                <td className="rl-thumb">
                  <img
                    src={r.image.src}
                    alt={r.image.alt}
                    loading="lazy"
                    className={r.image.pixel ? 'is-pixel' : undefined}
                  />
                </td>
                <th scope="row">{r.title}</th>
                <td className="rl-algo">{r.algorithm}</td>
                <td>{r.task}</td>
                <td><a className="text-link" href={r.href} target="_blank" rel="noreferrer">Model</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <a className="skip-link" href="#work">Skip to projects</a>
      <div className="page">
        <Header />
        <main>
          <Hero />

          <section className="section" id="work" aria-labelledby="work-title">
            <h2 id="work-title">Work</h2>
            <p className="section-lede">Engine projects, from game AI to small gameplay prototypes.</p>
            <Featured />
            <Prototypes onOpen={setOpen} />
          </section>

          <section className="section" id="agents" aria-labelledby="agents-title">
            <h2 id="agents-title">Agents</h2>
            <p className="section-lede">Reinforcement learning agents trained to play games and solve tasks.</p>
            <Agents />
          </section>

          {now && (
            <section className="section now" aria-labelledby="now-title">
              <h2 id="now-title">Now</h2>
              <div className="now-card">
                <p className="now-status">{now.status}</p>
                <h3>{now.title}</h3>
                {now.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          )}

          <section className="section about" id="about" aria-labelledby="about-title">
            <h2 id="about-title">About</h2>
            <div className="about-body">
              {about.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          <section className="section contact" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">Let’s talk</h2>
            <p className="section-lede">Open to internships and roles in gameplay programming and game AI.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <ul className="contact-links">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a className="text-link" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                </li>
              ))}
              {profile.resume && (
                <li><a className="text-link" href={profile.resume}>Resume</a></li>
              )}
            </ul>
          </section>
        </main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </div>
      <Lightbox project={open} onClose={() => setOpen(null)} />
    </>
  )
}
