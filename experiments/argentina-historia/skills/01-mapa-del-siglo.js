/* Habilidad 01 — El mapa del siglo (CONSTRUIDA)
 * Orientación: el ritmo del siglo, los golpes, y a quién conviene recordar.
 * Presenta como CAJAS NEGRAS (nivel 1) los grandes conceptos que se profundizan
 * después: golpe de Estado, democracia, dictadura, radicalismo, peronismo.
 * Modo de ejercicios: self-assessed (recall-then-rate). */

COURSE.registerSkill({
  id: "mapa-del-siglo",
  strand: "Panorama",
  title: "El mapa del siglo",
  blurb: "La forma de 100 años antes de los detalles",
  prereqs: [],
  importance: "must-learn",
  status: "built",

  // Nota de teoría de la habilidad entera (§4): se lee antes que las lecciones.
  theory:
    "Antes de meternos en fechas y nombres, conviene tener el mapa. El siglo XX " +
    "argentino tuvo un ritmo muy marcado: gobiernos elegidos por el voto que una y " +
    "otra vez fueron interrumpidos por los militares. Recién desde 1983 la democracia " +
    "no se cortó más. En estas tres lecciones vas a quedarte con la FORMA del siglo " +
    "(el ritmo, cuántas veces se cortó, y quiénes vale la pena recordar). Los detalles " +
    "de cada época vienen en las habilidades siguientes.",

  lessons: [
    {
      t: "Cien años de un vistazo",
      intro:
        "El siglo argentino tuvo un ritmo fácil de reconocer. Durante décadas, los " +
        "gobiernos elegidos por el voto de la gente —eso es la DEMOCRACIA— eran " +
        "interrumpidos por los militares, que tomaban el poder por la fuerza. A eso se " +
        "le llama un GOLPE DE ESTADO, y al gobierno militar que quedaba, una DICTADURA. " +
        "El patrón se repitió: voto → golpe → voto → golpe… Recién desde 1983 la " +
        "democracia no volvió a cortarse: es el período democrático más largo de nuestra " +
        "historia. Por ahora no memorices fechas; quedate con ese ritmo y con el año 1983.",
      worked:
        "Un ejemplo del ritmo: en 1928 asumió un presidente votado (Yrigoyen) y en 1930 " +
        "un golpe militar lo derrocó. 'Elegido y después derrocado' es el patrón que se " +
        "repite hasta que, en 1983, se corta para siempre.",
      introduces: [
        { concept: "democracia", level: 1 },
        { concept: "dictadura", level: 1 },
        { concept: "golpe-de-estado", level: 1 }
      ],
      uses: [],
      ex: [
        { q: "En una frase: ¿qué es un golpe de Estado?",
          a: "Cuando los militares (u otros) toman el poder por la fuerza, fuera de lo que dice la Constitución.",
          mode: "recall-then-rate" },
        { q: "¿Cómo se llama un gobierno elegido por el voto de la gente?",
          a: "Democracia.",
          mode: "recall-then-rate" },
        { q: "¿Desde qué año la democracia argentina no volvió a cortarse?",
          a: "Desde 1983.",
          mode: "recall-then-rate" },
        // Ejercicio que ataca el error común (§4): creer que la democracia fue continua.
        { q: "¿La democracia funcionó sin interrupciones durante todo el siglo XX?",
          a: "No. Durante buena parte del siglo XX los militares interrumpían con golpes a los gobiernos elegidos. La democracia sin cortes recién arranca en 1983.",
          mode: "recall-then-rate" }
      ]
    },

    {
      t: "Seis veces se cortó: los golpes militares",
      intro:
        "Ese 'se cortó' pasó seis veces en el siglo XX: hubo golpes de Estado militares " +
        "en 1930, 1943, 1955, 1962, 1966 y 1976. En cada uno, los militares sacaban al " +
        "gobierno elegido y ponían uno propio (una dictadura). Todavía no hace falta saber " +
        "qué pasó en cada golpe —eso viene después—; quedate con dos cosas: fueron SEIS, y " +
        "el último, el de 1976, fue el más grave y terminó en 1983. Un detalle de vocabulario: " +
        "al presidente que llega por el voto se le dice CONSTITUCIONAL, y al que ponen los " +
        "militares sin elección, DE FACTO.",
      worked:
        "Ejemplo: el golpe de 1976 sacó al gobierno elegido y puso una junta militar. Eso fue " +
        "una dictadura, con presidentes de facto, hasta 1983.",
      introduces: [
        { concept: "presidente-constitucional", level: 1 },
        { concept: "presidente-de-facto", level: 1 }
      ],
      uses: [
        { concept: "golpe-de-estado", level: 1 },
        { concept: "dictadura", level: 1 }
      ],
      ex: [
        { q: "¿Cuántos golpes de Estado militares hubo en el siglo XX?",
          a: "Seis: en 1930, 1943, 1955, 1962, 1966 y 1976.",
          mode: "recall-then-rate" },
        { q: "¿Cuál fue el último golpe y en qué año terminó esa dictadura?",
          a: "El de 1976; esa dictadura terminó en 1983.",
          mode: "recall-then-rate" },
        { q: "¿Qué diferencia hay entre un presidente 'constitucional' y uno 'de facto'?",
          a: "El constitucional llega por el voto de la gente; el de facto llega sin elección, puesto por un golpe militar.",
          mode: "recall-then-rate" },
        { q: "¿Todos los presidentes del siglo XX llegaron por elecciones?",
          a: "No. Varios fueron 'de facto': llegaron por golpes militares, no por el voto.",
          mode: "recall-then-rate" }
      ]
    },

    {
      t: "No todos importan igual (y dos nombres que vas a escuchar siempre)",
      intro:
        "En cien años hubo muchísimos presidentes, pero no todos pesan igual. Algunos " +
        "gobernaron años y cambiaron el país; otros duraron semanas. En la crisis de 2001, " +
        "por ejemplo, hubo cinco presidentes en menos de dos semanas: a esos no hace falta " +
        "recordarlos uno por uno. Este curso se concentra en un puñado de figuras y momentos " +
        "clave. Y hay dos grandes tradiciones políticas que vas a escuchar todo el tiempo: el " +
        "RADICALISMO (nace a principios del siglo con Yrigoyen y la UCR) y el PERONISMO (nace " +
        "en los años 40 con Perón). Por ahora alcanza con reconocer los nombres; más adelante " +
        "los vemos en profundidad.",
      worked:
        "Un ancla para ubicarte en el tiempo: la televisión llegó a la Argentina en 1951. Así " +
        "que si algo pasó 'cuando ya había TV', fue de 1951 en adelante. (Ese año gobernaba " +
        "Perón; lo vemos después.)",
      introduces: [
        { concept: "radicalismo", level: 1 },
        { concept: "peronismo", level: 1 }
      ],
      uses: [
        { concept: "democracia", level: 1 }
      ],
      ex: [
        { q: "¿Cuáles son las dos grandes tradiciones políticas que atraviesan el siglo?",
          a: "El radicalismo (Yrigoyen / UCR) y el peronismo (Perón).",
          mode: "recall-then-rate" },
        { q: "El peronismo, por ahora en una línea: ¿con quién nace y en qué década?",
          a: "Con Juan Domingo Perón, en los años 40.",
          mode: "recall-then-rate" },
        { q: "¿En qué año llegó la televisión a la Argentina?",
          a: "En 1951.",
          mode: "recall-then-rate" },
        { q: "En la crisis de 2001, ¿por qué no hace falta memorizar a cada presidente de esos días?",
          a: "Porque hubo cinco en menos de dos semanas: fueron gobiernos brevísimos. Conviene recordar el hecho (la crisis) más que cada nombre.",
          mode: "recall-then-rate" },
        { q: "¿Hay que aprenderse de memoria a todos los presidentes del siglo?",
          a: "No. Fueron muchísimos (varias decenas). La idea es concentrarse en un puñado decisivo y del resto tener sólo una idea general.",
          mode: "recall-then-rate" }
      ]
    }
  ]
});
