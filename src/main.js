import * as THREE from "three";
import "./style.scss";
import { OrbitControls } from "./utils/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { initModales } from "./ui/modales.js";
import { crearMaterialMezcla, initTema } from "./ui/tema.js";
import { initAudio } from "./ui/audio.js";
import { initCarga } from "./ui/carga.js";
import gsap from "gsap";

const canvas = document.querySelector("#experience-canvas");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let touchHappend = false;
let isModalOpen = false;

const modales = initModales({
  alAbrir: () => {
    isModalOpen = true;
    controls.enabled = false;

    if (currentHoveredObject) {
      playHoverAnimation(currentHoveredObject, false);
      currentHoveredObject = null;
    }
    document.body.style.cursor = "default";
    currentIntersects = [];
  },
  alCerrar: () => {
    isModalOpen = false;
    controls.enabled = true;
  },
});

const xAxisFans = [];
const yAxisFans = [];

const raycarterObjects = [];
let currentIntersects = [];
let currentHoveredObject = null;

const socialLinks = {
  Placadegithub: "https://github.com/CarlosAdrianLabra",
  Placadelinkedin: "https://www.linkedin.com/in/carlos-labra-granados/",
  Placatft: "https://lolchess.gg/profile/lan/Jaggerlot-2607/set1",
  Placayoutube: "https://www.youtube.com/",
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const musica = initAudio();

const carga = initCarga({
  alClic: () => musica?.arrancar(),
  alEntrar: () => {
    playIntroAnimation();
    animarSilla();
    musica?.arrancar();
  },
});

// Loaders
const textureLoader = new THREE.TextureLoader(carga.manager);

// Model Loader

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader(carga.manager);
loader.setDRACOLoader(dracoLoader);

const enviromentMap = new THREE.CubeTextureLoader(carga.manager)
  .setPath("textures/skybox/")
  .load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);

const textureMap = {
  Set1: {
    day: "/textures/room/day/SetTextureOne.webp",
    night: "/textures/room/night/TextureSetNightOne.webp",
  },
  Set2: {
    day: "/textures/room/day/SetTextureTwo.webp",
    night: "/textures/room/night/TextureSetNightTwo.webp",
  },
  Set3: {
    day: "/textures/room/day/SetTextureThree.webp",
    night: "/textures/room/night/TextureSetNightThree.webp",
  },
  Set4: {
    day: "/textures/room/day/SetTextureFour.webp",
    night: "/textures/room/night/TextureSetNightFour.webp",
  },
};

const loadedTextures = {
  day: {},
  night: {},
};

Object.entries(textureMap).forEach(([key, paths]) => {
  const dayTexture = textureLoader.load(paths.day);
  dayTexture.flipY = false;
  dayTexture.colorSpace = THREE.SRGBColorSpace;
  dayTexture.minFilter = THREE.LinearFilter;
  loadedTextures.day[key] = dayTexture;
  const nightTexture = textureLoader.load(paths.night);
  nightTexture.flipY = false;
  nightTexture.colorSpace = THREE.SRGBColorSpace;
  nightTexture.minFilter = THREE.LinearFilter;
  loadedTextures.night[key] = nightTexture;
});

const materialesCuarto = {};
Object.keys(textureMap).forEach((key) => {
  materialesCuarto[key] = crearMaterialMezcla(
    loadedTextures.day[key],
    loadedTextures.night[key],
  );
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  envMap: enviromentMap,
  envMapIntensity: 1,
  depthWrite: false,
});

const wallpaperTexture = textureLoader.load(
  "/textures/image/Gatoacostado.webp",
);
const fotohombre = textureLoader.load("/textures/image/hombrefuerte.png");
const fotopareja = textureLoader.load("/textures/image/Boxelpareja.png");
const fotofamilia = textureLoader.load("/textures/image/Boxelfamilia.png");
fotohombre.flipY = false;
fotopareja.flipY = false;
fotofamilia.flipY = false;
wallpaperTexture.flipY = false;
fotohombre.colorSpace = THREE.SRGBColorSpace;
fotopareja.colorSpace = THREE.SRGBColorSpace;
fotofamilia.colorSpace = THREE.SRGBColorSpace;
wallpaperTexture.colorSpace = THREE.SRGBColorSpace;

const encajarEnUVs = (mesh, texture, ajustes = {}) => {
  const {
    x = 0,
    y = 0,
    escalaX = 1,
    escalaY = 1,
    rotacion = 0,
    cover = false,
  } = ajustes;

  const uv = mesh.geometry.attributes.uv;
  let minU = Infinity,
    maxU = -Infinity;
  let minV = Infinity,
    maxV = -Infinity;

  for (let i = 0; i < uv.count; i++) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    if (u < minU) minU = u;
    if (u > maxU) maxU = u;
    if (v < minV) minV = v;
    if (v > maxV) maxV = v;
  }

  const anchoU = maxU - minU;
  const anchoV = maxV - minV;
  const centroU = minU + anchoU / 2;
  const centroV = minV + anchoV / 2;

  const girada = Math.abs(Math.sin(rotacion)) > 0.5;
  const ladoU = girada ? anchoV : anchoU;
  const ladoV = girada ? anchoU : anchoV;

  let coverX = 1;
  let coverY = 1;

  if (cover && texture.image) {
    const relIsla = anchoU / anchoV;
    const relImagen = texture.image.width / texture.image.height;
    const d = relIsla / relImagen;
    if (d > 1) coverY = d;
    else coverX = 1 / d;
  }

  texture.center.set(centroU, centroV);
  texture.rotation = rotacion;
  texture.repeat.set(
    1 / (anchoU * escalaX * coverX),
    1 / (anchoV * escalaY * coverY),
  );
  texture.offset.set(0.5 - centroU + x, 0.5 - centroV + y);
};

window.addEventListener("mousemove", (e) => {
  touchHappend = false;
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener(
  "touchstart",
  (e) => {
    if (isModalOpen) return;
    e.preventDefault();
    pointer.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
  },
  { passive: false },
);

window.addEventListener(
  "touchend",
  (e) => {
    if (isModalOpen) return;
    e.preventDefault();
    handleRaycasterInteraction();
  },
  { passive: false },
);

function handleRaycasterInteraction(e) {
  if (isModalOpen) return;
  if (e?.target?.closest?.("[data-modal], .ui-capa")) return;

  if (currentIntersects.length > 0) {
    const object = currentIntersects[0].object;

    Object.entries(socialLinks).forEach(([key, url]) => {
      if (object.name.includes(key)) {
        const newWindow = window.open();
        newWindow.opener = null;
        newWindow.location = url;
        newWindow.target = "_blank";
        newWindow.rel = "noopener noreferrer";
      }
    });

    if (object.name.includes("Botonwork")) {
      modales.abrir("work");
    } else if (object.name.includes("BotonAbout")) {
      modales.abrir("about");
    } else if (object.name.includes("Botoncontact")) {
      modales.abrir("contact");
    } else if (object.name.includes("Botonskills")) {
      modales.abrir("skills");
    }
  }
}

window.addEventListener("click", handleRaycasterInteraction);

let btnAbout,
  btnContact,
  btnSkills,
  btnWork,
  fotoBoxFamilia,
  fotoBoxPareja,
  fotoBoxHombre,
  gata1,
  gata2,
  letraJ,
  letraA,
  letraG,
  letraG2,
  letraE,
  letraR,
  letraL,
  letraO,
  letraT,
  marcoFamilia,
  marcoPareja,
  marcoHombre,
  pengu,
  placaGithub,
  placaLinkedin,
  placaTft,
  placaYoutube,
  poro,
  mikasa,
  taza,
  sillaTop;

const objetosAnimados = [
  "Boton",
  "Placa",
  "Letra",
  "Gata",
  "Pengu",
  "Poro",
  "Taza",
  "Mikasa",
];

const giroHover = {
  Placadegithub: { x: Math.PI / 8 },
  Placadelinkedin: { x: Math.PI / 8 },
  Placayoutube: { x: Math.PI / 8 },
  //Placatft: { z: Math.PI / 16 },
};
const esAnimado = (nombre) => objetosAnimados.some((n) => nombre.includes(n));

loader.load("/models/CuartoPortafolio26-v1.glb", (glb) => {
  glb.scene.traverse((child) => {
    if (child.isMesh) {
      if (
        child.name.includes("Boton") ||
        child.name.includes("Placa") ||
        child.name.includes("Letra") ||
        child.name.includes("Gata") ||
        child.name.includes("Pengu") ||
        child.name.includes("Poro") ||
        child.name.includes("Taza") ||
        child.name.includes("Mikasa")
      ) {
        raycarterObjects.push(child);
      }
      if (child.name.includes("Boton") || child.name.includes("Placa")) {
        child.userData.initialScale = new THREE.Vector3().copy(child.scale);
        child.userData.initialPosition = new THREE.Vector3().copy(
          child.position,
        );
        child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
      }
      if (esAnimado(child.name)) {
        raycarterObjects.push(child);
        child.userData.initialScale = new THREE.Vector3().copy(child.scale);
        child.userData.initialPosition = new THREE.Vector3().copy(
          child.position,
        );
        child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
      }

      if (child.name.includes("Botoncontact")) {
        btnContact = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("Botonwork")) {
        btnWork = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("BotonAbout")) {
        btnAbout = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("Botonskills")) {
        btnSkills = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("Placadegithub")) {
        placaGithub = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("Placadelinkedin")) {
        placaLinkedin = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("Placatft")) {
        placaTft = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("Placayoutube")) {
        placaYoutube = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraJ")) {
        letraJ = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraA")) {
        letraA = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraG1")) {
        letraG = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraG2")) {
        letraG2 = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraE")) {
        letraE = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraR")) {
        letraR = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraL")) {
        letraL = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraO")) {
        letraO = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("LetraT")) {
        letraT = child;
        child.scale.set(0, 0, 0);
      }
      if (child.name.includes("SillaTOP")) {
        sillaTop = child;
      }
      if (child.name.includes("Vidrio")) {
        child.material = glassMaterial;
      } else if (child.name.includes("Gatoacostado")) {
        const tex = wallpaperTexture.clone();
        tex.needsUpdate = true;
        encajarEnUVs(child, tex, { escalaY: 3.9, y: 0.08 });
        child.material = new THREE.MeshBasicMaterial({
          map: tex,
        });
      } else if (child.name.includes("fotoBoxelfamilia")) {
        const tex = fotofamilia.clone();
        tex.needsUpdate = true;
        encajarEnUVs(child, tex, {
          cover: true,
          rotacion: Math.PI / 2,
          y: -0.02,
          escalaY: 0.37,
        });
        child.material = new THREE.MeshBasicMaterial({
          map: tex,
        });
      } else if (child.name.includes("fotoBoxelparejahermosa")) {
        const tex = fotopareja.clone();
        tex.needsUpdate = true;
        encajarEnUVs(child, tex, {
          cover: true,
          y: -0.02,
          escalaX: 1,
          escalaY: 1,
        });
        child.material = new THREE.MeshBasicMaterial({
          map: tex,
        });
      } else if (
        child.name.includes("fotohombrefuerte") &&
        !child.name.startsWith("Marco")
      ) {
        const tex = fotohombre.clone();
        tex.needsUpdate = true;
        encajarEnUVs(child, tex, { cover: true });
        child.material = new THREE.MeshBasicMaterial({
          map: tex,
        });
      } else {
        Object.keys(textureMap).forEach((key) => {
          if (child.name.includes(key)) {
            child.material = materialesCuarto[key];

            if (child.name.includes("ventilador")) {
              if (
                child.name.includes("ventilador1") ||
                child.name.includes("ventilador2") ||
                child.name.includes("ventilador3")
              ) {
                xAxisFans.push(child);
              } else {
                yAxisFans.push(child);
              }
            }
          }
        });
      }
    }
  });
  scene.add(glb.scene);

  initTema({
    escena: scene,
    vidrio: glassMaterial,
  });
  carga.terminar();
});

function playIntroAnimation() {
  const t1 = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: "back.out(1.8)",
    },
  });
  t1.to(btnWork.scale, {
    z: 1.38,
    x: 1.38,
    y: 1.38,
  })
    .to(
      btnAbout.scale,
      {
        z: 1.38,
        x: 1.38,
        y: 1.38,
      },
      "-=0.6",
    )
    .to(
      btnSkills.scale,
      {
        z: 1.38,
        x: 1.38,
        y: 1.38,
      },
      "-=0.6",
    )
    .to(
      btnContact.scale,
      {
        z: 1.38,
        x: 1.38,
        y: 1.38,
      },
      "-=0.6",
    );

  const t2 = gsap.timeline({
    defaults: { duration: 0.8, ease: "back.out(1.8)" },
  });

  t2.to(placaGithub.scale, { x: 1, y: 1, z: 1 })
    .to(placaLinkedin.scale, { x: 1, y: 1, z: 1 }, "-=0.6")
    .to(placaYoutube.scale, { x: 1, y: 1, z: 1 }, "-=0.6")
    .to(placaTft.scale, { x: 1, y: 1, z: 1 }, "-=0.6");

  const t3 = gsap.timeline({
    defaults: { duration: 0.8, ease: "back.out(1.8)" },
  });

  t3.to(letraJ.scale, {
    x: letraJ.userData.initialScale.x,
    y: letraJ.userData.initialScale.y,
    z: letraJ.userData.initialScale.z,
  })
    .to(
      letraA.scale,
      {
        x: letraA.userData.initialScale.x,
        y: letraA.userData.initialScale.y,
        z: letraA.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraG.scale,
      {
        x: letraG.userData.initialScale.x,
        y: letraG.userData.initialScale.y,
        z: letraG.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraG2.scale,
      {
        x: letraG2.userData.initialScale.x,
        y: letraG2.userData.initialScale.y,
        z: letraG2.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraE.scale,
      {
        x: letraE.userData.initialScale.x,
        y: letraE.userData.initialScale.y,
        z: letraE.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraR.scale,
      {
        x: letraR.userData.initialScale.x,
        y: letraR.userData.initialScale.y,
        z: letraR.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraL.scale,
      {
        x: letraL.userData.initialScale.x,
        y: letraL.userData.initialScale.y,
        z: letraL.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraO.scale,
      {
        x: letraO.userData.initialScale.x,
        y: letraO.userData.initialScale.y,
        z: letraO.userData.initialScale.z,
      },
      "-=0.6",
    )
    .to(
      letraT.scale,
      {
        x: letraT.userData.initialScale.x,
        y: letraT.userData.initialScale.y,
        z: letraT.userData.initialScale.z,
      },
      "-=0.6",
    );
}

function animarSilla() {
  const base = sillaTop.rotation.y;

  sillaTop.rotation.y = base - Math.PI / 12;

  gsap.to(sillaTop.rotation, {
    y: base + Math.PI / 12,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  1000,
);
camera.position.set(15.263077950431015, 12.877421225996272, 19.218189104367923);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 35;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;

controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();
controls.target.set(-0.3201017017732152, 2.551743105372938, -0.473145381140428);

// Event listeners
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camara
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function playHoverAnimation(object, isHovering) {
  gsap.killTweensOf(object.scale);
  gsap.killTweensOf(object.rotation);
  gsap.killTweensOf(object.position);

  const giro = Object.entries(giroHover).find(([nombre]) =>
    object.name.includes(nombre),
  )?.[1];

  if (isHovering) {
    gsap.to(object.scale, {
      x: object.userData.initialScale.x * 1.2,
      y: object.userData.initialScale.y * 1.2,
      z: object.userData.initialScale.z * 1.2,
      duration: 0.5,
      ease: "bounce.out(1.8)",
    });
    if (giro) {
      const destino = {};
      Object.entries(giro).forEach(([eje, cantidad]) => {
        destino[eje] = object.userData.initialRotation[eje] + cantidad;
      });
      gsap.to(object.rotation, {
        ...destino,
        duration: 0.5,
        ease: "bounce.out(1.8)",
      });
    }
  } else {
    gsap.to(object.scale, {
      x: object.userData.initialScale.x,
      y: object.userData.initialScale.y,
      z: object.userData.initialScale.z,
      duration: 0.3,
      ease: "bounce.out(1.8)",
    });
    if (giro) {
      const destino = {};
      Object.keys(giro).forEach((eje) => {
        destino[eje] = object.userData.initialRotation[eje];
      });
      gsap.to(object.rotation, {
        ...destino,
        duration: 0.3,
        ease: "bounce.out(1.8)",
      });
    }
  }
}

const render = () => {
  window.requestAnimationFrame(render);
  controls.update();
  //console.log(camera.position);
  //console.log("00000000000000");
  //console.log(controls.target);

  // Animación de ventiladores
  xAxisFans.forEach((fan) => {
    fan.rotation.x += 0.1;
  });

  yAxisFans.forEach((fan) => {
    fan.rotation.y += 0.1;
  });

  //Raycaster
  if (!isModalOpen) {
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    currentIntersects = raycaster.intersectObjects(raycarterObjects);

    for (let i = 0; i < currentIntersects.length; i++) {}

    if (currentIntersects.length > 0) {
      const currentInterserctObject = currentIntersects[0].object;

      if (esAnimado(currentInterserctObject.name)) {
        if (currentInterserctObject !== currentHoveredObject) {
          if (currentHoveredObject) {
            playHoverAnimation(currentHoveredObject, false);
          }
          playHoverAnimation(currentInterserctObject, true);
          currentHoveredObject = currentInterserctObject;
        }
      }

      if (
        currentInterserctObject.name.includes("Boton") ||
        currentInterserctObject.name.includes("Placa")
      ) {
        if (currentInterserctObject !== currentHoveredObject) {
          if (currentHoveredObject) {
            playHoverAnimation(currentHoveredObject, false);
          }
          playHoverAnimation(currentInterserctObject, true);
          currentHoveredObject = currentInterserctObject;
        }
      }
      if (
        currentInterserctObject.name.includes("Boton") ||
        currentInterserctObject.name.includes("Placa")
      ) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    } else {
      if (currentHoveredObject) {
        playHoverAnimation(currentHoveredObject, false);
        currentHoveredObject = null;
      }
      document.body.style.cursor = "default";
    }
  }
  renderer.render(scene, camera);
};

render();
