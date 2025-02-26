import './style.css';
import { gsap } from 'gsap';
import { domeConfig, isMobile } from '../shared.ts';
import { scene, camera, renderer, viewer, domeMaterial, screensGroup, videoElements } from '../scene.ts';
// @ts-ignore
import Tween = gsap.core.Tween;

let currentRotation = Math.PI;

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(renderer.domElement);
  animateScene();

  viewer
    .addSplatScene('/RDJuan.compressed.ply', {
      showLoadingUI: false,
      // @ts-ignore
      position: [4, -3.5, 10],
      rotation: [0, -0.5, 0, 0.9239]
    })
    .then(() => {
      viewer.start();
    });
  console.log(viewer);
  // scene.add(viewer);

  // open/close sections
  document.querySelectorAll('.oc-section').forEach(e => {
    e.addEventListener('click', le => {
      le.preventDefault();
      currentRotation += (Math.PI * 1) / 2;
      // console.log(currentRotation);
      if (e.innerHTML === `[+]`) {
        if (e.getAttribute('data-s') != null) {
          document.querySelectorAll('.oc-section').forEach(e => (e.innerHTML = '[+]'));
          document.querySelectorAll('div.oc').forEach(e => e.classList.add('s-closed'));
          e.innerHTML = '[-]';
          // @ts-ignore
          document.querySelector(`#${e.getAttribute('data-s')}`).classList.remove('s-closed');
        }
      } else {
        document.querySelectorAll('.oc-section').forEach(e => (e.innerHTML = '[+]'));
        document.querySelectorAll('div.oc').forEach(e => e.classList.add('s-closed'));
      }
      return;
    });
  });

  const setVideoProgress = (index: number, value: number) => {
    const video = videoElements[index];
    if (video && value >= 0 && value <= 1) {
      video.currentTime = video.duration * value;
    }
  };

  // hovers / screens
  if (!isMobile()) {
    document.querySelectorAll('.sr').forEach(e => {
      // @ts-ignore
      const s = parseInt(e.getAttribute('data-screen'));
      let isMouseMoving = false;
      let movementTimer: number | undefined;

      e.addEventListener('mousemove', event => {
        if (!isMouseMoving) {
          console.log('Mouse started moving inside the anchor.');
          isMouseMoving = true;
        } else {
          const rect = e.getBoundingClientRect();
          // @ts-ignore
          const progressX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
          setVideoProgress(s - 2, progressX / 100);
        }

        clearTimeout(movementTimer);
        movementTimer = setTimeout(() => {
          if (s - 2 >= 0) videoElements[s - 2].play();
          isMouseMoving = false;
        }, 200); // Adjust the delay as needed

        // videoElements[s - 2].play();
      });
      e.addEventListener('mouseenter', () => {
        if (s === 1) {
          showHideJuan(true);
        } else {
          rotateScreens(s - 1);
        }
      });
      e.addEventListener('mouseleave', () => {
        if (s === 1) {
          showHideJuan(false);
        } else {
          videoElements.forEach(e => e.pause());
          rotateScreens(0);
        }
      });
    });
  }

  // hand animation
  gsap.fromTo('.hand', { y: -8, rotation: 60 }, { y: 0, rotation: 0, duration: 0.3, repeat: -1, repeatDelay: 4 });
});

// @ts-ignore
let screensTween;
let rots = [Math.PI, Math.PI * 1.5, Math.PI * 2, Math.PI * 2.5];
let sgr = { y: 0 };
// @ts-ignore
const rotateScreens = screenNumber => {
  const r = rots[screenNumber] - 0.2;
  screensTween = gsap.fromTo(
    sgr,
    { y: screensGroup.rotation.y },
    {
      y: r,
      duration: 1,
      ease: 'power3.out',
      onUpdate: () => {
        screensGroup.rotation.y = sgr.y;
        // console.log(sgr.y);
      }
    }
  );
};

// @ts-ignore
let tweenJuanPos: Tween, tweenJuanRot;
const showHideJuan = (show: boolean = true) => {
  // if (tweenJuanPos) tweenJuanPos.pause();
  if (show) {
    tweenJuanPos = gsap.to(camera.position, { x: 0, y: -1.6, z: 10, duration: 1, ease: 'expo.out' });
    tweenJuanRot = gsap.to(camera.rotation, { x: 0, y: -1.1, z: 0, duration: 1, ease: 'expo.out' });
  } else {
    tweenJuanPos = gsap.to(camera.position, { x: 0, y: 0, z: 10, duration: 1, ease: 'power1.out' });
    tweenJuanRot = gsap.to(camera.rotation, { x: 0, y: 0, z: 0, duration: 1, ease: 'power1.out' });
  }
};

function animateScene() {
  domeMaterial.uniforms.time.value += domeConfig.animationSpeed;
  domeMaterial.uniforms.blobFrequency.value = domeConfig.blobFrequency;
  domeMaterial.uniforms.blobAmplitude.value = domeConfig.blobAmplitude;
  // screensGroup.rotation.y += (currentRotation - screensGroup.rotation.y - 0.2) * 0.02;
  requestAnimationFrame(animateScene);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
