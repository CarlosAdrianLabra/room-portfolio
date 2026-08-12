import gsap from "gsap";

const VOLUMEN = 0.32;
const FADE_ENTRADA = 2.5; // segundos
const FADE_SALIDA = 0.4;

/**
 * Botón de música. Espera un <audio id="musica"> en el HTML.
 *
 * Devuelve { encender, apagar } a propósito: cuando hagas la pantalla
 * de carga, ese botón va a llamar a encender() y este archivo no cambia.
 */
export function initAudio() {
  const boton = document.querySelector("#btn-audio");
  const audio = document.querySelector("#musica");
  if (!audio) return null;

  let sonando = false;
  let silenciada = localStorage.getItem("musica") === "off";
  let pausadaPorPestana = false;

  const sincronizar = () => {
    boton?.setAttribute("data-estado", sonando ? "activo" : "alterno");
    boton?.setAttribute("aria-pressed", String(sonando));
    boton?.setAttribute(
      "aria-label",
      sonando ? "Silenciar música" : "Activar música",
    );
  };

  const encender = async () => {
    gsap.killTweensOf(audio);
    try {
      audio.volume = 0;
      await audio.play();
      sonando = true;
      gsap.to(audio, { volume: VOLUMEN, duration: FADE_ENTRADA });
    } catch {
      // El navegador todavía no lo permite (falta un gesto del usuario)
      // o el archivo no existe. El botón se queda en silenciado.
      sonando = false;
    }
    sincronizar();
  };

  const apagar = () => {
    gsap.killTweensOf(audio);
    gsap.to(audio, {
      volume: 0,
      duration: FADE_SALIDA,
      onComplete: () => audio.pause(),
    });
    sonando = false;
    sincronizar();
  };

  boton?.addEventListener("click", () => {
    if (sonando) {
      silenciada = true;
      apagar();
    } else {
      silenciada = false;
      encender();
    }
    localStorage.setItem("musica", silenciada ? "off" : "on");
  });

  // Si se van a otra pestaña, la música se calla. No toca el estado del
  // botón: para el usuario sigue "prendida", solo que su pestaña no está.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && sonando) {
      pausadaPorPestana = true;
      audio.pause();
    } else if (!document.hidden && pausadaPorPestana) {
      pausadaPorPestana = false;
      audio.play().catch(() => {});
    }
  });

  sincronizar();

  const arrancar = () => {
    if (!silenciada) encender();
  };

  return { encender, apagar, arrancar };
}
