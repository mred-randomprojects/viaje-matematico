# Course Builder — a reusable spec for building a from-zero learning course

**What this is.** A self-contained brief you paste into an LLM agent to make it build a
comprehensive, zero-to-competent learning course for *one* topic. It encodes a pedagogy
that works (proven in `Tu Viaje Matemático`, this repo) and — crucially — a *procedure*
that forces the agent to do the one thing LLMs are worst at: **never use an idea before
it has been taught.**

It is topic-agnostic. It has been used / is intended for: school math, comfort with the
terminal, JavaScript/TypeScript primitives, and onboarding onto an internal work system.

---

## 0. Fill these in before you start

Copy this block, fill it, and keep it at the top of your working notes. Everything below
branches on these.

```
TOPIC:            <the subject, e.g. "the Unix terminal" / "how our billing service works">
LEARNER:          <who they are + what you may assume they already know — be specific>
BASELINE:         <the floor: the knowledge you are ALLOWED to assume. State it explicitly
                   so it can be challenged. e.g. "reads Spanish; basic arithmetic; has
                   never opened a terminal">
GOAL:             <what "done" looks like — the concrete thing they can do at the end>
VERIFICATION:     objective  |  self-assessed     (see §6 — pick one, it changes the build)
LANGUAGE:         <the language the COURSE CONTENT is written in — may differ from this spec>
DEPTH:            <survey | working-competence | deep>  (how far down the rabbit hole)
SOURCE:           established-knowledge  |  internal-material
                   (established = terminal, JS, math — use canonical knowledge.
                    internal = a proprietary system — you MUST read the real code/docs, §2b)
BUILD:            first-skill-only  |  full
                   (first-skill-only = fully build skill 1, STUB the rest for a human to
                    review before generating — saves tokens, forces importance to be vetted.
                    See "Judging importance".)
```

---

## 1. The non-negotiables (the deal-breakers)

If the course violates any of these, it has failed — no matter how good it looks.

1. **No forward references, ever — at the depth the lesson needs.** A term, symbol, or
   concept may only be *used* in a lesson at a depth it has already been *taught* to. If a
   learner meets a word they were never introduced to — or one leaned on at a deeper level
   than they've seen — the illusion of "I can learn this" breaks. Introducing a concept is
   **not a checkbox: it has levels** (black box → working → deep, see §2d). §9 audits this.
2. **Every answer is correct, and correctness is *established*, not asserted.** For
   `objective` topics, generate and check answers by *running code*, never by hand — your
   own mental arithmetic/parsing is not trusted. For `self-assessed` topics, every reveal
   answer must be independently confirmed against a source or a runnable check (§6).
3. **One new idea per lesson.** If a lesson introduces two genuinely new things, it is two
   lessons.
4. **Each bite is manageable.** A lesson = a short read + a worked example + a handful of
   exercises. If the theory note is longer than the learner can hold in working memory,
   split the concept across more lessons (§4).
5. **Hard ideas get *more* lessons, not denser ones.** Depth over breadth. When a concept
   is a known stumbling block, give it 2–4 lessons that approach it from different angles,
   not one heavy lesson.
6. **Judge importance — don't teach everything flat.** Not every fact deserves a lesson or a
   test. Actively decide, *relative to the GOAL*, what must be learned and drilled, what is
   context that only needs a black box, and what can be dropped. This judgement is part of
   the job, and it is the artifact a human reviews first (see "Judging importance").
7. **Complete the picture without overloading it.** When something is needed for context but
   isn't the point (a world event, an adjacent subsystem), give it a *black box*: a short,
   testable "here's the shape and why it matters," not the full detail (see §4b).

State the BASELINE assumptions out loud in the course intro so the learner (or reviewer)
can say "actually, I don't know that" — and then that becomes lesson zero.

---

## 2. Phase 1 — Map the terrain BEFORE writing a single lesson

Do **not** start writing lessons. First build the dependency map. This is the step LLMs
skip and it is why LLM-authored courses quietly assume things.

### 2a. Build the concept dependency graph

List every concept the learner must cross between BASELINE and GOAL. For each, record what
it **requires**. Produce an explicit table — this is a real deliverable, keep it:

```
concept                         requires (other concepts)
------------------------------- -------------------------------------------
place value                     counting, reading digits
subtraction with borrowing      subtraction (no borrow), place value
lowest common multiple (LCM)    multiples, prime factorisation
add fractions (unlike denom.)   equivalent fractions, LCM, add (like denom.)
```

For a terminal course the same shape holds: `cd` requires *the idea of a filesystem tree*
and *"current directory"*; `git rebase` requires `commit`, `branch`, and `HEAD`. If you
cannot name a concept's requirements, you do not understand it well enough to teach it.

### 2b. If SOURCE = internal-material: derive the graph from the real thing

You do not know a proprietary system from training data. Read the actual code, schemas,
docs, and configs. Extract the real concepts and *their* dependencies. **Flag every gap**
("I could not determine how X is triggered — a human must confirm") rather than inventing a
plausible-sounding answer. A confident wrong explanation of an internal system is worse
than an honest gap.

For a codebase specifically, **the GOAL sets the *grain* of importance.** "Trace a request
through the backend" means the **flow** is high-importance (each hop, what it does, why the
request moves on) and **exact identifiers are low-importance** — teach the 3–5 landmark
names (the entrypoint, the main handler) and black-box the rest, because names are cheap to
look up and the *shape* is what's hard to reconstruct. Derive importance from the real
artifacts, not vibes: follow the router → handler → service call graph; "important" ≈ on the
request path / high fan-in / named in the docs. This is a mechanical reading task an LLM does
*well* when pointed at the code and told the GOAL — far better than ranking importance from
memory.

### 2c. Topologically sort, and find the true zero

Order concepts so every concept comes after everything it requires. Then push the front of
the line *downward*: keep asking "what does the very first concept assume?" until you hit
the BASELINE floor. The floor is where the course starts. If sorting reveals a cycle, you
have mis-modelled something — two concepts don't truly depend on each other; one version of
one of them is more primitive. Fix the graph.

### 2d. Track concepts with *depth levels*, not a checkbox

A concept isn't simply "introduced or not." The same word carries different depths at
different points: `peronismo` might first appear as a one-line black box ("the movement
Perón founded"), then get a whole skill later. Track, per concept, the **deepest level it
has reached so far**:

```
concept          level 1 (black box)          level 2 (working)          level 3 (deep)
---------------- ---------------------------- -------------------------- ------------------------
golpe de estado  "the military seizes power"  who/why/how it unfolds     —
peronismo        "the movement Perón founded" its policies & base        historiographic debate
```

Each lesson declares what it **introduces** (concept + the level it raises it to) and what
it **uses** (concept + the level it relies on). This generalises principle #1: *a lesson may
only use a concept at a level ≤ the level already introduced.* Using `peronismo@2` before any
lesson has raised it past level 1 is a violation, exactly like using an undefined word. This
is what lets you deliberately teach shallow-first and deepen later — good teaching — without
losing the no-forward-reference guarantee. §9's audit is depth-aware for this reason.

---

## 3. Phase 2 — Chunk the graph into skills and lessons

- **Skill** = one novel idea, and everything that unlocks because of it. Skills are the
  nodes on the map; a skill is `mastered` when all its lessons are done, and it gates the
  skills that list it as a prerequisite.
- **Lesson** = one manageable step *inside* a skill. Many small lessons per skill.
- Group skills into **strands** (themes) so the map reads as a journey, not a list.
- **Sizing rules of thumb:** a lesson introduces ≤ 1 new concept and carries 6–10
  exercises. A theory note is a few short paragraphs, not a chapter. A skill is 3–8 lessons.
- **Redundancy is built in here, on purpose:** it is fine — good, even — for a later
  lesson's exercises to *re-use* earlier skills as the substrate (adding unlike-denominator
  fractions naturally re-drills LCM). Prefer exercises that quietly exercise old muscles
  while teaching the new one.
- **Keep the whole map visible from day one.** Show not-yet-built skills as locked stubs
  ("coming soon") so the learner sees the summit the whole climb. Build depth-first,
  bottom-up: fully finish and verify the foundational strand before the next.

---

## 4. Phase 3 — Write each lesson

Every lesson has the same skeleton. Fill all four parts.

1. **Theory note (the "read this first").** Plain language. Define every new term the moment
   it appears. **Concrete before abstract**: show a specific example with real numbers/inputs
   *before* stating the general rule. Highlight the one term or rule that matters. If you
   catch yourself using a word the learner hasn't met, stop — that word needs its own earlier
   lesson (or a one-line definition inline if it's trivially within BASELINE).
2. **A worked example (I-do).** Walk through *one* problem end to end, showing the steps and
   the reasoning, before asking the learner to do anything. Then optionally a *faded* one
   where you leave the last step to them. Scaffold, then remove the scaffold.
3. **Exercises (you-do).** 6–10, ramped easy→hard. Include:
   - a couple that are almost the worked example (build confidence),
   - a couple that vary the surface (transfer, not memorisation),
   - **at least one that targets the predictable mistake.** For each concept, predict the
     *common wrong answer* (e.g. "3/4 + 1/4 = 4/8", "`rm -r` vs `rm -rf`", `0.1 + 0.2 !== 0.3`)
     and write an exercise + feedback that confronts it head-on.
4. **Feedback that teaches.** "Not yet" is useless. Say *why*, or point at the step to
   reconsider. After a few tries, reveal the answer with its reasoning rather than leaving
   the learner stuck.

Also produce, once per skill: a **skill-level theory page** — one page that lays out the
whole idea of the skill before its lessons, for the learner who wants the theory before the
practice makes sense. (This is the "one-page theory note" that per-lesson intros don't cover.)

### 4b. Two techniques worth using everywhere

**Black boxes (progressive disclosure).** For context the learner needs but shouldn't fully
study, teach the *shape*, not the detail: "In the 1940s a huge war engulfed Europe — the
Second World War; what matters *here* is that it drove demand for Argentine exports and
shaped the politics that followed." Introduce it at level 1 and **test only the shape** ("why
did it matter *for Argentina*?"), never the detail you didn't teach. A black box can be
opened later — or never, if the GOAL doesn't need it.

**Memory anchors (co-occurrence).** Tie a new fact to a vivid, *true* landmark the learner
can hang it on: "television arrived in Argentina in 1951 — while Perón was president." These
"this happened *while* that" cross-links make facts stick far better than isolated dates.
The anchor must be fact-checked like any other answer — a memorable *wrong* anchor is worse
than none.

---

## 5. A concrete template to imitate

Imitate this shape. Two examples show the two verification modes.

**Objective mode (math) — answer is code-checkable:**
```json
{
  "skill": "Sumar fracciones (distinto denominador)",
  "theory": "Para sumar fracciones con distinto denominador primero las llevamos a un
             denominador común (el mcm). 1/2 + 1/3: el mcm de 2 y 3 es 6, así que
             1/2 = 3/6 y 1/3 = 2/6, y 3/6 + 2/6 = 5/6.",
  "worked": "1/4 + 1/6 → mcm(4,6)=12 → 3/12 + 2/12 = 5/12.",
  "exercises": [
    { "q": "1/2 + 1/3", "a": "5/6", "n": null, "check": "sympy: Rational(1,2)+Rational(1,3)" },
    { "q": "3/4 + 1/4 (¿por qué NO es 4/8?)", "a": "1  (sumás numeradores, el denom. queda)" }
  ]
}
```
Here `a` is the revealed answer and the `check` field records *how the answer was verified
by code*. Numeric answers can be typed and auto-checked; list/explanation answers use reveal.

**Self-assessed mode (terminal) — learner rates themselves:**
```json
{
  "skill": "Moverse por el filesystem",
  "theory": "El filesystem es un árbol de carpetas. Siempre estás 'parado' en una carpeta
             (el current directory). `pwd` te dice dónde estás; `cd` te mueve; `ls` lista
             lo que hay donde estás.",
  "worked": "Estás en /home/ana. `cd proyectos` → ahora estás en /home/ana/proyectos.
             `cd ..` sube uno → /home/ana.",
  "exercises": [
    { "q": "¿Qué comando muestra la carpeta en la que estás ahora?", "a": "pwd",
      "mode": "recall-then-rate" },
    { "q": "Estás en /a/b/c. Escribí el comando para ir a /a/b.", "a": "cd ..",
      "mode": "recall-then-rate" }
  ]
}
```
Here there is no string-matching. The learner thinks/commits to an answer, hits reveal,
compares, and marks **got it** or **needs review** — and that rating feeds §7.

---

## 6. Verification mode — pick ONE (it changes what you build)

**`objective`** — the answer is unambiguous and machine-checkable (math, exact outputs,
regex, config values).
- Generate answers *by running code* and store the check alongside the answer. Re-run a
  verification pass over every exercise before shipping. Never trust hand computation.
- UI: a typed-answer box that self-corrects; after N tries, reveal. Use plain reveal for
  answers that are lists/explanations rather than a single canonical value.

**`self-assessed`** — the answer is judgeable but not cleanly string-matchable (concepts,
"what does this command do", "why does this happen", explaining an internal system).
- No strict checker. Flow is **commit → reveal → self-rate (got it / needs review)**. Make
  the learner commit to an answer *before* revealing (say it aloud, type a note) to defeat
  the "oh yeah I knew that" illusion.
- You still owe correctness: every reveal answer must be confirmed against a real source or
  a runnable check (actually run the command / `node -e` the snippet), not vibes.

Decision rule: *Is there exactly one right answer a script could confirm?* Yes → objective.
No → self-assessed.

---

## 7. Redundancy & review (turn this on for retention)

Linear "do each lesson once" leaks. Add lightweight spaced retrieval — no fancy algorithm
needed:

- **Interleave.** Every few skills, insert a short mixed review pulling exercises from
  *earlier* skills. Mixing topics beats re-reading.
- **Resurface by self-rating (a Leitner box).** Track each item in a small number of boxes.
  A "got it" promotes an item to a longer interval; "needs review" (or a wrong objective
  answer) demotes it to resurface soon. This is the *same* got-it/needs-review signal from
  §6 doing double duty — the self-assessment IS the scheduler.
- **Keep it cheap.** 3–5 boxes, resurface the low boxes first. Do not build SM-2; the point
  is that a few things come back often enough to stick, not perfect scheduling.
- Redundancy ≠ repetition. Don't re-show the identical question; re-test the same *idea*
  with fresh surface.

---

## 8. Progression, mastery & motivation

- **Gate on prerequisites.** A skill unlocks only when every prerequisite skill is mastered.
  Show locked skills anyway (as stubs) so the whole path is visible.
- **Make "mastered" mean something.** Mastery = the lessons' exercises were actually
  engaged, not just a "mark done" click. For objective topics, consider requiring most
  exercises solved; for self-assessed, requiring each item rated at least once.
- **Let strong learners test out.** For the internal-system / adult-learner cases, offer a
  short diagnostic per skill so someone who already knows it can skip ahead instead of
  grinding. (Especially important when the learner isn't truly at zero everywhere.)
- **Small, visible wins.** Progress that fills in behind you, a summit per skill, the map
  showing what just unlocked. Keep celebrations light and frequent.

---

## 9. Phase 4 — The self-audit you MUST run before shipping

This is the mechanical pass that fixes the LLM dependency weakness. Do it explicitly; do
not eyeball it.

1. **Vocabulary-gate walk (depth-aware).** Go lesson by lesson, top to bottom, maintaining a
   map `reached: concept → deepest level introduced so far`. For each lesson, scan its theory
   + worked example + every exercise and check every concept it *uses* against `reached`:
   using a concept at/below its introduced level is fine; a concept **not in `reached` (and
   not in BASELINE), or used above its introduced level, is a violation** — move its
   introduction earlier, add the missing lesson, or lower the depth you lean on. Then fold in
   what this lesson introduces and continue. Report the violations you found and fixed.
2. **Prerequisite integrity.** For every skill, confirm each `prereq` actually exists, is
   reachable, and truly precedes it. No cycles. No skill depending on something later.
3. **Answer correctness pass.** Re-verify every objective answer by code; re-confirm every
   self-assessed reveal against its source. Report the method, not just "checked."
4. **Sizing pass.** Any theory note too long, any lesson with >1 new idea, any skill that's
   secretly two — split them.
5. **Misconception coverage.** Confirm each concept has at least one exercise aimed at its
   common mistake.
6. **Importance review.** Confirm the importance calls (what got a full lesson, what got a
   black box, what got dropped) are defensible against the GOAL — and that they're written
   down where a human can veto them *before* you spend tokens building the rest.

Only after this audit passes is the course shippable. Say plainly what the audit found —
if it found nothing, be suspicious you didn't really run it.

---

## Judging importance (and building on demand)

Two problems solved by one workflow.

**Importance is not absolute — it's relative to the GOAL.** A president who lasted three
months during a crisis is a footnote for "learn the shape of the century" but the whole point
for "study the 2001 collapse." So before building, produce a ranked **importance pass**:
- **must-learn** → gets its own lesson(s) and is drilled and reviewed;
- **black box** → gets one testable line (§4b), never the full detail;
- **drop** → not mentioned, or mentioned once without a test.
Write this down as an annotated syllabus a human can read in one sitting. Half-lasting
caretaker presidents, minor internal helpers, tangential world events — these are exactly
where an LLM over-teaches; make the "drop / black-box" calls explicit so they can be checked.

**Build on demand to save tokens and to calibrate judgement.** When `BUILD = first-skill-only`:
fully write skill 1, and leave every other skill as a **stub** — a real node on the map with
its title, prereqs, and importance note, but `status: "stub"` and no lessons yet. Ship that.
The human reviews the stub list (which *is* the importance judgement made visible), corrects
the calls, and only then do you spend tokens generating the rest. This turns "did the AI
judge importance well?" from an expensive gamble into a cheap, reviewable checkpoint.

---

## 10. Deliverable

- A working, self-contained course the learner can actually use — **split so the file tree
  mirrors the syllabus** (see the architecture below): a small viewer, a manifest, and one
  file per skill. This keeps edits local (touch one skill without loading the rest → smaller
  context) and makes the whole plan visible with `ls`.
- The **concept dependency graph with depth levels** (§2a, §2d) kept as data — it's the map
  that proves there are no hidden prerequisites, and it's what a human reviews first.
- The annotated **importance pass** (above): what's must-learn vs black box vs dropped.
- A short **audit report** (§9): violations found and fixed, and how answers were verified.

---

## Appendix — reference architecture (per-skill files)

A single giant HTML bloats editing context and forces you to load every skill to change one.
Split it: **a manifest + one data file per skill + a thin viewer.** The directory *is* the
syllabus. Use `<script src>` includes (not `fetch`) so it opens straight from `file://` with
no server.

```
course/
  index.html            # thin viewer: engine + <script src> per skill file
  course.js             # window.COURSE: meta, concept registry (with depth levels),
                        #   and the ordered skill manifest (id, title, strand, prereqs,
                        #   importance, status: "built" | "stub")
  skills/
    01-<slug>.js        # COURSE.registerSkill({...})  — one BUILT skill, its lessons
    02-<slug>.js        # stub or built; filename order = teaching order
    ...
```

```js
// A skill file registers one node:
COURSE.registerSkill({
  id, strand, title, blurb,
  prereqs: [ /* skill ids */ ],
  importance: "must-learn" | "black-box" | "context",
  status: "built" | "stub",
  theory: "the once-per-skill one-page theory note (§4)",
  lessons: [{
    t: "lesson title",
    intro: "short theory note shown above the exercises",
    worked: "one fully worked/oriented example before the learner does anything",
    introduces: [ { concept: "peronismo", level: 1 } ],   // depth-aware, §2d
    uses:       [ { concept: "golpe-de-estado", level: 1 } ],
    ex: [ /* exercises */ ]
  }]
})

// Exercise — objective mode (a script can confirm the answer):
{ q: "…", a: "revealed answer", n: 42 }   // n present → self-checking input, reveals after 3 tries

// Exercise — self-assessed mode (judgement, not string-matchable):
{ q: "…", a: "revealed answer", mode: "recall-then-rate" }
                        // commit → reveal → rate got-it / needs-review → feeds §7 review boxes

// mastery: a skill is mastered when its lessons are engaged; it unlocks only when all
// prereqs are mastered. Stubs stay on the map as "coming soon" so the summit is always visible.
```
