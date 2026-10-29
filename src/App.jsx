import { useState } from 'react'
import FrozenLakeAgent from './components/FrozenLakeAgent.jsx'
import Lightbox from './components/Lightbox.jsx'
import Clip from './components/Clip.jsx'
import { profile, featured, prototypes, mlAgents, classicRL, about } from './data.js'

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top">{profile.name}</a>
      <nav aria-label="Sections">
        <a href="#agents">Agents</a>
        <a href="#work">Games</a>
        <a href="#benchmarks">Benchmarks</a>
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
          <a className="button button--solid" href="#work">See the games</a>
          {profile.resume && <a className="button" href={profile.resume}>Download resume</a>}
        </div>
      </div>
      <FrozenLakeAgent />
    </section>
  )
}

function FeaturedVideo({ video }) {
  const [started, setStarted] = useState(false)

  // A self-hosted file plays inline. A Google Drive embed only loads once asked
  // for, since the iframe is heavy and slow to appear.
  if (video.src) {
    return <video src={video.src} poster={video.poster} controls playsInline preload="none" title={video.title} />
  }
  if (started) {
    return <iframe src={video.embed} title={video.title} allow="autoplay; fullscreen" allowFullScreen />
  }
  return (
    <button type="button" className="video-facade" onClick={() => setStarted(true)}>
      <img src={video.poster} alt="" />
      <span className="play-badge play-badge--large" aria-hidden="true" />
      <span className="visually-hidden">Play {video.title}</span>
    </button>
  )
}

function Featured({ project, flip }) {
  const media = [
    ...(project.video ? [{ type: 'video', ...project.video }] : []),
    ...project.images.map((img) => ({ type: 'image', ...img })),
  ]
  const [active, setActive] = useState(0)
  const current = media[active]

  return (
    <article className={`featured${flip ? ' featured--flip' : ''}`}>
      <div className="featured-media">
        <div className={`featured-stage${project.pixel ? ' is-pixel' : ''}`}>
          {current.type === 'video' ? (
            <FeaturedVideo video={current} />
          ) : (
            <Clip clip={active === 0 ? project.clip : null} image={current} />
          )}
        </div>
        {media.length > 1 && (
          <div className="featured-thumbs" role="group" aria-label={`${project.title} video and screenshots`}>
            {media.map((m, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={active === i}
                aria-label={m.type === 'video' ? 'Show video' : `Show screenshot ${project.video ? i : i + 1}`}
                onClick={() => setActive(i)}
              >
                <img src={m.type === 'video' ? m.poster : m.src} alt="" className={project.pixel ? 'is-pixel' : undefined} />
                {m.type === 'video' && <span className="play-badge" aria-hidden="true" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="featured-copy">
        <h3>{project.title}</h3>
        <p className="engine">{project.engine}</p>
        <p>{project.summary}</p>
        <p className="feature-label">{project.builtLabel}</p>
        <ul className="feature-list">
          {project.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
        <ProjectLinks project={project} className="featured-links" />
      </div>
    </article>
  )
}

function ProjectLinks({ project, className, children }) {
  const watch = project.video && !project.video.src ? project.video.url : null
  if (!children && !project.playUrl && !project.source && !watch) return null
  return (
    <div className={className}>
      {children}
      {project.playUrl && (
        <a className="proto-more" href={project.playUrl} target="_blank" rel="noreferrer">Play on itch.io</a>
      )}
      {watch && (
        <a className="proto-more" href={watch} target="_blank" rel="noreferrer">Watch on Google Drive</a>
      )}
      {project.source && (
        <a className="proto-more" href={project.source} target="_blank" rel="noreferrer">Source</a>
      )}
    </div>
  )
}

function Prototypes({ onOpen }) {
  return (
    <div className="subsection">
      <h3>Gameplay prototypes</h3>
      <p className="section-lede">Smaller games, each built around a single mechanic.</p>
      <div className="proto-grid">
        {prototypes.map((p) => (
          <article key={p.title} className="proto">
            <button type="button" className="proto-image" onClick={() => onOpen(p)}>
              <Clip clip={p.clip} image={p.images[0]} />
              <span className="visually-hidden">
                {p.images.length > 1 ? `View ${p.images.length} screenshots of ${p.title}` : `View screenshot of ${p.title}`}
              </span>
            </button>
            <h4 className="proto-title">{p.title}</h4>
            <span className="engine">{p.engine}</span>
            <p className="proto-summary">{p.summary}</p>
            <ProjectLinks project={p} className="proto-links" />
          </article>
        ))}
      </div>
    </div>
  )
}

function Agents() {
  return (
        <div className="ml-grid">
          {mlAgents.map((a) => (
            <article key={a.title} className="ml-agent">
              <div className={`ml-shots${a.clip ? ' ml-shots--clip' : ''}`}>
                {a.clip
                  ? <Clip clip={a.clip} image={a.images[0]} />
                  : a.images.map((img) => <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />)}
              </div>
              <h4>{a.title}</h4>
              <p>{a.summary}</p>
              <a className="text-link" href={a.href} target="_blank" rel="noreferrer">Watch the agent</a>
            </article>
          ))}
        </div>
  )
}

function Benchmarks() {
  return (
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

          <section className="section" id="agents" aria-labelledby="agents-title">
            <h2 id="agents-title">Trained agents</h2>
            <p className="section-lede">
              Unity ML-Agents trained with PPO. Watch them play live on Hugging Face, and pick koushik2k3 when the demo asks for a model.
            </p>
            <Agents />
          </section>

          <section className="section" id="work" aria-labelledby="work-title">
            <h2 id="work-title">Games</h2>
            <p className="section-lede">Projects built in Unreal, Unity, and Godot.</p>
            {featured.map((p, i) => <Featured key={p.title} project={p} flip={i % 2 === 1} />)}
            <Prototypes onOpen={setOpen} />
          </section>

          <section className="section" id="benchmarks" aria-labelledby="benchmarks-title">
            <h2 id="benchmarks-title">RL benchmarks</h2>
            <p className="section-lede">Agents trained on classic Gym and Atari environments, with the models published on Hugging Face.</p>
            <Benchmarks />
          </section>


          <section className="section about" id="about" aria-labelledby="about-title">
            <h2 id="about-title">About me</h2>
            <div className="about-body">
              {about.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          <section className="section contact" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">Get in touch</h2>
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
