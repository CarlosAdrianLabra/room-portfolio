import * as THREE from "three";
import "./style.scss";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#experience-canvas");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const xAxisFans = [];
const yAxisFans = [];

const raycarterObjects = [];
let currentIntersects = [];

const socialLinks = {
  Placadegithub: "https://github.com/CarlosAdrianLabra",
  Placadelinkedin: "https://www.linkedin.com/in/carlos-labra-granados/",
  Placatft: "https://lolchess.gg/profile/lan/Jaggerlot-2607/set1",
  Placayoutube: "https://www.youtube.com/",
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Loaders
const textureLoader = new THREE.TextureLoader();

// Model Loader

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const enviromentMap = new THREE.CubeTextureLoader()
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
  loadedTextures.day[key] = dayTexture;
  const nightTexture = textureLoader.load(paths.night);
  nightTexture.flipY = false;
  nightTexture.colorSpace = THREE.SRGBColorSpace;
  loadedTextures.night[key] = nightTexture;
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
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("click", (e) => {
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
  }
});

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
            const material = new THREE.MeshBasicMaterial({
              map: loadedTextures.day[key],
            });
            child.material = material;

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

            if (child.material.map) {
              child.material.map.minFilter = THREE.LinearFilter;
            }
          }
        });
      }
    }
  });
  scene.add(glb.scene);
});

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

const render = () => {
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
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  currentIntersects = raycaster.intersectObjects(raycarterObjects);

  for (let i = 0; i < currentIntersects.length; i++) {}

  if (currentIntersects.length > 0) {
    const currentInterserctObject = currentIntersects[0].object;
    if (
      currentInterserctObject.name.includes("Boton") ||
      currentInterserctObject.name.includes("Placa")
    ) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  } else {
    document.body.style.cursor = "default";
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
};

render();
