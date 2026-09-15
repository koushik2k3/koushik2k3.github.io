import { useCallback, useEffect, useRef, useState } from 'react'

// Deterministic 4x4 FrozenLake (same layout as Gym's FrozenLake-v1, is_slippery=False).
const MAP = ['SFFF', 'FHFH', 'FFFH', 'HFFG']
const N = 4
// Gym action order: left, down, right, up. Stored as [rowDelta, colDelta].
const MOVES = [[0, -1], [1, 0], [0, 1], [-1, 0]]
const ARROW_ROTATION = [180, 90, 0, 270]

const ALPHA = 0.7
const GAMMA = 0.95
const EPSILON_DECAY = 0.965
const EPSILON_MIN = 0.05
const MAX_STEPS = 40
const HIDDEN_EPISODES_PER_RUN = 8
const TICK_MS = 160
const WINDOW = 50

const tileAt = (s) => MAP[Math.floor(s / N)][s % N]

function envStep(s, a) {
  const r = Math.min(N - 1, Math.max(0, Math.floor(s / N) + MOVES[a][0]))
  const c = Math.min(N - 1, Math.max(0, (s % N) + MOVES[a][1]))
  const next = r * N + c
  const t = tileAt(next)
  return { next, reward: t === 'G' ? 1 : 0, done: t === 'G' || t === 'H' }
}

function createAgent() {
  return {
    q: Array.from({ length: N * N }, () => [0, 0, 0, 0]),
    epsilon: 1,
    episodes: 0,
    results: [],
  }
}

function pickAction(agent, s) {
  if (Math.random() < agent.epsilon) return Math.floor(Math.random() * 4)
  const row = agent.q[s]
  const best = Math.max(...row)
  const ties = row.flatMap((v, i) => (v === best ? [i] : []))
  return ties[Math.floor(Math.random() * ties.length)]
}

function learn(agent, s, a, reward, next, done) {
  const target = reward + (done ? 0 : GAMMA * Math.max(...agent.q[next]))
  agent.q[s][a] += ALPHA * (target - agent.q[s][a])
}

function endEpisode(agent, success) {
  agent.episodes += 1
  agent.results.push(success ? 1 : 0)
  if (agent.results.length > WINDOW) agent.results.shift()
  agent.epsilon = Math.max(EPSILON_MIN, agent.epsilon * EPSILON_DECAY)
}

function trainHidden(agent) {
  let s = 0
  for (let t = 0; t < MAX_STEPS; t++) {
    const a = pickAction(agent, s)
    const { next, reward, done } = envStep(s, a)
    learn(agent, s, a, reward, next, done)
    s = next
    if (done) return endEpisode(agent, reward > 0)
  }
  endEpisode(agent, false)
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function FrozenLakeAgent() {
  const agentRef = useRef(createAgent())
  const runRef = useRef(null) // the episode being animated: { s, t, outcome }
  const rootRef = useRef(null)
  const [, setFrame] = useState(0)
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  const [visible, setVisible] = useState(true)

  const redraw = useCallback(() => setFrame((f) => f + 1), [])

  const tick = useCallback(() => {
    const agent = agentRef.current
    const run = runRef.current

    if (!run || run.outcome) {
      for (let i = 0; i < HIDDEN_EPISODES_PER_RUN; i++) trainHidden(agent)
      runRef.current = { s: 0, t: 0, outcome: null }
    } else {
      const a = pickAction(agent, run.s)
      const { next, reward, done } = envStep(run.s, a)
      learn(agent, run.s, a, reward, next, done)
      run.s = next
      run.t += 1
      if (done || run.t >= MAX_STEPS) {
        run.outcome = reward > 0 ? 'goal' : 'fell'
        endEpisode(agent, reward > 0)
      }
    }
    redraw()
  }, [redraw])

  useEffect(() => {
    const el = rootRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || !visible) return
    const id = setInterval(tick, TICK_MS)
    return () => clearInterval(id)
  }, [playing, visible, tick])

  const fastForward = () => {
    for (let i = 0; i < 100; i++) trainHidden(agentRef.current)
    runRef.current = null
    redraw()
  }

  const reset = () => {
    agentRef.current = createAgent()
    runRef.current = null
    redraw()
  }

  const agent = agentRef.current
  const run = runRef.current
  const pos = run ? run.s : 0
  const successRate = agent.results.length
    ? Math.round((agent.results.reduce((a, b) => a + b, 0) / agent.results.length) * 100)
    : 0

  let status = 'Ready to explore'
  if (run?.outcome === 'goal') status = 'Reached the present'
  else if (run?.outcome === 'fell') status = 'Fell through the ice'
  else if (run) status = 'On the ice'

  return (
    <figure className="lake" ref={rootRef}>
      <div className="lake-board" role="img" aria-label={`Frozen Lake grid. ${status}. ${agent.episodes} episodes trained.`}>
        {MAP.join('').split('').map((t, s) => {
          const values = agent.q[s]
          const best = Math.max(...values)
          const action = values.indexOf(best)
          const showArrow = t === 'F' || t === 'S'
          return (
            <div
              key={s}
              className={`lake-tile lake-tile--${t}`}
              style={t === 'F' || t === 'S' ? { '--heat': `${Math.round(Math.pow(Math.min(1, best), 3) * 70)}%` } : undefined}
            >
              {t === 'H' && <span className="lake-hole" />}
              {t === 'G' && (
                <svg className="lake-goal" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="10" rx="1" />
                  <rect x="2.5" y="7" width="19" height="4" rx="1" />
                  <path d="M12 7v13" className="lake-ribbon" />
                </svg>
              )}
              {showArrow && best > 0.001 && (
                <svg
                  className="lake-arrow"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ transform: `rotate(${ARROW_ROTATION[action]}deg)`, opacity: 0.3 + 0.7 * Math.min(1, best) }}
                >
                  <path d="M5 12h12M12 6l6 6-6 6" />
                </svg>
              )}
            </div>
          )
        })}
        <div
          className={`lake-agent${run?.outcome === 'fell' ? ' is-fallen' : ''}${run?.outcome === 'goal' ? ' is-home' : ''}`}
          style={{ transform: `translate(${(pos % N) * 100}%, ${Math.floor(pos / N) * 100}%)` }}
          aria-hidden="true"
        >
          <span />
        </div>
      </div>

      <figcaption className="lake-side">
        <p className="lake-status" aria-live="polite">{status}</p>
        <dl className="lake-stats">
          <div>
            <dt>Episodes</dt>
            <dd>{agent.episodes}</dd>
          </div>
          <div>
            <dt>Random moves</dt>
            <dd>{Math.round(agent.epsilon * 100)}%</dd>
          </div>
          <div>
            <dt>Success, last {WINDOW}</dt>
            <dd>{successRate}%</dd>
          </div>
        </dl>
        <div className="lake-controls">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" onClick={fastForward}>Train 100 episodes</button>
          <button type="button" onClick={reset}>Reset agent</button>
        </div>
        <p className="lake-note">
          A Q-learning agent training in your browser. Arrows show its current best move; warmer tiles are worth more to it.
        </p>
      </figcaption>
    </figure>
  )
}
