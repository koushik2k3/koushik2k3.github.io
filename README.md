# Koushik Padmanabhan, game developer portfolio

A single-page portfolio built with Vite and React. The hero runs a real Q-learning agent on Frozen Lake in the visitor's browser, followed by engine projects, reinforcement learning agents, and contact details.

## Run it locally

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Edit the content

Almost everything lives in `src/data.js`: your intro, links, projects, screenshots, and the About text. Before you publish, go through this list:

1. Replace the placeholder `email` and the GitHub and LinkedIn links in `profile`.
2. Add your resume as `public/resume.pdf`, then set `resume: 'resume.pdf'`.
3. Check the engine label on each prototype. The ones marked Unity were inferred from screenshots.
4. Rewrite the `about` paragraphs in your own voice.
5. Set `now` to `null` if you'd rather not show Kali Yuga publicly yet.

To add a project, drop screenshots into `src/assets/projects/`, import them at the top of `data.js`, and add an entry to `prototypes`. Items with `span: 'wide'` take two of the three columns, so keep each row adding up to three.

Game footage sells a portfolio far better than stills. For short looping clips, export them as `.mp4` or `.webm` and swap the `<img>` in `App.jsx` for `<video autoplay muted loop playsinline>`.

## Deploy to GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the site every time you push to `main`.

1. Create a repository on GitHub. Naming it `<your-username>.github.io` gives you the cleanest URL; any other name works too and is served at `https://<your-username>.github.io/<repo-name>/`.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish. The live URL appears in the deploy job.

`vite.config.js` uses `base: './'`, so the same build works at either URL without changes.

## Project structure

```
index.html                  page shell, fonts, meta tags
src/data.js                 all editable content
src/App.jsx                 page sections
src/components/
  FrozenLakeAgent.jsx       live Q-learning demo in the hero
  Lightbox.jsx              screenshot viewer
src/styles.css              design tokens, layout, dark mode
src/assets/projects/        screenshots
```
