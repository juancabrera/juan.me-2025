import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { domeConfig, domeVertexShader, fragmentShader } from './shared.ts';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

// scene
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer();
// export const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 10);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

// dome
export const domeGeometry = new THREE.SphereGeometry(
  domeConfig.sphereRadius,
  domeConfig.sphereSegments,
  domeConfig.sphereSegments
);
export const domeMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: { value: new THREE.Color(domeConfig.color1) },
    color2: { value: new THREE.Color(domeConfig.color2) },
    time: { value: 0.0 },
    blobFrequency: { value: domeConfig.blobFrequency },
    blobAmplitude: { value: domeConfig.blobAmplitude }
  },
  vertexShader: domeVertexShader,
  fragmentShader: fragmentShader,
  side: THREE.BackSide
});
export const dome = new THREE.Mesh(domeGeometry, domeMaterial);
scene.add(dome);

export const screensGroup = new THREE.Group();

export const viewer = new GaussianSplats3D.Viewer({
  threeScene: scene,
  camera: camera,
  renderer: renderer,
  selfDrivenMode: true,
  useBuiltInControls: false
});

// screens
screensGroup.position.z = 14;
screensGroup.position.x = 1;
screensGroup.rotation.y = Math.PI;
scene.add(screensGroup);
const screenColors = [0xff0000, 0x00ff00, 0x0000ff];
const screenVideos = ['nyt.mp4', 'mgm.mp4', 'lanebreak.mp4'];
export const videoElements: HTMLVideoElement[] = [];
const screenGeometry = new THREE.PlaneGeometry(8, 4.5);

screenColors.forEach((_color, i) => {
  // console.log(i);
  videoElements[i] = document.createElement('video');
  videoElements[i].src = `/${screenVideos[i]}`;
  videoElements[i].load();
  videoElements[i].muted = true;
  let videoTexture = new THREE.VideoTexture(videoElements[i]);

  const screen = new THREE.Mesh(
    screenGeometry,
    new THREE.MeshBasicMaterial({ map: videoTexture })
    // new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 })
  );

  // transmuting energy is resolving polarity into unity, meaning you get the higer view, doesn't bother you anymore. =  transmuted
  // transmuting is the art of expanding awareness, the energy that hold that polarity can be free now (expand awareness)

  const positions = [
    [-10, 0, 0],
    [0, 0, -10],
    [10, 0, 0]
  ];
  // @ts-ignore
  screen.position.set(...positions[i]);
  screen.lookAt(0, 0, 0);
  screensGroup.add(screen);
});
