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
  "Four years shipping to real users on a visual platform, now rebuilding that same skill set in code.";

export const dominios = [
  {
    nombre: "Frontend",
    estado: "construyendo",
    evidencia: "Sentinel · this site",
    nota: "Where the last year of deliberate practice went.",
    tecnologias: ["React", "Next.js", "TypeScript", "SCSS"],
  },
  {
    nombre: "Backend & data",
    estado: "construyendo",
    evidencia: "Sentinel",
    nota: "Schema design and type-safe APIs, built solo.",
    tecnologias: ["Node.js", "Express", "Prisma", "MongoDB"],
  },
  {
    nombre: "Cloud & integrations",
    estado: "produccion",
    evidencia: "4 years · PrepaNáhuac · EC Rubio",
    nota: "Wiring third-party systems together, with logs and alerts to prove it.",
    tecnologias: [
      "AWS Lambda",
      "API Gateway",
      "CloudWatch",
      "MS Dynamics",
      "Stripe",
      "SendGrid",
      "Webhooks",
    ],
  },
  {
    nombre: "3D & interactive",
    estado: "construyendo",
    evidencia: "This site",
    nota: "Newest addition. You're looking at the proof.",
    tecnologias: ["Three.js", "Blender", "GSAP"],
  },
  {
    nombre: "No-code",
    estado: "produccion",
    evidencia: "4 years · 8 apps · hundreds of daily users",
    nota: "Senior level. Where I learned to ship on a deadline.",
    tecnologias: ["Bubble.io"],
  },
];

/* Lo que no es tecnología. Sostiene tu pista de Tech Lead / TPM,
   que en Work solo se ve implícito. Si no la quieres, borra este
   bloque completo: el renderizador la omite si no existe. */
export const practicas = {
  titulo: "How I work",
  puntos: [
    "Turning business requirements into specs a team can estimate",
    "Setting timelines and defending them",
    "Running client calls without a manager in the room",
    "Reviewing other people's work before it ships",
  ],
};
