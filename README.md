# Tu Viaje Matemático

An interactive math learning path (in Argentinian Spanish): a winding trail of lessons from counting all the way to the edge of algebra. Tap a stop to see a short explanation and 2–3 example exercises; mark it done and the road turns green behind you. Progress is saved locally in the browser.

## How it's built

A single self-contained `index.html` — all CSS and JS are inline, no build step, no dependencies. Progress is stored in `localStorage` (no account needed, private to each device).

## Structure: a skill graph

The home screen is a **map of skills** grouped into strands (Fundamentos, Fracciones, Álgebra, Funciones, Geometría, Cálculo, Datos). Each skill has **prerequisites**: it stays locked until every prerequisite is *mastered* (all its lessons done). Opening an available skill shows the winding-trail roadmap of its lessons. Finishing them masters the skill and unlocks whatever depends on it.

Skills with no lessons yet are **stubs** ("En construcción") — listed on the map so the full plan is visible even before the content exists. Fill a stub in by giving it a `ref` (pointers into `CURRICULUM`).

The graph lives in the `SKILLS` array in `index.html`; lesson content lives in `CURRICULUM` + `INTROS`.

## Correctness

Every computable answer is verified by running code (see the fractions/arithmetic checks), never by hand — LLM mental math is not trusted. When adding exercises, re-run a verification pass before shipping.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the site to GitHub Pages automatically. No local build.

## Editing

Open `index.html` and edit directly. The curriculum, exercises, and per-lesson explanations live in the `<script>` block (`CURRICULUM` and `INTROS`).

## Roadmap ideas

- Sync progress across devices (Firebase) instead of local-only storage
- More exercises per lesson
- Additional topics
