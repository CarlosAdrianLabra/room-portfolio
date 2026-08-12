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
    "Full-time, contract, or something you're still shaping. Tell me what you have in mind.",
  ],
};

export const correo = {
  direccion: "carlosadrianlabragranados@gmail.com|",
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
  { texto: "CV (PDF)", url: "/CV/Carlos_Labra_Resume_Solutions_Engineer.pdf" },
];
