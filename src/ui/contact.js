import { disponibilidad, correo, enlaces } from "../data/contact.js";

const el = (tag, clase, texto) => {
  const nodo = document.createElement(tag);
  if (clase) nodo.className = clase;
  if (texto) nodo.textContent = texto;
  return nodo;
};

const crearDisponibilidad = () => {
  if (!disponibilidad.disponible) return null;

  const bloque = el("div", "contacto__disponible");
  bloque.append(el("span", "contacto__punto"));
  bloque.append(el("span", "contacto__estado", disponibilidad.texto));

  const cont = el("div");
  cont.append(bloque);

  if (disponibilidad.buscando?.length) {
    cont.append(el("p", "contacto__sub", "Currently interviewing for:"));
    const lista = el("ul", "contacto__busco");
    disponibilidad.buscando.forEach((b) => lista.append(el("li", null, b)));
    cont.append(lista);
  }

  return cont;
};

const crearCorreo = () => {
  const bloque = el("div");
  bloque.append(el("p", "contacto__lead", correo.lead));

  const caja = el("div", "contacto__correo");

  const campo = el("input");
  campo.value = correo.direccion || "correo pendiente en contact.js";
  campo.readOnly = true;
  campo.setAttribute("aria-label", "Email address");
  // Un tap selecciona todo: en celular, donde no hay Ctrl+C
  // cómodo, esto es la mitad del trabajo.
  campo.addEventListener("focus", () => campo.select());
  caja.append(campo);

  const boton = el("button", "contacto__copiar", "Copy");
  boton.type = "button";
  boton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(correo.direccion);
      boton.textContent = "Copied!";
      boton.classList.add("contacto__copiar--ok");
    } catch {
      // Sin permiso de portapapeles (http, iframe, navegador viejo):
      // seleccionamos el campo para que copien a mano.
      campo.focus();
      boton.textContent = "Press Ctrl+C";
    }
    setTimeout(() => {
      boton.textContent = "Copy";
      boton.classList.remove("contacto__copiar--ok");
    }, 1600);
  });
  caja.append(boton);

  bloque.append(caja);

  if (correo.direccion) {
    const alt = el("p", "contacto__alt");
    alt.append(document.createTextNode("Or open it in "));
    const a = el("a", "contacto__enlace-alt", "your mail app →");
    a.href = `mailto:${correo.direccion}?subject=${encodeURIComponent(correo.asunto || "")}`;
    alt.append(a);
    bloque.append(alt);
  }

  return bloque;
};

const crearEnlaces = () => {
  if (!enlaces.length) return null;

  const fila = el("div", "contacto__secundarios");
  enlaces.forEach((e) => {
    const a = el("a", "contacto__secundario", e.texto);
    a.href = e.url;
    // Los PDF y páginas externas abren aparte; el visitante no
    // pierde el cuarto por revisar tu CV.
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    fila.append(a);
  });
  return fila;
};

/**
 * Dibuja el modal CONTACT a partir de src/data/contact.js.
 */
export function initContact() {
  const cont = document.querySelector("#contact-cuerpo");
  if (!cont) return;

  cont.textContent = "";
  const partes = [crearDisponibilidad(), crearCorreo(), crearEnlaces()];
  partes.forEach((p) => p && cont.append(p));
}
