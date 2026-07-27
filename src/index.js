import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
// import { generateCubies } from './generate_cubies'

import {
  RED,
  ORANGE,
  WHITE,
  YELLOW,
  GREEN,
  BLUE,
  INNER_CUBE_COLOR,
} from "./cube_colors";

import { COORDINATES_TO_STATE_INDEXES } from "./state_to_visual";
import { COLORS, RubiksCube } from "./rubik's_cube_state";
import { keyboardControls } from "./controls";
import { scrambleCube } from "./scramble";
import { testModelLoading } from "./testing_models";

// variable to lock screen when sequence of moves (scramble) in progress
const currAppState = { isRotating: false }

// pull canvas from html
const canvas = document.querySelector("canvas");

// Create the Scene (This holds all your 3D objects, lights, etc.)
const scene = new THREE.Scene();

// Create the PerspectiveCamera
// Arguments: Field of View (degrees), Aspect Ratio, Near clipping plane, Far clipping plane
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Move the camera back a bit so we aren't inside the center of the scene (0,0,0)
camera.position.z = 4;
camera.position.y = 2;
camera.position.x = -2

// Create the WebGLRenderer and link it to your canvas
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

// Set the size of the renderer to match your canvas boundaries
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Optional: Set a nice background color (e.g., a dark slate gray)
renderer.setClearColor("#161616", 1);

// ... (camera and renderer setup) ...

// Initialize OrbitControls
const controls = new TrackballControls(camera, renderer.domElement);

// Optional: Smooth the movement (damping)
controls.rotateSpeed = 2.0;
controls.panSpeed = 2;
controls.dynamicDampingFactor = 0.3;
controls.keys = ["KeyA", "KeyB", "KeyC"]

// all cubies stored here.
const cubies = [];


// OPTION: mouse clicking for rotations

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// renderer.domElement.addEventListener("click", (e) => {
//   console.log("cube clicked")
//   // set mouse coordinates
//   const rectangle = renderer.domElement.getBoundingClientRect()
//   console.log(rectangle)

//   mouse.x = ((e.clientX - rectangle.left) / rectangle.width) * 2 - 1;
//   mouse.y = -((e.clientY - rectangle.top) / rectangle.height) * 2 + 1;

//   // fire ray through mouse position
//   raycaster.setFromCamera(mouse, camera);


//   const intersects = raycaster.intersectObjects(cubies, true);


//   if (intersects.length > 0) {
//     const clickedCubie = intersects[0].object.position;

//     console.log(clickedCubie)

//     const clickedCubieDirection = intersects[0].normal;
//     console.log(clickedCubieDirection)
//   }
// })





function generateCubies() {
  let count = 0;

  // generate 3 x 3 x 3 cubies
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        count++;

        // Create an array of 6 materials for each box. Give internal hidden faces a neutral color (like dark gray or black), and outer faces your COLORS mapping.
        // BoxGeometry colors array for 6 faces: [ 0: Right side (+ve X), 1: Left side (-ve X), 2: Top side (+ve  Y), 3: Bottom side (-ve Y), 4: Front side: (+ve z), 5: Back side: (-ve z) ]

        let faceColors = new Array(6).fill(INNER_CUBE_COLOR);

        // console.log("INITIAL ARRAYS: ", faceColors)
        // Check coordinates to see which faces are on the outside, and apply colors

        if (x === 1) faceColors[0] = YELLOW; // Right face is outside
        if (x === -1) faceColors[1] = WHITE; // Left face is outside
        if (y === 1) faceColors[2] = ORANGE; // Top face is outside
        if (y === -1) faceColors[3] = RED; // Bottom face is outside
        if (z === 1) faceColors[4] = BLUE; // Front face is outside
        if (z === -1) faceColors[5] = GREEN; // Back face is outside

        // console.log(`Coordinates: ${x}, ${y}, ${z}, ${faceColors}}`)

        // double check with Desmos 3D calculator

        // console.log("COLOR ARRAYS: ", faceColors)

        // 3. Convert our color choices into an array of 6 Three.js materials
        const cubieMaterials = faceColors.map((color) => {
          return new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.2, // Makes them look a bit shiny/plastic-y
            metalness: 0.1,
          });
        });

        const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        // const material = new THREE.MeshStandardMaterial({ color: "#444444" })
        const cubie = new THREE.Mesh(geometry, cubieMaterials);

        cubie.position.set(x, y, z);

        cubie.castShadow = true;
        cubie.receiveShadow = true;

        // console.log(`${cubie.position.x},${cubie.position.y},${cubie.position.z}: ${COORDINATES_TO_STATE_INDEXES[`${cubie.position.x},${cubie.position.y},${cubie.position.z}`]}`)

        // cubie.material[0].color.set("#f210c1")

        scene.add(cubie);

        cubies.push(cubie);
      }
    }
  }
}

generateCubies();
console.log("ALL CUBIES: ", cubies);

// The Animation/Render Loop
function animate() {
  requestAnimationFrame(animate);


  controls.update();
  
  // console.log(camera.position)
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // test rotations
  // const layerToMove = cubies.filter(cubie => cubie.position.x === 0)
  // const pivot = new THREE.Group()
  // scene.add(pivot)
  // layerToMove.forEach(cubie => pivot.attach(cubie))
  // pivot.rotateX(0.02)

  // This is the magic line that actually draws the scene from the camera's perspective
  renderer.render(scene, camera);
}

// Start the loop!
animate();

// add lights

// Ambient Light (Provides soft, overall illumination so shadows aren't pitch black)
const ambientLight = new THREE.AmbientLight("#ffffff", 0.6); // color, intensity
scene.add(ambientLight);

// Directional Light (Acts like the sun, mimicking parallel rays to create depth)
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.9); // color, intensity
directionalLight.position.set(5, 5, 5); // Position it up, right, and forward
scene.add(directionalLight);

// SYNC state to visuals
let myStateCube = new RubiksCube();
let currentCubeState;
console.log("STARTING STATE: ", myStateCube.getCube());

function syncVisualCubeToState() {
  // console.log("rannnn");
  const currCube = myStateCube.getCube();

  cubies.forEach((cubie) => {
    const key = `${cubie.position.x},${cubie.position.y},${cubie.position.z}`;
    const stateIndexArray = COORDINATES_TO_STATE_INDEXES[key];

    // iterate through cubie material and put that index in the stateIndexArray.
    // If the index is not null, then we set the color of the material that matches the index

    cubie.material.forEach((mat, idx) => {
      const stateIdx = stateIndexArray[idx];

      if (stateIdx != null) {
        const colorCode = currCube[stateIdx]; // e.g. 0, 1, 2, 3, 4, 5
        const colorName = COLORS[colorCode];

        // console.log(key, colorCode);
        mat.color.set(colorName); // repaint color
      }
    });
  });

  console.log(currCube);
  console.log("Current cube state: ", myStateCube.getCube())
}

// event listeners

keyboardControls(myStateCube, syncVisualCubeToState, cubies, scene, camera, currAppState);


// scramble button

const scrambleBtn = document.getElementById("scramble");

scrambleBtn.addEventListener("click", () => {
  console.log("scramble button clicked")
  scrambleCube(20, myStateCube, syncVisualCubeToState, cubies, scene, currAppState);

})

// model tests
// testModelLoading();

// oll model trigger button


// pll model trigger button