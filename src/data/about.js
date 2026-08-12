/* =========================================================
   Contenido del modal ABOUT.
   Igual que work.js: este es el único archivo que tocas.

   Sobre los créditos: no son cortesía, son licencia. CC BY
   pide cuatro cosas — título de la obra, autor, fuente y
   licencia. Los cuatro campos de abajo son justo esos.
   Si te falta uno, ve por él antes de publicar.
   ========================================================= */

export const perfil = {
  avatar: "/images/avatar.webp",

  // BORRADOR — reescríbelo con tus palabras.
  parrafos: [
    "I'm Carlos Adrián. I spent four years at an agency turning business problems into shipped software — first building it, then leading the team that did.",
    "Now I'm doing the same thing closer to the metal: conventional code, my own architecture decisions, no platform in between.",
  ],

  datos: [
    { icono: "ubicacion", texto: "Mexico City" },
    { icono: "codigo", texto: "Fullstack & 3D web" },
    { icono: "trabajo", texto: "Open to work" },
  ],
};

export const creditos = {
  titulo: "What's in the room",
  intro: "Everything here is either mine or someone else's good work.",

  /* imagen es opcional: un render chico del modelo, 96×96.
     Si no la pones, la fila se ve bien igual. */
  piezas: [
    {
      nombre: "Pengu",
      donde: "on the shelf",
      nota: "My avatar for as long as I've had one.",
      imagen: "", // "/images/creditos/pengu.webp"
      obra: "", // título exacto del modelo en la fuente
      autor: "",
      fuente: "",
      licencia: "",
      licenciaUrl: "",
    },
    {
      nombre: "Poro",
      donde: "by the monitor",
      nota: "", // TODO
      imagen: "",
      obra: "",
      autor: "",
      fuente: "",
      licencia: "",
      licenciaUrl: "",
    },
    {
      nombre: "The volleyball",
      donde: "under the desk",
      nota: "", // TODO — que sea concreto: cuánto llevas jugando, qué días
      imagen: "",
      obra: "",
      autor: "",
      fuente: "",
      licencia: "",
      licenciaUrl: "",
    },
    {
      nombre: "The cats",
      donde: "around the floor",
      nota: "", // TODO
      imagen: "",
      obra: "",
      autor: "",
      fuente: "",
      licencia: "",
      licenciaUrl: "",
    },
    {
      nombre: "The track playing",
      donde: "",
      nota: "Something to build to.",
      imagen: "",
      obra: "",
      autor: "",
      fuente: "",
      licencia: "",
      licenciaUrl: "",
    },
  ],
};

/* Esto NO es una licencia, es un reconocimiento. Por eso va
   aparte y con otras palabras: la inspiración fue suya, el
   modelado, el shader del atardecer y la carga son tuyos. */
export const inspiracion = {
  texto: "The idea of a room you can walk into came from",
  autor: "Andrew Woan's room portfolio",
  url: "https://github.com/andrewwoan/sooahkimsfolio",
};
