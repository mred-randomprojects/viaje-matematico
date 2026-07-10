# Tu Viaje Matemático

An interactive math learning path (in Argentinian Spanish): a winding trail of lessons from counting all the way to the edge of algebra. Tap a stop to see a short explanation and 2–3 example exercises; mark it done and the road turns green behind you. Progress is saved locally in the browser.

## How it's built

A single self-contained `index.html` — all CSS and JS are inline, no build step, no dependencies. Progress is stored in `localStorage` (no account needed, private to each device).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the site to GitHub Pages automatically. No local build.

## Editing

Open `index.html` and edit directly. The curriculum, exercises, and per-lesson explanations live in the `<script>` block (`CURRICULUM` and `INTROS`).

## Roadmap ideas

- Sync progress across devices (Firebase) instead of local-only storage
- More exercises per lesson
- Additional topics
