/* =========================================================
   Contenido del modal CONTACT.

   El punto verde es una promesa: el día que firmes contrato,
   cambia `disponible` a false y actualiza las líneas de
   `buscando`. Un "available" viejo miente por ti.
   ========================================================= */

export const disponibilidad = {
  disponible: true,
  texto: "Available for work",
  buscando: [
    "Fullstack roles — React / Node / TypeScript",
    "Technical lead / TPM positions",
    "Freelance builds, scoped and quoted directly",
  ],
};

export const correo = {
  direccion: "", // TODO: tu correo real
  asunto: "Hola Carlos", // pre-llena el subject del mailto
  lead: "The fastest way is email.",
};

export const enlaces = [
  {
    texto: "LinkedIn",
    url: "https://www.linkedin.com/in/carlos-labra-granados/",
  },
  {
    texto: "GitHub",
    url: "https://github.com/CarlosAdrianLabra",
  },
  // Descomenta cuando el PDF exista en /public/:
  // { texto: "CV (PDF)", url: "/cv-carlos-labra.pdf" },
];
