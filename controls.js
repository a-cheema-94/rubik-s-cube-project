import * as THREE from "three";
import { moveToCubiePosition } from "./rotating_animations";

export function keyboardControls(cube, syncFunc, cubies, scene) {
  let isAnimationRunning = false;

  window.addEventListener("keydown", (e) => {
    if (isAnimationRunning) return;

    const moveInfo = moveToCubiePosition[e.key];

    // if user presses a key thats in the helper map
    if (moveInfo) {
      isAnimationRunning = true;

      // helper function
      animateMove(moveInfo, cube, syncFunc, cubies, scene, () => {
        isAnimationRunning = false;
      });
    }
  });
}

function animateMove(moveInfo, cubeState, syncFunc, cubies, scene, onComplete) {
  // current layer selected for move
  const cubiesActiveLayer = cubies.filter((cubie) => {
    return cubie.position[moveInfo.axis] === moveInfo.value;
  });

  // group layer to "invisible" pivot at (0,0,0)
  const pivot = new THREE.Group();
  scene.add(pivot);

  // add cubies to pivot
  cubiesActiveLayer.forEach((cubie) => {
    pivot.attach(cubie);
  });

  let currAngle = 0;
  let finalAngle = moveInfo.angle;

  // velocity of animation
  const speed = 0.08;
  let direction = 1;
  if (finalAngle < 0) {
    direction *= -1;
  }

  // inner animation loop
  function tick() {
    // increment current angle, i.e. add velocity
    currAngle += speed * direction;

    // if rotation finished
    if (Math.abs(currAngle) >= Math.abs(finalAngle)) {
      // reset pivot
      pivot.rotation[moveInfo.axis] = 0;

      // add cubies back to scene and remove pivot
      cubiesActiveLayer.forEach((cubie) => scene.add(cubie));
      scene.remove(pivot);

      cubeState[moveInfo.move]();
      syncFunc();

      // finish loop, ready for next move
      onComplete();

      return;
    }

    // update pivot angle with current angle
    pivot.rotation[moveInfo.axis] = currAngle;

    requestAnimationFrame(tick);
  }

  tick();
  // update state and screen
}
