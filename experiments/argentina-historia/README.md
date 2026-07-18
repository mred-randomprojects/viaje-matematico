# Curso de prueba — Argentina: los últimos 100 años

A **test** of the `COURSE-BUILDER-SPEC.md` method on a topic the learner knows nothing
about. Local only — **not** meant to be pushed/deployed yet.

## Cómo probarlo

Double-click `index.html` (or open it in a browser). No server, no build — the skills load
via `<script src>`, which works straight from `file://`.

Open the browser console to see the **dependency audit** run (`[AUDITORÍA] OK…`).

## Qué demuestra (y cómo mapea al spec)

- **Un archivo por habilidad.** The syllabus IS the file tree: `course.js` (the spine) +
  `skills/NN-*.js` (one per skill). Edit one skill without loading the rest. → spec §10 / Appendix.
- **Build-on-demand.** Only `01-mapa-del-siglo.js` is built. The other ~14 skills live in
  `course.js`'s `manifest` as **stubs** with their importance + prereqs, waiting for a human
  to review the judgement before we spend tokens. → spec "Judging importance".
- **Juicio de importancia.** Each skill is tagged `must-learn` / `black-box` / `context`.
  Short-lived caretaker presidents (e.g. the five of the 2001 crisis) are deliberately *not*
  drilled — that call is made explicit in the content and the manifest. → spec principle #6.
- **Cajas negras + profundidad por niveles.** `golpe-de-estado`, `peronismo`, etc. are
  introduced at **level 1** (one testable line) and marked to deepen later. The world wars
  and the Cold War are `black-box` skills. → spec §2d, §4b.
- **Anclas de memoria.** "La TV llegó en 1951 — con Perón de presidente." → spec §4b.
- **Modo self-assessed.** No string-matching. Each exercise: *ver respuesta → “La sabía” /
  “A repasar”.* The "a repasar" ratings feed the **Sesión de repaso** (mixed review). → spec §6, §7.
- **Auditoría ejecutable.** `COURSE.audit()` walks lessons and flags any concept used above
  its introduced depth — the vocabulary-gate, as running code. → spec §9.

## Estado de la construcción

- ✅ `mapa-del-siglo` — 3 lecciones (orientación: el ritmo del siglo, los golpes, a quién recordar).
- 🚧 Resto del syllabus — stubs en `course.js`. Revisar el juicio de importancia antes de generar.

## Nota de correctitud

History facts here are well-established (six coups: 1930/43/55/62/66/76; democracy uninterrupted
since 1983; TV in 1951; five presidents in the 2001 crisis). Per the spec's correctness
principle, any *new* skill's facts should get a verification pass before shipping.
