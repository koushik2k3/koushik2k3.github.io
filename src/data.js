// Everything you'll want to edit lives in this file.
// Swap the placeholder links, tweak copy, reorder projects.

import traffic1 from './assets/projects/traffic-1.webp'
import traffic2 from './assets/projects/traffic-2.webp'
import flyer from './assets/projects/endless-flyer.webp'
import runner from './assets/projects/runner.webp'
import sumo from './assets/projects/sumo-waves.webp'
import football from './assets/projects/ball-football.webp'
import slicer from './assets/projects/slicer.webp'
import platformer1 from './assets/projects/platformer-1.png'
import platformer2 from './assets/projects/platformer-2.png'
import platformer3 from './assets/projects/platformer-3.png'
import shooter1 from './assets/projects/shooter-1.webp'
import shooter2 from './assets/projects/shooter-2.webp'
import huggy1 from './assets/projects/huggy-1.webp'
import huggy2 from './assets/projects/huggy-2.webp'
import snowball1 from './assets/projects/snowball-1.webp'
import snowball2 from './assets/projects/snowball-2.webp'
import pyramids1 from './assets/projects/pyramids-1.webp'
import pyramids2 from './assets/projects/pyramids-2.webp'
import lander from './assets/projects/lunar-lander.webp'
import taxi from './assets/projects/taxi.webp'
import frozenLake from './assets/projects/frozen-lake.webp'
import invaders from './assets/projects/space-invaders.png'
import superPeachClip from './assets/clips/super-peach.mp4'
import huggyClip from './assets/clips/huggy.mp4'
import snowballClip from './assets/clips/snowball.mp4'
import pyramidsClip from './assets/clips/pyramids.mp4'

export const profile = {
  name: 'Koushik Padmanabhan',
  headline: 'I build games, and the agents that learn to play them.',
  intro:
    'Game developer working across Unity, Unreal, and Godot, with a focus on game AI. Currently studying for an MS in Computer Science (Game Development) at USC in Los Angeles.',
  // TODO: replace these placeholders before you deploy.
  email: 'koushikkp2003@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/koushik2k3' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/koushik-koli-padmanabhan-ab2625255/' },
    { label: 'Hugging Face', href: 'https://huggingface.co/koushik2k3' },
  ],
  // Put resume.pdf in /public and set this to 'resume.pdf'. Empty hides the resume links.
  resume: 'resume.pdf',
}

// Clips: drop a short, muted gameplay loop (MP4 or WebM, under ~3 MB) into
// src/assets/clips/, import it at the top of this file, and set `clip` on a
// project or agent. It autoplays muted while on screen and falls back to the
// screenshot for visitors with reduced motion turned on.
// source: link to the project's GitHub repo. Empty hides the link.

export const featured = [
  {
    title: 'Traffic simulator',
    engine: 'Unreal Engine',
    summary:
      'Autonomous cars sharing a two-lane circuit. They brake to avoid hitting each other, stick to their lane, and find their way back to the road when placed off it.',
    builtLabel: 'What I built',
    features: [
      'Two-lane traffic running on placed lane splines',
      'Collision avoidance through braking when another car is ahead',
      'Cars follow whichever lane they are placed on',
      'Cars dropped off the road find the nearest lane and merge onto it',
    ],
    source: '',
    video: {
      url: 'https://drive.google.com/file/d/1D__91bMoh9DyKQQehAjVKk0a2JmInH1x/view?usp=sharing',
      embed: 'https://drive.google.com/file/d/1D__91bMoh9DyKQQehAjVKk0a2JmInH1x/preview',
      poster: traffic1,
      title: 'Traffic simulator video',
    },
    images: [
      { src: traffic1, alt: 'Cars driving in a line along a curved two-lane track' },
      { src: traffic2, alt: 'Wide view of the track with cars spread across both lanes' },
    ],
  },
  {
    title: 'Super Peach',
    engine: 'Godot',
    pixel: true,
    summary: 'A 2D pixel-art platformer: jump across the level, collect coins, avoid the slimes, and see your coin tally at the end.',
    builtLabel: 'What I built',
    features: [
      'Platforming movement and jumping',
      'Collectible coins with an end-of-level tally',
      'Patrolling enemies to avoid',
      'Published and playable in the browser on itch.io',
    ],
    source: '',
    clip: superPeachClip,
    playUrl: 'https://kousa2k3.itch.io/super-peach',
    images: [
      { src: platformer1, alt: 'Knight standing on grass blocks next to a Space to jump prompt' },
      { src: platformer2, alt: 'Knight near a palm tree with a green slime enemy below' },
      { src: platformer3, alt: 'End screen reading You collected 7 coins' },
    ],
  },
]

// Smaller prototypes, shown as a compact grid of three across.
// NOTE: engine labels marked 'Unity' were inferred from the screenshots. Double-check them.
export const prototypes = [
  {
    title: 'Endless flyer',
    engine: 'Unity',
    summary: 'An infinite flight through a canyon. Fly up and down with W and S to dodge obstacles that spawn at random positions.',
    clip: null,
    source: '',
    details: ['W and S to climb and dive', 'Scrolling background and animated propeller', 'Obstacles spawn at random positions'],
    images: [{ src: flyer, alt: 'Red and yellow plane flying between dark canyon walls' }],
  },
  {
    title: 'Side-scrolling runner',
    engine: 'Unity',
    summary: 'Run through a low-poly town and jump the obstacles in your path.',
    details: [],
    clip: null,
    source: '',
    images: [{ src: runner, alt: 'Blocky character jumping over a stone wall on a town street' }],
  },
  {
    title: 'Sumo waves',
    engine: 'Unity',
    summary: 'Knock enemy balls off a floating arena before they knock you off. Each wave doubles the enemy count.',
    clip: null,
    source: '',
    details: ['Physics-based pushing', 'Enemy count doubles every wave'],
    images: [{ src: sumo, alt: 'White player ball and coloured enemy balls on a dark hexagonal platform' }],
  },
  {
    title: 'Ball football',
    engine: 'Unity',
    summary: 'Shove enemy balls into the opposing goal before they roll into yours.',
    details: [],
    clip: null,
    source: '',
    images: [{ src: football, alt: 'Two football-patterned balls in front of a goal on a grass field' }],
  },
  {
    title: 'Slicer',
    engine: 'Unity',
    summary: 'A Fruit Ninja-style game. Shown here in the editor preview to give a sense of the play space.',
    details: [],
    clip: null,
    source: '',
    images: [{ src: slicer, alt: 'Editor view of balls and a bomb launched into the play area' }],
  },
  {
    title: 'Shooter prototypes',
    engine: 'Unity',
    summary: 'Small shooter games played from a side view and a top-down view.',
    details: [],
    clip: null,
    source: '',
    images: [
      { src: shooter1, alt: 'Farmer character and a running dog, with a projectile in the air' },
      { src: shooter2, alt: 'Top-down view of the player and an animal on a grassy field' },
    ],
  },
]

// Unity ML-Agents environments. The Hugging Face demos ask you to pick a model:
// choose the koushik2k3 one to watch these trained agents.
export const mlAgents = [
  {
    title: 'Huggy',
    summary: 'Throw a stick and Huggy the dog runs to fetch it.',
    clip: huggyClip,
    href: 'https://huggingface.co/spaces/ThomasSimonini/Huggy',
    images: [
      { src: huggy1, alt: 'Huggy the dog running across a fenced garden' },
      { src: huggy2, alt: 'Huggy carrying a stick in its mouth' },
    ],
  },
  {
    title: 'Snowball target',
    summary: 'The agent positions itself and fires snowballs at the target.',
    clip: snowballClip,
    href: 'https://huggingface.co/spaces/ThomasSimonini/ML-Agents-SnowballTarget',
    images: [
      { src: snowball1, alt: 'Agent throwing a snowball down an icy lane' },
      { src: snowball2, alt: 'Snowball hitting the target, score 6' },
    ],
  },
  {
    title: 'Pyramids',
    summary: 'The agent explores to find a button, then hunts down the treasure pyramid it unlocks.',
    clip: pyramidsClip,
    href: 'https://huggingface.co/spaces/unity/ML-Agents-Pyramids',
    images: [
      { src: pyramids1, alt: 'Agent approaching a green button on the floor' },
      { src: pyramids2, alt: 'Agent after activating the button, pyramid visible in the room' },
    ],
  },
]

export const classicRL = [
  {
    title: 'Lunar Lander',
    algorithm: 'PPO',
    task: 'Fire thrusters to land softly between the flags.',
    href: 'https://huggingface.co/koushik2k3/ppo-LunarLander-v2',
    image: { src: lander, alt: 'Lander descending toward a landing pad between two flags' },
  },
  {
    title: 'Taxi',
    algorithm: 'Q-learning',
    task: 'Pick up a passenger and drop them at the right stop.',
    href: 'https://huggingface.co/koushik2k3/q-Taxi-v3',
    image: { src: taxi, alt: 'Taxi on a grid road next to a waiting passenger' },
  },
  {
    title: 'Frozen Lake',
    algorithm: 'Q-learning',
    task: 'Cross the ice to the present without falling through a hole.',
    href: 'https://huggingface.co/koushik2k3/q-FrozenLake-v1-4x4-noSlippery',
    image: { src: frozenLake, alt: 'Elf on a 4 by 4 ice grid with holes and a present' },
  },
  {
    title: 'Space Invaders',
    algorithm: 'DQN',
    task: 'Play the Atari classic straight from screen pixels.',
    href: 'https://huggingface.co/koushik2k3/dqn-SpaceInvadersNoFrameskip-v4',
    image: { src: invaders, alt: 'Atari Space Invaders screen with rows of aliens', pixel: true },
  },
]

export const about = [
  'I’m from Chennai and now live in Los Angeles, where I started the MS in Computer Science (Game Development) at the University of Southern California in August 2026.',
  'I’ve built prototypes in Unity, Unreal, and Godot, and trained reinforcement learning agents in Unity ML-Agents and classic Gym environments. The part of game development I keep coming back to is AI: characters and systems that react to what the player actually does.',
]
