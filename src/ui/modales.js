import gsap from "gsap";

/**
 * Maneja los 4 modales del portafolio.
 *
 * Encuentra solo los elementos con [data-modal] en el HTML, así que si
 * mañana agregas un quinto modal no hay que tocar este archivo.
 *
 * @param {Object}   opciones
 * @param {Function} opciones.alAbrir  - recibe el nombre del modal ("work", ...)
 * @param {Function} opciones.alCerrar - recibe el nombre del modal
 * @returns {{abrir: Function, cerrar: Function, abierto: boolean}}
 */
export function initModales({ alAbrir, alCerrar } = {}) {
  const modales = new Map();
  document.querySelectorAll("[data-modal]").forEach((el) => {
    modales.set(el.dataset.modal, el);
  });

  const sinMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const dur = sinMovimiento ? 0.01 : 0.4;

  let actual = null;
  let focoPrevio = null;
  let abiertoEn = 0;

  const SELECTOR_FOCO =
    'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const enfocables = (raiz) =>
    [...raiz.querySelectorAll(SELECTOR_FOCO)].filter(
      (el) => el.getClientRects().length > 0,
    );

  /* ------------------------------------------------------------------ */

  function abrir(nombre) {
    const el = modales.get(nombre);
    if (!el || actual) return;

    actual = el;
    abiertoEn = performance.now();
    focoPrevio = document.activeElement;

    el.hidden = false;
    document.body.classList.add("modal-abierto");
    alAbrir?.(nombre);

    const panel = el.querySelector(".panel");
    gsap.killTweensOf([el, panel]);
    gsap.set(el, { opacity: 0 });
    gsap.set(panel, {
      y: sinMovimiento ? 0 : 26,
      scale: sinMovimiento ? 1 : 0.97,
    });

    gsap.to(el, { opacity: 1, duration: dur, ease: "power2.out" });
    gsap.to(panel, {
      y: 0,
      scale: 1,
      duration: dur,
      ease: "back.out(1.4)",
    });

    el.querySelector("[data-cerrar]")?.focus({ preventScroll: true });
  }

  function cerrar() {
    if (!actual) return;

    const el = actual;
    const panel = el.querySelector(".panel");
    const nombre = el.dataset.modal;
    actual = null;

    document.body.classList.remove("modal-abierto");
    alCerrar?.(nombre);

    gsap.killTweensOf([el, panel]);
    gsap.to(panel, {
      y: sinMovimiento ? 0 : 14,
      scale: sinMovimiento ? 1 : 0.98,
      duration: dur * 0.7,
      ease: "power2.in",
    });
    gsap.to(el, {
      opacity: 0,
      duration: dur * 0.7,
      ease: "power2.in",
      onComplete: () => {
        el.hidden = true;
      },
    });

    focoPrevio?.focus?.({ preventScroll: true });
    focoPrevio = null;
  }

  /* ---------------------------- eventos ----------------------------- */

  // Botón de cerrar (delegado) y clic en el velo, fuera del panel.
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cerrar]")) {
      cerrar();
      return;
    }
    if (!actual || e.target !== actual) return;
    // En móvil, el touchend del canvas dispara un click fantasma justo
    // después de abrir. Este margen evita que se cierre solo.
    if (performance.now() - abiertoEn < 350) return;
    cerrar();
  });

  // Escape para cerrar + Tab atrapado dentro del modal.
  document.addEventListener("keydown", (e) => {
    if (!actual) return;

    if (e.key === "Escape") {
      e.preventDefault();
      cerrar();
      return;
    }
    if (e.key !== "Tab") return;

    const lista = enfocables(actual);
    if (lista.length === 0) return;

    const primero = lista[0];
    const ultimo = lista[lista.length - 1];

    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  });

  return {
    abrir,
    cerrar,
    get abierto() {
      return actual !== null;
    },
  };
}
