/* =========================================================
   Contenido del modal ABOUT.
   Igual que work.js: este es el único archivo que tocas.

   Sobre los créditos: no son cortesía, son licencia. CC BY
   pide cuatro cosas — título de la obra, autor, fuente y
   licencia. Los cuatro campos de abajo son justo esos.
   Si te falta uno, ve por él antes de publicar.
   ========================================================= */

export const perfil = {
  avatar: "/images/boxelCarlos.webp",

  // BORRADOR — reescríbelo con tus palabras.
  parrafos: [
    "I'm Carlos Adrián. I spent four years at an agency taking software from the first client conversation to production. I started out building it and eventually led the team delivering it.",
    "The work I kept gravitating toward was integrations, connecting systems that weren't built to talk to each other, understanding what the client actually needed, and turning that into something that worked.",
    "Today I work across the stack: Node.js and AWS on the backend, React and TypeScript on the frontend, and 3D when it adds something meaningful, like this room.",
  ],

  datos: [
    { icono: "ubicacion", texto: "Mexico City" },
    { icono: "codigo", texto: "Software & Integrations" },
    { icono: "cubo", texto: "Interactive 3D" },
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
      nota: "TFT has been one of my favorite games for years. I even climbed high in the global rankings, but it's still the game I come back to whenever I want to relax.",
      imagen: "", // "/images/creditos/pengu.webp"
      obra: "Penguin - TFT",
      autor: "Rafael",
      fuente:
        "https://sketchfab.com/3d-models/penguin-tft-eecc4d381b264e2ca105ff90b3b1c6fd",
      licencia: "CC BY 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      nombre: "Poro",
      donde: "on the shelf",
      nota: "Video games have always been a big part of my life. They've brought me countless moments of laughter and good memories with friends and family. League of Legends was one of those games.",
      imagen: "",
      obra: "R Nguyen Poro Model",
      autor: "richarngu",
      fuente:
        "https://sketchfab.com/3d-models/r-nguyen-poro-model-98b58820de2e44568821df76367f688c",
      licencia: "CC BY 4.0",
      licenciaUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      nombre: "The volleyball",
      donde: "under the desk",
      nota: "Volleyball has been my favorite sport since I first played it in middle school. It's always been the sport I enjoy the most, and honestly, nothing beats the feeling of a clean spike.",
      imagen: "",
      obra: "Mikasa Volleyball",
      autor: "BlendKit",
      fuente:
        "https://www.blendkit.com/asset-gallery-detail/2d6cdde5-96b8-4286-af3c-3873108d4d2a/?query=category_subtree:model+mikasa+order:_score",
      licencia: "BlendKit Royalty Free",
      licenciaUrl: "https://www.blendkit.com/docs/licenses/",
    },
    {
      nombre: "Climbing Shoes",
      donde: "on top of the second desk",
      nota: "I know, a programmer who likes video games and climbing... cliché. But I love it. Every time I send a harder route, it feels a little like leveling up in a game.",
      imagen: "", // "/images/creditos/climbing-shoes.webp"
      obra: "Sport Climbing Shoes",
      autor: "BlendKit",
      fuente:
        "https://www.blendkit.com/asset-gallery-detail/43be4138-1708-4486-a3bb-ec6d1187e801/?query=climbing+shoe+order:_score",
      licencia: "BlendKit Royalty Free",
      licenciaUrl: "https://www.blendkit.com/docs/licenses/",
    },
    {
      nombre: "The track playing",
      donde: "playing throughout the room",
      nota: "I've always enjoyed working with music in the background. Lo-fi and chill tracks are some of my favorites when I want to focus and get into the zone.",
      imagen: "",
      obra: "Chillhop Jazz Restaurant",
      autor: "Alex Morgan",
      fuente:
        "https://pixabay.com/music/modern-jazz-chillhop-jazz-restaurant-552773/",
      licencia: "Pixabay Content License",
      licenciaUrl: "https://pixabay.com/service/license-summary/",
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
