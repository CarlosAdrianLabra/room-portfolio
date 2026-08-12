import { intro, grupos } from "../data/work.js";
import { initAcordeon } from "./acordeon.js";

/* SVG hay que crearlo con createElementNS: si usas createElement,
   el navegador te da un elemento HTML llamado "svg" que no pinta nada. */
const crearFlecha = () => {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "grupo__flecha");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.8");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", "m6 9.5 6 5.5 6-5.5");
  svg.append(path);
  return svg;
};

/* Todo se construye con createElement, nunca con innerHTML.
   Aunque el contenido sea tuyo, la costumbre importa: el día que
   estos datos vengan de un CMS o de una API, ya está a salvo. */
const el = (tag, clase, texto) => {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto) nodo.textContent = texto;
  return nodo;
};

/* Convierte "un *equipo de 7* personas" en texto con el número
   en ámbar. Split con grupo de captura: los índices impares son
   lo que venía entre asteriscos. */
const conResaltado = (texto) => {
  const frag = document.createDocumentFragment();
  texto.split(/\*(.+?)\*/g).forEach((parte, i) => {
    if (!parte) return;
    frag.append(
      i % 2 === 1
        ? el("span", "resalte", parte)
        : document.createTextNode(parte),
    );
  });
  return frag;
};

const parrafo = (clase, texto) => {
  const p = el("p", clase);
  p.append(conResaltado(texto));
  return p;
};

const crearEtiquetas = (tags) => {
  const cont = el("div", "etiquetas");
  tags.forEach((t) => cont.append(el("span", "etiqueta", t)));
  return cont;
};

/* Tarjeta completa: los proyectos con destacado: true */
const crearProyecto = (p) => {
  const art = el("article", "proyecto");

  const fila = el("div", "proyecto__fila");
  fila.append(el("h4", "proyecto__nombre", p.nombre));
  if (p.estado) fila.append(el("span", "rol rol--estado", p.estado));
  else if (p.rol) fila.append(el("span", "rol", p.rol));
  art.append(fila);

  if (p.descripcion) art.append(parrafo("proyecto__texto", p.descripcion));
  if (p.tags?.length) art.append(crearEtiquetas(p.tags));

  if (p.enlace) {
    const a = el("a", "proyecto__enlace", p.enlace.texto);
    a.href = p.enlace.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    art.append(a);
  }

  return art;
};

/* Renglón compacto: los proyectos sin destacado */
const crearMini = (p) => {
  const fila = el("div", "mini");
  fila.append(el("span", "mini__nombre", p.nombre));
  if (p.rol) fila.append(el("span", "mini__rol", p.rol));
  return fila;
};

/* La línea de meta se calcula, no se escribe. Si la contaras a
   mano, el día que agregues un proyecto se te queda en 6. */
const textoMeta = (g) => {
  const n = g.proyectos.length;
  return [g.contexto, n === 1 ? "1 project" : `${n} projects`, g.stack]
    .filter(Boolean)
    .join(" · ");
};

const crearGrupo = (g, abierto) => {
  const det = el("details", "grupo");

  if (abierto) det.open = true;

  const sum = el("summary", "grupo__cabecera");
  const fila = el("div", "grupo__fila");
  fila.append(el("h3", "grupo__nombre", g.nombre));

  const derecha = el("div", "grupo__derecha");
  if (g.rol) fila.append(el("span", "rol", g.rol));
  derecha.append(crearFlecha());
  fila.append(derecha);
  sum.append(fila);
  sum.append(el("p", "grupo__meta", textoMeta(g)));
  if (g.resumen) sum.append(parrafo("grupo__resumen", g.resumen));
  det.append(sum);

  const cuerpo = el("div", "grupo__cuerpo");
  const destacados = g.proyectos.filter((p) => p.destacado);
  const otros = g.proyectos.filter((p) => !p.destacado);

  destacados.forEach((p) => cuerpo.append(crearProyecto(p)));

  if (otros.length) {
    cuerpo.append(el("p", "grupo__etiqueta", "Also delivered"));
    const lista = el("div", "minis");
    otros.forEach((p) => lista.append(crearMini(p)));
    cuerpo.append(lista);
  }

  det.append(cuerpo);
  return det;
};

/**
 * Dibuja el modal WORK a partir de src/data/work.js.
 * Llámala una vez al arrancar; el contenido es chico y estático.
 */
export function initWork() {
  const cont = document.querySelector("#work-lista");
  if (!cont) return;

  cont.textContent = "";
  if (intro) cont.append(parrafo("work__intro", intro));
  grupos.forEach((g, i) => cont.append(crearGrupo(g, i === 0)));

  initAcordeon(cont);
}
