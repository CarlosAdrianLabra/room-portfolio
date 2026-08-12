import { perfil, creditos, inspiracion } from "../data/about.js";

const NS = "http://www.w3.org/2000/svg";

/* Trazos de los iconos de las fichas. Para agregar uno, mete su
   path aquí y usa la llave en el campo `icono` de about.js. */
const ICONOS = {
  ubicacion: [
    "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z",
    "M12 10m-2.6 0a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0",
  ],
  codigo: [
    "m9 8.5-4.5 3.7L9 15.9",
    "m15 8.5 4.5 3.7L15 15.9",
    "m13.4 5.8-2.8 12.6",
  ],
  trabajo: [
    "M3 7.5h18v12.5H3z",
    "M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5",
    "M3 12.5h18",
  ],
  cubo: [
    "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
    "m3.3 7 8.7 5 8.7-5",
    "M12 22V12",
  ],
};

const el = (tag, clase, texto) => {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto) nodo.textContent = texto;
  return nodo;
};

const crearIcono = (llave) => {
  const trazos = ICONOS[llave];
  if (!trazos) return null;

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.6");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");

  trazos.forEach((d) => {
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    svg.append(path);
  });
  return svg;
};

const enlace = (texto, url, clase) => {
  const a = el("a", clase, texto);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
};

/* ---------------- Presentación ---------------- */

const crearPerfil = () => {
  const bloque = el("div", "perfil");

  if (perfil.avatar) {
    const img = el("img", "perfil__foto");
    img.src = perfil.avatar;
    img.alt = "";
    img.loading = "lazy";
    bloque.append(img);
  }

  const texto = el("div", "perfil__texto");
  perfil.parrafos.forEach((p) => texto.append(el("p", null, p)));
  bloque.append(texto);

  return bloque;
};

const crearDatos = () => {
  const cont = el("div", "datos");
  perfil.datos.forEach((d) => {
    const ficha = el("span", "dato");
    const icono = crearIcono(d.icono);
    if (icono) ficha.append(icono);
    ficha.append(el("span", null, d.texto));
    cont.append(ficha);
  });
  return cont;
};

/* ---------------- Créditos ---------------- */

/* Arma la línea de atribución con lo que haya. Si falta el autor
   no inventamos nada: se ve el aviso y te enteras de que falta. */
const crearAtribucion = (pieza) => {
  const linea = el("p", "pieza__credito");

  if (!pieza.autor) {
    linea.classList.add("pieza__credito--falta");
    linea.textContent = "falta la atribución";
    return linea;
  }

  linea.append(
    document.createTextNode(pieza.obra ? `${pieza.obra} by ` : "by "),
  );
  linea.append(
    pieza.fuente
      ? enlace(pieza.autor, pieza.fuente, "pieza__enlace")
      : document.createTextNode(pieza.autor),
  );

  if (pieza.licencia) {
    linea.append(document.createTextNode(" · "));
    linea.append(
      pieza.licenciaUrl
        ? enlace(pieza.licencia, pieza.licenciaUrl, "pieza__enlace")
        : document.createTextNode(pieza.licencia),
    );
  }

  return linea;
};

const crearPieza = (pieza) => {
  const fila = el("div", "pieza");

  if (pieza.imagen) {
    const img = el("img", "pieza__miniatura");
    img.src = pieza.imagen;
    img.alt = "";
    img.loading = "lazy";
    fila.append(img);
  }

  const cuerpo = el("div", "pieza__cuerpo");

  const nombre = el("p", "pieza__nombre", pieza.nombre);
  if (pieza.donde)
    nombre.append(el("span", "pieza__donde", ` — ${pieza.donde}`));
  cuerpo.append(nombre);

  if (pieza.nota) cuerpo.append(el("p", "pieza__nota", pieza.nota));
  cuerpo.append(crearAtribucion(pieza));

  fila.append(cuerpo);
  return fila;
};

const crearCreditos = () => {
  const seccion = el("section", "creditos");
  seccion.append(el("h3", "creditos__titulo", creditos.titulo));
  if (creditos.intro)
    seccion.append(el("p", "creditos__intro", creditos.intro));

  const lista = el("div", "creditos__lista");
  creditos.piezas.forEach((p) => lista.append(crearPieza(p)));
  seccion.append(lista);

  if (inspiracion?.autor) {
    const nota = el("p", "creditos__inspiracion");
    nota.append(document.createTextNode(`${inspiracion.texto} `));
    nota.append(
      inspiracion.url
        ? enlace(inspiracion.autor, inspiracion.url, "pieza__enlace")
        : document.createTextNode(inspiracion.autor),
    );
    nota.append(document.createTextNode("."));
    seccion.append(nota);
  }

  return seccion;
};

/**
 * Dibuja el modal ABOUT a partir de src/data/about.js.
 */
export function initAbout() {
  const cont = document.querySelector("#about-cuerpo");
  if (!cont) return;

  cont.textContent = "";
  cont.append(crearPerfil());
  cont.append(crearDatos());
  cont.append(crearCreditos());
}
