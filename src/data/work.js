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

export const intro = "Five years building and leading client delivery.";

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
        nombre: "Primero Seguros",
        rol: "BUILD & CLIENT LEAD",
        destacado: true,
        descripcion:
          "Car insurance quoting platform. SOAP calls into the client's CRM, installment payments, and real-time fraud checks. I built it and ran the client relationship myself.", // TODO: qué era el producto y qué resolvió
        tags: ["SOAP", "CRM integration", "Payments", "AWS"],
      },
      {
        nombre: "PrepaNáhuac Leads Dashboard",
        rol: "Build & Integrate",
        destacado: true,
        descripcion:
          "My first app. A dashboard for tracking applicant leads, with the endpoint I built to sync them into Microsoft Dynamics.",
        tags: ["Microsoft Dynamics", "AWS Lambda", "API Gateway", "CloudWatch"],
      },
      {
        nombre: "Mood Fork Food",
        rol: "Build & Lead",
        destacado: true,
        descripcion:
          "Restaurant reviews and recommendations with a storefront for products and experiences. I built v1 end to end and stayed the client's point of contact after.",
        tags: ["E-commerce", "Interactive map"],
      },
      { nombre: "Xcape", rol: "Lead & build" },
      { nombre: "Laboratorio Silanes", rol: "Lead & build" },
      { nombre: "Inventa", rol: "Lead" },
      { nombre: "Encuestas 360", rol: "Lead" },
      { nombre: "J4VO", rol: "Lead & build" },
      { nombre: "Dentalia", rol: "Lead" },
    ],
  },

  {
    nombre: "Freelance",
    rol: "Independent",
    contexto: "Direct clients",
    stack: "Bubble.io · Next.js · AWS",
    resumen: "Scoped, quoted and delivered directly with clients.",
    proyectos: [
      {
        nombre: "EC Rubio Intranet",
        rol: "Build & Ops",
        destacado: true,
        descripcion:
          "PWA intranet for a law firm, *500 users across 8 offices*. Fixed a firm-wide email outage and migrated their employee records.",
        tags: ["Bubble.io", "SendGrid", "DNS / SPF", "PWA"],
      },
      {
        nombre: "Sentinel",
        rol: "Solo Fullstack",
        destacado: true,
        descripcion:
          "Inventory management system for Abryl, built end to end, from schema to interface.",
        tags: ["Next.js", "TypeScript", "Node.js", "Prisma", "MongoDB"],
      },
    ],
  },

  {
    nombre: "Personal",
    rol: "Solo Build",
    contexto: "Side projects",
    stack: "Three.js · Android",
    resumen:
      "Everything I don't know how to do yet ends up here. You're inside the most recent one.",
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
        estado: "In progress",
        destacado: true,
        descripcion:
          "Android app that logs card payments by reading bank notifications.",
      },
    ],
  },
];
