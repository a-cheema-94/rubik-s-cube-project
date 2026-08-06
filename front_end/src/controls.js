import * as THREE from "three";
import { moveToCubiePosition } from "./rotating_animations.js";
import { COLORS } from "./rubik's_cube_state.js";



// current faces with three js vectors and opposites map
const PHYSICAL_FACES = [
    { name: 'r', vector: new THREE.Vector3(1, 0, 0) }, // X = 1
    { name: 'l', vector: new THREE.Vector3(-1, 0, 0) }, // X = -1
    { name: 'u', vector: new THREE.Vector3(0, 1, 0) }, // Y = 1
    { name: 'd', vector: new THREE.Vector3(0, -1, 0) }, // Y = -1
    { name: 'f', vector: new THREE.Vector3(0, 0, 1) }, // Z = 1
    { name: 'b', vector: new THREE.Vector3(0, 0, -1) } // Z = -1
];

// console.log(PHYSICAL_FACES[0].vector.x)

const VALID_OUTER_FACE_MOVES = ['r','l','u','d','f','b','R','L','U','D','F','B']

// NOTE: m runs parallel to l and r on x axis, e runs parallel to u and d on y axis
// and s runs parallel to f and b on z axis.
const FACE_SLICE_LAYER_MAP = { r: 'm', l: 'm', u: 'e', d: 'e', f: 's', b: 's' }
// this map will use whatever physical face there is to successfully identify a slice layer.

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

// issue with slices. slices always spin in same direction despite camera orientation
// recognize that m slice spins in the same direction as left, e slice spins in the same direction as down
// and s slice spins in the same direction as front
// to get slice to spin in same direction regardless of camera orientation we have to flip the direction i.e. "m" to "M" if
// user expects opposites depending on the current physical face
const SLICE_DIRECTIONS = { m: "l", e: "d", s: "f" }

function flipSlice(sliceChar) {
  return sliceChar === sliceChar.toLowerCase() ? sliceChar.toUpperCase() : sliceChar.toLowerCase();
}


const FACE_TO_AXIS = {
  r: { axis: 'x', sign: 1 },
  l: { axis: 'x', sign: -1 },
  u: { axis: 'y', sign: 1 },
  d: { axis: 'y', sign: -1 },
  f: { axis: 'z', sign: 1 },
  b: { axis: 'z', sign: -1 },
}

// Dynamic translation system
export function translateLayer(pressedKey, camera) {
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

    let finalTranslatedKey;
    
    // rotation around x axis: visualRight
    // rotation around y axis: visualUp
    // rotation around z axis: visualFront
    if (['x', 'y', 'z'].includes(key)) {
      let currPhysicalAxis;
      if (key === 'x') {
        currPhysicalAxis = visualRight;
      } else if (key === 'y') {
        currPhysicalAxis = visualUp;
      } else if (key === 'z') {
        currPhysicalAxis = visualFront;
      }

      const axisMapping = FACE_TO_AXIS[currPhysicalAxis]
      finalTranslatedKey = axisMapping.axis;

      // reverse negative axis direction
      if (axisMapping.sign === -1) {
        finalTranslatedKey = flipSlice(finalTranslatedKey);
      }


    } else if (['m', 'e', 's'].includes(key)) {
      let currPhysicalSlice, direction;
      
      if (key === 'm') {
        currPhysicalSlice =  FACE_SLICE_LAYER_MAP[visualRight];
        direction = visualLeft
      } else if (key === 'e') {
        currPhysicalSlice = FACE_SLICE_LAYER_MAP[visualUp];
        direction = visualDown;
      } else if (key === 's') {
        currPhysicalSlice = FACE_SLICE_LAYER_MAP[visualFront];
        direction = visualFront;
      }

      const currPhysicalDirection = SLICE_DIRECTIONS[currPhysicalSlice];
      finalTranslatedKey = currPhysicalSlice;

      // flip physical slice if not spinning in right direction.
      if (direction !== currPhysicalDirection) {
        finalTranslatedKey = flipSlice(finalTranslatedKey)
      }



    } else {
      // map move keys f,b,u,d,l,r,m,s,e to visual faces
      const screenToPhysicalMap = {
          f: visualFront,
          b: visualBack,
          u: visualUp,
          d: visualDown,
          r: visualRight,
          l: visualLeft,
      };
      finalTranslatedKey = screenToPhysicalMap[key] || key;

    }



    
    // Preserve the capital letters for dash moves
    return isUpperCase ? flipSlice(finalTranslatedKey) : finalTranslatedKey
}


export function keyboardControls(cube, syncFunc, cubies, scene, camera, appState) {

  // cannot use alt key (keyboard shortcuts) so use w + move key to trigger double layer move
  // have another event listener to disable holding "w" variable boolean when user is not holding it.
  let isHoldingW = false;
  
  
  window.addEventListener("keydown", (e) => {

    // allows user to hold w with no behavior expect in conjunction with other moves.
    if (e.code === "KeyW") {
      isHoldingW = true;
      console.log("RETURNED COS OF HOLDING W")
      return;
    }
    
    console.log("HOLDING W VARIABLE", isHoldingW)
    if(isHoldingW) console.log("KEY AFTER HOLDING W ", e.key)

    if (appState.isRotating) {
      console.log("DON'T INTERRUPT ME!!!")
      return;
    } // blocks interrupts

    // translate key based on camera orientation and then access move information from map.
    let newOrientedKey = translateLayer(e.key, camera)

    if (isHoldingW && VALID_OUTER_FACE_MOVES.includes(newOrientedKey)) {
      newOrientedKey = newOrientedKey + "w"
    }

    console.log("KEY CODE: ", newOrientedKey)

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
  
  // when user doesn't hold w -> normal moves.
  window.addEventListener("keyup", (e) => {
  if (e.code === "KeyW") {
    isHoldingW = false;
    console.log("IS HOLDING W: ", isHoldingW)
  }
})
  
}


export function animateMove(moveInfo, cubeState, syncFunc, cubies, scene, onComplete) {
  // current layer selected for move
  console.log("CUBIES INSIDE ANIMATE FUNCTION: ", cubies)

  // now need to select multiple layers for double layer moves and x and y rotations
  const cubiesActiveLayer = cubies.filter((cubie) => {
    return moveInfo.values.includes(Math.round(cubie.position[moveInfo.axis]));
  });

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
  // set for anticlockwise rotations
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

      console.log("MOVE TRIGGERED: ", moveInfo.move)

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
