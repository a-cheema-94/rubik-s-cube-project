import * as THREE from "three";
import { moveToCubiePosition } from "./rotating_animations";



// current faces with three js vectors and opposites map
const PHYSICAL_FACES = [
    { name: 'r', vector: new THREE.Vector3(1, 0, 0) }, // X = 1
    { name: 'l', vector: new THREE.Vector3(-1, 0, 0) }, // X = -1
    { name: 'u', vector: new THREE.Vector3(0, 1, 0) }, // Y = 1
    { name: 'd', vector: new THREE.Vector3(0, -1, 0) }, // Y = -1
    { name: 'f', vector: new THREE.Vector3(0, 0, 1) }, // Z = 1
    { name: 'b', vector: new THREE.Vector3(0, 0, -1) } // Z = -1
];

// NOTE: m runs parallel to l and r on x axis, e runs parallel to u and d on y axis
// and s runs parallel to f and b on z axis.
const FACE_SLICE_LAYER_MAP = { r: 'm', l: 'm', u: 'e', d: 'e', f: 's', b: 's' }

const OPPOSITES = { r: 'l', l: 'r', u: 'd', d: 'u', f: 'b', b: 'f' };

// Helper function to find which physical face aligns closest with a screen vector
function getClosestFace(screenVector) {
    let closestFace = null;
    // running max alignment
    let maxAlignment = -Infinity;

    // iterate through all faces, get dot product with current screen vector
    for (const face of PHYSICAL_FACES) {
        const alignment = face.vector.dot(screenVector); // Dot product calculation for how aligned current face is with the screen vector
        if (alignment > maxAlignment) {
            maxAlignment = alignment;
            closestFace = face.name;
        }
    }
    return closestFace;
}

// Dynamic translation system
function translateLayer(pressedKey, camera) {
    const isUpperCase = pressedKey === pressedKey.toUpperCase();
    const key = pressedKey.toLowerCase();

    // Extract the camera's real-time screen vectors from its transformation matrix
    const cameraRight = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    const cameraUp    = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize();
    const cameraFront = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 2).normalize();

    // get front, up and right faces and opposites
    const visualFront = getClosestFace(cameraFront);
    const visualUp    = getClosestFace(cameraUp);
    const visualRight = getClosestFace(cameraRight);
    const visualBack  = OPPOSITES[visualFront];
    const visualDown  = OPPOSITES[visualUp];
    const visualLeft  = OPPOSITES[visualRight];

    // map move keys f,b,u,d,l,r,m,s,e to visual faces
    const screenToPhysicalMap = {
        f: visualFront,
        b: visualBack,
        u: visualUp,
        d: visualDown,
        r: visualRight,
        l: visualLeft,
        // slice buttons
        m: FACE_SLICE_LAYER_MAP[visualRight],
        e: FACE_SLICE_LAYER_MAP[visualUp],
        s: FACE_SLICE_LAYER_MAP[visualFront],
    };

    const logicalBase = screenToPhysicalMap[key] || key;

    // Preserve the capital letters for dash moves
    return isUpperCase ? logicalBase.toUpperCase() : logicalBase;
}


export function keyboardControls(cube, syncFunc, cubies, scene, camera, appState) {
  

  window.addEventListener("keydown", (e) => {
    if (appState.isRotating) return; // blocks interrupts

    // translate key based on camera orientation and then access move information from map.
    const newOrientedKey = translateLayer(e.key, camera)
    const moveInfo = moveToCubiePosition[newOrientedKey];

    // if user presses a key thats in the helper map
    if (moveInfo) {
      appState.isRotating = true;
      console.log("CAMERA POSITION: ", camera.position)

      // helper function
      animateMove(moveInfo, cube, syncFunc, cubies, scene, () => {
        appState.isRotating = false;
      });


    }
  });
}

export function animateMove(moveInfo, cubeState, syncFunc, cubies, scene, onComplete) {
  // current layer selected for move
  console.log(cubies)
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


// todo => how do the algorithms work with orientation of the cube? Is it better to have fixed sides to fixed moves to make algorithms work better?