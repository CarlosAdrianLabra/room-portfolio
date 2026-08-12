import * as THREE from "three";
import gsap from "gsap";

/* Qué porcentaje del dibujo le toca a cada trazo. Se traslapan
   tantito para que no se vean tres animaciones separadas. */
const TRAMOS = [
  [0, 40], // piso
  [38, 70], // pared izquierda
  [68, 100], // pared derecha
];

/* Aunque todo venga de caché, el alambre se dibuja al menos esto.
   Si no, en la segunda visita nadie alcanza a ver la animación. */
const MINIMO_MS = 1400;

/* Si a los 20s nadie llamó a terminar(), abrimos de todos modos.
   Un portafolio que te deja entrar temprano es mejor que uno que
   no te deja entrar nunca. */
const RESCATE_MS = 20000;

/**
 * Pantalla de entrada.
 *
 * Devuelve el LoadingManager: pásaselo a TODOS tus loaders para que
 * reporten avance, y llama a terminar() cuando el modelo ya esté en
 * la escena.
 *
 * @param {Function} opciones.alEntrar - corre al picarle a ENTER
 */
export function initCarga({ alEntrar, alClic } = {}) {
  const pantalla = document.querySelector("#carga");
  const pct = document.querySelector("#carga-pct");
  const boton = document.querySelector("#btn-entrar");
  const trazos = [...document.querySelectorAll("#carga [data-trazo]")];

  const sinMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const manager = new THREE.LoadingManager();
  const inicio = performance.now();

  const avance = { v: 0 };
  let ultimo = -1;
  let terminado = false;
  let entrado = false;

  const dibujar = () => {
    trazos.forEach((trazo, i) => {
      const [a, b] = TRAMOS[i] || [0, 100];
      const t = Math.max(0, Math.min(100, ((avance.v - a) / (b - a)) * 100));
      trazo.style.strokeDashoffset = 100 - t;
    });
    const n = Math.round(avance.v);
    if (n !== ultimo) {
      ultimo = n;
      if (pct) pct.textContent = n + "%";
      pantalla?.setAttribute("aria-valuenow", n);
    }
  };

  const irA = (destino, duracion = 0.8) => {
    // Una vez que arrancó el cierre, el progreso ya no manda.
    // Sin esta línea, un item que llega tarde mata el tween final
    // y la pantalla se queda pegada en 90 para siempre.
    if (terminado) return;

    gsap.to(avance, {
      v: destino,
      duration: sinMovimiento ? 0 : duracion,
      ease: "power2.out",
      overwrite: true,
      onUpdate: dibujar,
    });
  };

  /* El GLB cuenta como UN item aunque pese más que todo lo demás
     junto, así que itemsLoaded/itemsTotal da brincos feos. El tween
     de arriba los suaviza, y nos guardamos el último 10% para
     terminar(): así el alambre nunca se cierra antes de tiempo. */
  manager.onProgress = (url, cargados, total) => {
    if (!total) return;
    irA(Math.min(90, (cargados / total) * 90));
  };

  manager.onError = (url) => {
    console.warn("[carga] no se pudo cargar:", url);
  };

  const mostrarBoton = () => {
    if (pct) pct.hidden = true;
    pantalla?.classList.add("listo");
    if (!boton) return;
    boton.hidden = false;
    gsap.fromTo(
      boton,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: sinMovimiento ? 0 : 0.6,
        ease: "power2.out",
      },
    );
    boton.focus({ preventScroll: true });
  };

  const terminar = () => {
    if (terminado) return;
    terminado = true;
    clearTimeout(rescate);
    gsap.killTweensOf(avance);

    const espera = Math.max(0, MINIMO_MS - (performance.now() - inicio));
    gsap.to(avance, {
      v: 100,
      duration: sinMovimiento ? 0 : 0.9,
      delay: espera / 1000,
      ease: "power2.inOut",
      onUpdate: dibujar,
      onComplete: mostrarBoton,
    });
  };

  const rescate = setTimeout(() => {
    console.warn("[carga] tardó demasiado, abriendo de todos modos");
    terminar();
  }, RESCATE_MS);

  // Red de seguridad: si todo cargó y nadie llamó a terminar(),
  // esto lo hace por ti. Es idempotente, no pasa nada si se duplica.
  manager.onLoad = terminar;

  const entrar = () => {
    if (entrado) return;
    entrado = true;
    alClic?.();
    pantalla.setAttribute("aria-hidden", "true");

    // La intro arranca a media disolvencia: para cuando el cuarto
    // se ve, las placas ya vienen saliendo. Se siente continuo.
    gsap.delayedCall(sinMovimiento ? 0 : 0.3, () => alEntrar?.());

    gsap.to(pantalla, {
      opacity: 0,
      duration: sinMovimiento ? 0.01 : 0.8,
      ease: "power2.inOut",
      onComplete: () => pantalla.remove(),
    });
  };

  boton?.addEventListener("click", entrar);
  dibujar();

  return { manager, terminar, entrar };
}
