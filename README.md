# Koushik Padmanabhan, game developer portfolio

**Live site: [koushik2k3.github.io](https://koushik2k3.github.io)**

The personal portfolio of Koushik Padmanabhan, a game developer and MS Computer Science (Game Development) student at the University of Southern California. The site collects engine projects in Unreal, Unity, and Godot along with a set of trained reinforcement learning agents, with a focus on game AI.

## A live agent in the hero

The first thing on the page is a tabular Q-learning agent learning FrozenLake from scratch in the visitor's browser. It starts out moving at random, falls through the ice a lot, and within about a minute finds a reliable path to the goal.

Arrows show the agent's current best move on each tile, and tile color warms as the learned value of that tile rises, so you can watch the value spread back from the goal toward the start. Visitors can pause it, skip ahead 100 episodes, or reset the agent.

| Setting | Value |
| --- | --- |
| Environment | 4×4 FrozenLake, non-slippery (same layout as Gym's `FrozenLake-v1`) |
| Algorithm | Tabular Q-learning with epsilon-greedy exploration |
| Learning rate | 0.7 |
| Discount | 0.95 |
| Exploration | Starts at 100%, decays 3.5% per episode to a 5% floor |
| Pacing | 8 background training episodes between each animated run |

The agent is plain JavaScript, with no ML library. It pauses when scrolled out of view, and it starts paused for visitors who have reduced motion turned on.

## What's in the portfolio

### Game projects

| Project | Engine | Summary |
| --- | --- | --- |
| Traffic simulator | Unreal Engine | Two-lane autonomous traffic with braking to avoid collisions, lane following, and recovery to the nearest lane when placed off the road |
| Endless flyer | Unity | Infinite canyon flight with W/S controls and randomly spawned obstacles |
| Side-scrolling runner | Unity | Run through a low-poly town and jump obstacles |
| Sumo waves | Unity | Push enemy balls off the arena; enemy count doubles each wave |
| Ball football | Unity | Push the enemy ball into the opposing goal before it reaches yours |
| Slicer | Unity | A Fruit Ninja-style game |
| Pixel platformer | Godot | 2D platformer with coins, enemies, and an end-of-level coin tally |
| Shooter prototypes | Unity | Small shooters with side and top-down cameras |

### Reinforcement learning agents

| Agent | Framework | Algorithm | Model or demo |
| --- | --- | --- | --- |
| Huggy | Unity ML-Agents | PPO | [Demo](https://huggingface.co/spaces/ThomasSimonini/Huggy) |
| Snowball Target | Unity ML-Agents | PPO | [Demo](https://huggingface.co/spaces/ThomasSimonini/ML-Agents-SnowballTarget) |
| Pyramids | Unity ML-Agents | PPO | [Demo](https://huggingface.co/spaces/unity/ML-Agents-Pyramids) |
| Lunar Lander | Gym | PPO | [Model](https://huggingface.co/koushik2k3/ppo-LunarLander-v2) |
| Taxi | Gym | Q-learning | [Model](https://huggingface.co/koushik2k3/q-Taxi-v3) |
| Frozen Lake | Gym | Q-learning | [Model](https://huggingface.co/koushik2k3/q-FrozenLake-v1-4x4-noSlippery) |
| Space Invaders | Gym (Atari) | DQN | [Model](https://huggingface.co/koushik2k3/dqn-SpaceInvadersNoFrameskip-v4) |

The ML-Agents demos load a model you pick by username; the trained agents here are under `koushik2k3`.

## Built with

The site is built with Vite and React 19, with no UI or animation libraries. Styling is hand-written CSS using custom properties for the color tokens, and it adapts to light and dark mode from the system setting. Type is set in [Archivo](https://fonts.google.com/specimen/Archivo), using its variable width axis to contrast expanded headlines with condensed labels.

Screenshots are served as WebP, except pixel art, which stays PNG and renders with crisp pixel scaling. The screenshot viewer is built on the native `<dialog>` element, so keyboard navigation and Escape to close come from the browser.

Every push to `main` builds the site and deploys it to GitHub Pages through GitHub Actions.

## Repository layout

```
src/
  data.js                   all site content: projects, agents, links, copy
  App.jsx                   page sections
  components/
    FrozenLakeAgent.jsx     the live Q-learning demo
    Lightbox.jsx            screenshot viewer
  styles.css                design tokens, layout, dark mode
  assets/projects/          project screenshots
public/                     favicon and static files
.github/workflows/          GitHub Pages deployment
```

## Contact

Koushik Padmanabhan, Los Angeles, CA

[GitHub](https://github.com/koushik2k3) | [Hugging Face](https://huggingface.co/koushik2k3)
