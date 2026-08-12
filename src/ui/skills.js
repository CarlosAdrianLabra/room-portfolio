import { intro, dominios, practicas } from "../data/skills.js";

const el = (tag, clase, texto) => {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto) nodo.textContent = texto;
  return nodo;
};

/* "produccion" reusa .rol tal cual (ámbar) y "construyendo" reusa
   .rol--estado (gris). Los dos ya existen en work.scss: una sola
   insignia para todo el sitio, definida en un solo lugar. */
const INSIGNIA = {
  produccion: { texto: "Production", clase: "rol" },
  construyendo: { texto: "Building", clase: "rol rol--estado" },
};

const crearDominio = (d) => {
  const bloque = el("div", "dominio");

  const fila = el("div", "dominio__fila");
  fila.append(el("h3", "dominio__nombre", d.nombre));

  const insignia = INSIGNIA[d.estado];
  if (insignia) fila.append(el("span", insignia.clase, insignia.texto));
  bloque.append(fila);

  if (d.evidencia) bloque.append(el("p", "dominio__evidencia", d.evidencia));

  if (d.tecnologias?.length) {
    const tags = el("div", "etiquetas");
    d.tecnologias.forEach((t) => tags.append(el("span", "etiqueta", t)));
    bloque.append(tags);
  }

  if (d.nota) bloque.append(el("p", "dominio__nota", d.nota));

  return bloque;
};

const crearPracticas = () => {
  const seccion = el("section", "practicas");
  seccion.append(el("h3", "practicas__titulo", practicas.titulo));

  const lista = el("ul", "practicas__lista");
  practicas.puntos.forEach((p) => lista.append(el("li", null, p)));
  seccion.append(lista);

  return seccion;
};

/**
 * Dibuja el modal SKILLS a partir de src/data/skills.js.
 */
export function initSkills() {
  const cont = document.querySelector("#skills-cuerpo");
  if (!cont) return;

  cont.textContent = "";
  if (intro) cont.append(el("p", "skills__intro", intro));
  dominios.forEach((d) => cont.append(crearDominio(d)));
  if (practicas?.puntos?.length) cont.append(crearPracticas());
}
