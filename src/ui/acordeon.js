import gsap from "gsap";

/* --- Perillas --- */
const ABRIR = 0.45; // segundos
const CERRAR = 0.34;
const ESCALON = 0.055; // retraso entre tarjeta y tarjeta

/**
 * Anima la apertura de los <details> de un contenedor.
 *
 * Por qué en JS y no en CSS: no se puede transicionar height de 0 a
 * auto. La propiedad que lo resuelve (interpolate-size) todavía no
 * existe en Safari ni Firefox, así que medimos el alto a mano.
 *
 * También nos hacemos cargo de la exclusividad (solo un grupo
 * abierto): el atributo name la haría de golpe, sin animar el que
 * se cierra.
 */
export function initAcordeon(contenedor) {
  if (!contenedor) return;

  const grupos = [...contenedor.querySelectorAll("details.grupo")];
  const sinMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const cuerpoDe = (det) => det.querySelector(".grupo__cuerpo");
  const flechaDe = (det) => det.querySelector(".grupo__flecha");

  const girar = (det, abierto, duracion = ABRIR) => {
    const flecha = flechaDe(det);
    if (!flecha) return;
    gsap.to(flecha, {
      rotate: abierto ? 180 : 0,
      duration: sinMovimiento ? 0 : duracion,
      ease: "power2.out",
    });
  };

  const abrir = (det) => {
    const cuerpo = cuerpoDe(det);
    det.open = true;
    girar(det, true);

    if (sinMovimiento) {
      gsap.set(cuerpo, { clearProps: "height,paddingBottom" });
      return;
    }

    gsap.killTweensOf(cuerpo);

    // Medir con el contenido ya visible y sin estilos en línea:
    // si mides antes de poner open = true, offsetHeight da 0.
    gsap.set(cuerpo, { height: "auto", paddingBottom: "" });
    const alto = cuerpo.offsetHeight;
    const relleno = parseFloat(getComputedStyle(cuerpo).paddingBottom) || 0;

    gsap.fromTo(
      cuerpo,
      { height: 0, paddingBottom: 0 },
      {
        height: alto,
        paddingBottom: relleno,
        duration: ABRIR,
        ease: "power2.out",
        // Volver a auto al terminar: si se queda en píxeles fijos,
        // el contenido se corta cuando cambia el ancho de ventana.
        onComplete: () => gsap.set(cuerpo, { height: "auto" }),
      },
    );

    // Las tarjetas entran escalonadas, igual que las placas del
    // cuarto en el intro. Sin esto solo se ve un rectángulo crecer.
    const piezas = cuerpo.querySelectorAll(
      ".proyecto, .grupo__etiqueta, .mini",
    );
    gsap.killTweensOf(piezas);
    gsap.fromTo(
      piezas,
      { y: 14, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: ESCALON,
        delay: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity",
      },
    );
  };

  const cerrar = (det) => {
    const cuerpo = cuerpoDe(det);
    girar(det, false, CERRAR);

    if (sinMovimiento) {
      det.open = false;
      return;
    }

    gsap.killTweensOf(cuerpo);
    const alto = cuerpo.offsetHeight;

    gsap.fromTo(
      cuerpo,
      { height: alto },
      {
        height: 0,
        paddingBottom: 0,
        duration: CERRAR,
        ease: "power2.in",
        // open = false hasta el final: si lo quitas antes, el
        // navegador esconde el contenido y no hay qué animar.
        onComplete: () => {
          det.open = false;
          gsap.set(cuerpo, { clearProps: "height,paddingBottom" });
        },
      },
    );
  };

  grupos.forEach((det) => {
    // La exclusividad la llevamos nosotros, no el navegador.
    det.removeAttribute("name");

    const cabecera = det.querySelector("summary");
    cabecera?.addEventListener("click", (e) => {
      e.preventDefault(); // el toggle nativo sería instantáneo

      if (det.open) {
        cerrar(det);
        return;
      }
      grupos.forEach((otro) => {
        if (otro !== det && otro.open) cerrar(otro);
      });
      abrir(det);
    });

    if (det.open) girar(det, true, 0);
  });
}
