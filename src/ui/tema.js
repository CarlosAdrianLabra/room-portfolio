import * as THREE from "three";
import gsap from "gsap";

/* ---------------------------------------------------------------------
   0 = día, 1 = noche.
   Este objeto lo comparten TODOS los materiales del cuarto, así que
   animar .value mueve el cuarto entero de un solo jalón.
   --------------------------------------------------------------------- */
export const mezcla = { value: 0 };

/* Los tres colores por los que pasa el fondo. El de en medio es el
   que hace que se sienta atardecer y no apagón. */
const FONDO = {
  dia: "#c9c6c0",
  ocaso: "#d4874f",
  noche: "#191728",
};

/* --- Perillas para tunear el feeling --- */
const DURACION = 2.2; // segundos
const EASE = "power1.inOut";
const PICO_OCASO = 0.45; // en qué punto del recorrido pega más fuerte el naranja

/**
 * Material del cuarto que sabe mezclar su textura de día con la de noche.
 *
 * En vez de escribir un ShaderMaterial desde cero, le inyectamos dos
 * líneas de GLSL al MeshBasicMaterial de Three. Así seguimos heredando
 * gratis su manejo de color space, tone mapping y transmisión — que es
 * justo lo que se rompe cuando uno se escribe el shader a mano.
 */
export function crearMaterialMezcla(texturaDia, texturaNoche) {
  const material = new THREE.MeshBasicMaterial({ map: texturaDia });
  const mapaNoche = { value: texturaNoche };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uMapaNoche = mapaNoche;
    shader.uniforms.uMezcla = mezcla;

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform sampler2D uMapaNoche;
         uniform float uMezcla;`,
      )
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>

         #ifdef USE_MAP
           vec4 colorNoche = texture2D( uMapaNoche, vMapUv );
           diffuseColor = mix( diffuseColor, colorNoche, uMezcla );
         #endif`,
      );
  };

  // Los 4 materiales generan exactamente el mismo programa de GPU.
  // Con esta llave, Three lo compila una vez y lo reusa.
  material.customProgramCacheKey = () => "mezclaDiaNoche";

  return material;
}

/**
 * Botón de día / noche.
 *
 * @param {THREE.Scene}    opciones.escena - para animar el fondo
 * @param {THREE.Material} opciones.vidrio - opcional: tu glassMaterial
 */
export function initTema({ escena, vidrio } = {}) {
  const boton = document.querySelector("#btn-tema");
  const sinMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const cDia = new THREE.Color(FONDO.dia);
  const cOcaso = new THREE.Color(FONDO.ocaso);
  const cNoche = new THREE.Color(FONDO.noche);
  const fondo = new THREE.Color();

  let tema = localStorage.getItem("tema") === "noche" ? "noche" : "dia";

  /* Corre en cada frame de la transición. */
  const pintar = () => {
    const t = mezcla.value;

    // El fondo no va en línea recta de gris a morado: se desvía por el
    // naranja. Ese rodeo es todo el truco del atardecer.
    if (t < PICO_OCASO) {
      fondo.copy(cDia).lerp(cOcaso, t / PICO_OCASO);
    } else {
      fondo.copy(cOcaso).lerp(cNoche, (t - PICO_OCASO) / (1 - PICO_OCASO));
    }

    if (escena) escena.background = fondo;

    // El vidrio de la ventana deja de reflejar tanto cielo.
    if (vidrio) vidrio.envMapIntensity = 1 - t * 0.7;
  };

  const sincronizarBoton = () => {
    document.body.dataset.tema = tema;
    const esNoche = tema === "noche";
    boton?.setAttribute("data-estado", esNoche ? "alterno" : "activo");
    boton?.setAttribute("aria-pressed", String(esNoche));
    boton?.setAttribute(
      "aria-label",
      esNoche ? "Cambiar a modo día" : "Cambiar a modo noche",
    );
  };

  const alternar = () => {
    tema = tema === "dia" ? "noche" : "dia";
    localStorage.setItem("tema", tema);
    sincronizarBoton();

    const destino = tema === "noche" ? 1 : 0;

    // Si le picas a media transición, no arranca de cero ni se traba:
    // recorta la duración a lo que le falta y se va para el otro lado.
    const distancia = Math.abs(destino - mezcla.value);

    gsap.killTweensOf(mezcla);
    gsap.to(mezcla, {
      value: destino,
      duration: sinMovimiento ? 0 : DURACION * Math.max(distancia, 0.3),
      ease: EASE,
      onUpdate: pintar,
      onComplete: pintar,
    });
  };

  // Estado inicial, sin animación.
  mezcla.value = tema === "noche" ? 1 : 0;
  pintar();
  sincronizarBoton();

  boton?.addEventListener("click", alternar);

  return {
    alternar,
    get tema() {
      return tema;
    },
  };
}
