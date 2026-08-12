/* =========================================================
   Contenido del modal SKILLS.
   Mismo trato que work.js y about.js: aquí y nada más aquí.

   `estado` solo acepta dos valores:
     "produccion" -> insignia ámbar, para lo que ya corrió con
                     usuarios reales
     "construyendo" -> insignia gris, para lo que estás armando

   La regla para no engañarte solo: si no puedes nombrar un
   proyecto en `evidencia`, no es producción.
   ========================================================= */

export const intro =
  "Five years shipping to real users on a visual platform, now rebuilding that same skill set in code.";

export const dominios = [
  {
    nombre: "Frontend",
    estado: "produccion",
    evidencia: "Sentinel · this site",
    nota: "Where the last year of deliberate practice went.",
    tecnologias: ["React", "Next.js", "TypeScript", "SCSS", "HTML", "CSS"],
  },
  {
    nombre: "Backend & data",
    estado: "produccion",
    evidencia: "Sentinel",
    nota: "Schema design and type safe APIs, built solo.",
    tecnologias: ["Node.js", "Express", "Prisma", "MongoDB"],
  },
  {
    nombre: "Cloud & integrations",
    estado: "produccion",
    evidencia: "PrepaNáhuac · Dentalia",
    nota: "Wiring third party systems together, with logs and alerts to prove it.",
    tecnologias: ["AWS Lambda", "API Gateway", "CloudWatch", "Webhooks"],
  },
  {
    nombre: "3D & interactive",
    estado: "produccion",
    evidencia: "This site",
    nota: "Newest addition. You're looking at the proof.",
    tecnologias: ["Three.js", "GSAP"],
  },
  {
    nombre: "AI",
    estado: "produccion",
    evidencia: "Sentinel · this site",
    nota: "Models running locally, directed and reviewed like any other work I'd",
    tecnologias: ["Ollama", "qwen3-coder", "OpenCode", "ClaudeCode"],
  },
  {
    nombre: "No-code",
    estado: "produccion",
    evidencia: "9 apps · hundreds of daily users",
    nota: "Senior level. Where I learned to ship on a deadline.",
    tecnologias: ["Bubble.io"],
  },
  {
    nombre: "Tooling",

    tecnologias: ["Git", "Github", "VS Code", "Postman", "Figma", "Blender"],
  },
];

export const practicas = {
  titulo: "How I work",
  puntos: [
    "Turning business requirements into specs a team can estimate",
    "Running client calls",
    "Setting timelines and defending them",
    "Reviewing work before it ships, mine and other people's",
  ],
};
