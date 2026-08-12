/* =========================================================
   Contenido del modal WORK.
   Este es el ÚNICO archivo que tocas para agregar o editar
   proyectos. Nada de HTML.

   Cómo agregar un proyecto:
     mételo al arreglo `proyectos` del grupo que le toca.

   Cómo agregar un grupo (cuando entres a un trabajo nuevo):
     pega un objeto nuevo hasta arriba de `grupos`.
     El primero de la lista es el que abre por default.

   Truco de formato: lo que pongas entre *asteriscos* se
   pinta en ámbar. Úsalo solo para números y resultados —
   si resaltas todo, no resaltas nada.
   ========================================================= */

export const intro =
  "Four years building and leading client delivery — now building the same systems in code.";

export const grupos = [
  {
    nombre: "Konfront",
    rol: "Tech Lead",
    contexto: "Agency · 4 years",
    stack: "Bubble.io + AWS",
    resumen:
      "Grew from builder to leading a *team of 7*. On every project I set the timelines and ran the client conversation directly.",
    proyectos: [
      {
        nombre: "Dentalia",
        rol: "Supervision",
        destacado: true,
        descripcion: "", // TODO: qué era el producto y qué resolvió
        tags: ["Scoping", "Team delivery"],
      },
      {
        nombre: "PrepaNáhuac",
        rol: "Build & Integrate",
        destacado: true,
        descripcion:
          "My first app. Built and deployed an API bridging the platform with Microsoft Dynamics.",
        tags: ["Microsoft Dynamics", "AWS Lambda", "API Gateway", "CloudWatch"],
      },
      {
        nombre: "Mood Fork Food",
        rol: "Build & Lead",
        destacado: true,
        descripcion:
          "Storefront for a creator to sell her food line, plus an interactive map of her recommendations.",
        tags: ["E-commerce", "Interactive map"],
      },
      { nombre: "Xcape", rol: "Build & supervision" },
      { nombre: "Inventa", rol: "Supervision" },
      { nombre: "Primero Seguros", rol: "Build & client lead" },
    ],
  },

  {
    nombre: "Freelance",
    rol: "Independent",
    contexto: "Direct clients",
    stack: "Bubble.io · Next.js · AWS",
    resumen:
      "Scoped, quoted and delivered directly with clients — no agency in between.",
    proyectos: [
      {
        nombre: "EC Rubio Intranet",
        rol: "Build & Ops",
        destacado: true,
        descripcion:
          "PWA intranet for a law firm — *500 users across 8 offices*. Fixed a firm-wide email outage and migrated 197 employee records.",
        tags: ["Bubble.io", "SendGrid", "DNS / SPF", "PWA"],
      },
      {
        nombre: "Sentinel",
        rol: "Solo Fullstack",
        destacado: true,
        descripcion:
          "Inventory management system for Abryl, built end to end — from schema to interface.",
        tags: ["Next.js", "TypeScript", "Prisma"],
      },
    ],
  },

  {
    nombre: "Personal",
    rol: "Solo Build",
    contexto: "Side projects",
    stack: "Three.js · Android",
    resumen:
      "Where the fullstack transition actually happens — written in code, no platform underneath.",
    proyectos: [
      {
        nombre: "This room",
        rol: "Solo Build",
        destacado: true,
        descripcion:
          "The site you're in. Modeled in Blender, baked to four texture sets, navigated by raycasting.",
        tags: ["Three.js", "Blender", "GSAP", "Vite"],
        enlace: {
          texto: "View repo",
          url: "https://github.com/CarlosAdrianLabra/room-portfolio",
        },
      },
      {
        nombre: "Gastos",
        estado: "In progress", // reemplaza al rol mientras no esté listo
        destacado: true,
        descripcion:
          "Android app that logs card payments by reading bank notifications.",
      },
    ],
  },
];
