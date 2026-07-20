/* =============================================================================
 * Curso: Argentina — los últimos 100 años
 * Manifiesto + registro de conceptos (con niveles de profundidad).
 *
 * Este archivo es la "columna vertebral": la lista ordenada de habilidades (el
 * syllabus entero, visible de un vistazo), el registro de conceptos con sus
 * niveles, y el motor mínimo (registerSkill + audit). Cada habilidad CONSTRUIDA
 * vive en su propio archivo skills/NN-*.js — así el árbol de carpetas ES el
 * syllabus y se puede editar una sin tocar las demás.
 *
 * VERIFICATION: self-assessed  (historia = juicio/recuerdo, no chequeo automático)
 * BUILD: first-skill-only      (sólo la habilidad 01 está construida; el resto son stubs)
 * ========================================================================== */

window.COURSE = {
  meta: {
    title: "Argentina: los últimos 100 años",
    lang: "es-AR",
    goal: "Entender la forma del siglo: quiénes gobernaron y cuándo (los que " +
          "importan), el ritmo de democracia y golpes, y por qué pasó lo que pasó. " +
          "No memorizar cada fecha ni cada presidente.",
    baseline: "Sabe leer en español. Sabe qué es 'votar' y qué es 'los militares'. " +
              "No se asume ningún conocimiento previo de historia argentina."
  },

  /* --- Registro de conceptos, con niveles de profundidad (§2d del spec) ---------
   * Cada concepto puede introducirse shallow (nivel 1 = "caja negra") y
   * profundizarse después. `maxLevel` es hasta dónde LLEGA el curso completo;
   * qué lección lo sube a cada nivel se declara en los `introduces` de cada
   * lección. La auditoría (abajo) verifica que ninguna lección USE un concepto
   * a un nivel más profundo del que ya fue introducido. */
  concepts: {
    "democracia":              { gloss: "gobierno elegido por el voto de la gente", maxLevel: 2 },
    "dictadura":               { gloss: "gobierno no elegido que concentra el poder (acá: gobiernos militares)", maxLevel: 2 },
    "golpe-de-estado":         { gloss: "cuando los militares toman el poder por la fuerza, fuera de la Constitución", maxLevel: 2 },
    "presidente-constitucional":{ gloss: "presidente que llega por el voto", maxLevel: 1 },
    "presidente-de-facto":     { gloss: "presidente puesto por un golpe, sin elección", maxLevel: 1 },
    "radicalismo":             { gloss: "una de las dos grandes tradiciones políticas; nace con Yrigoyen y la UCR", maxLevel: 3 },
    "peronismo":               { gloss: "la otra gran tradición; nace en los años 40 con Perón", maxLevel: 3 }
  },

  /* --- Syllabus: TODO el plan, ordenado, con juicio de importancia y estado ----
   * importance: "must-learn" (lección propia, se practica y se repasa)
   *           | "black-box"  (sólo la forma, una línea que se testea, §4b)
   *           | "context"    (medio: se cuenta, se testea poco)
   * status:    "built" | "stub"  (stub = está en el mapa pero todavía sin lecciones)
   * Sólo 01 está "built". El resto son stubs a la espera de revisión humana
   * antes de gastar tokens generándolos. */
  manifest: [
    { id: "mapa-del-siglo",         strand: "Panorama",      title: "El mapa del siglo",                       prereqs: [],                                    importance: "must-learn", status: "built" },
    { id: "yrigoyen-voto",          strand: "1916–1930",     title: "Yrigoyen y el voto secreto",              prereqs: ["mapa-del-siglo"],                    importance: "must-learn", status: "stub" },
    { id: "decada-infame",          strand: "1930–1943",     title: "La Década Infame y el primer golpe",      prereqs: ["yrigoyen-voto"],                     importance: "must-learn", status: "stub" },
    { id: "ctx-guerras-mundiales",  strand: "Contexto",      title: "Las guerras mundiales",      prereqs: ["mapa-del-siglo"],                    importance: "black-box",  status: "stub" },
    { id: "primer-peronismo",       strand: "1946–1955",     title: "El primer peronismo: Perón y Evita",      prereqs: ["decada-infame","ctx-guerras-mundiales"], importance: "must-learn", status: "stub" },
    { id: "proscripcion",           strand: "1955–1973",     title: "Proscripción e inestabilidad",            prereqs: ["primer-peronismo"],                  importance: "context",    status: "stub" },
    { id: "regreso-peron-isabel",   strand: "1973–1976",     title: "El regreso de Perón e Isabel",            prereqs: ["proscripcion"],                      importance: "must-learn", status: "stub" },
    { id: "ctx-guerra-fria",        strand: "Contexto",      title: "La Guerra Fría",             prereqs: ["mapa-del-siglo"],                    importance: "black-box",  status: "stub" },
    { id: "ultima-dictadura",       strand: "1976–1983",     title: "La última dictadura (el Proceso)",        prereqs: ["regreso-peron-isabel","ctx-guerra-fria"], importance: "must-learn", status: "stub" },
    { id: "malvinas",               strand: "1982",          title: "Malvinas",                                prereqs: ["ultima-dictadura"],                  importance: "must-learn", status: "stub" },
    { id: "alfonsin",               strand: "1983–1989",     title: "Alfonsín y el regreso de la democracia",  prereqs: ["ultima-dictadura","malvinas"],       importance: "must-learn", status: "stub" },
    { id: "menem-convertibilidad",  strand: "1989–1999",     title: "Menem y la convertibilidad",              prereqs: ["alfonsin"],                          importance: "must-learn", status: "stub" },
    { id: "crisis-2001",            strand: "1999–2002",     title: "La crisis de 2001",                       prereqs: ["menem-convertibilidad"],             importance: "must-learn", status: "stub" },
    { id: "kirchnerismo",           strand: "2003–2015",     title: "Los Kirchner",                            prereqs: ["crisis-2001"],                       importance: "must-learn", status: "stub" },
    { id: "actualidad",             strand: "2015–hoy",      title: "Macri, Fernández, Milei",                 prereqs: ["kirchnerismo"],                      importance: "must-learn", status: "stub" }
  ],

  skills: {},  // se llena con registerSkill() desde skills/NN-*.js

  registerSkill: function (skill) { this.skills[skill.id] = skill; },

  /* --- Auditoría ejecutable de la "puerta de vocabulario" (§9 del spec) --------
   * Recorre las habilidades construidas en orden del manifiesto y, dentro de
   * cada una, sus lecciones en orden; verifica que ninguna USE un concepto a un
   * nivel mayor del ya introducido. Reporta violaciones en la consola. Esto es
   * la parte que un LLM no puede sostener en la cabeza pero sí puede chequear. */
  audit: function () {
    var reached = {};                 // concepto -> nivel máximo introducido hasta ahora
    var violations = [];
    var self = this;
    this.manifest.forEach(function (m) {
      var sk = self.skills[m.id];
      if (!sk || m.status !== "built") return;
      (sk.lessons || []).forEach(function (lesson, li) {
        (lesson.uses || []).forEach(function (u) {
          var have = reached[u.concept];
          if (have === undefined || have < u.level) {
            violations.push(m.id + " / lección " + (li + 1) + ' usa "' + u.concept +
              '"@' + u.level + " pero sólo está introducido a nivel " + (have === undefined ? "0 (nunca)" : have));
          }
        });
        (lesson.introduces || []).forEach(function (ip) {
          if (reached[ip.concept] === undefined || reached[ip.concept] < ip.level) reached[ip.concept] = ip.level;
        });
      });
    });
    if (violations.length) { console.warn("[AUDITORÍA] Violaciones de dependencia:", violations); }
    else { console.log("[AUDITORÍA] OK: ninguna lección usa un concepto antes de introducirlo."); }
    return violations;
  }
};
