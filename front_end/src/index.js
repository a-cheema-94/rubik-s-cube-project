import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

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
import { loadModels, handlePredictions } from "./testing_models";
import { playAlgorithm } from "./algoStringMoves";
import { solveCubeStraight } from "./straightSolver";
import { setMode, toggleControls } from "./helperFunctions";
import { runAdversarialEvaluationSuite } from "./testing/adversarialTest";
import { benchmarkKociemba, benchmarkNeuralNetworks, generateSampleData } from "./testing/latencyOfModelsAndSolver";


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

// background color (e.g., a dark slate gray)
renderer.setClearColor("#161616", 1);

// ... (camera and renderer setup) ...

// Initialize TrackballControls
const controls = new TrackballControls(camera, renderer.domElement);

// Smooth the movement (damping)
controls.rotateSpeed = 2.0;
controls.panSpeed = 2;
controls.dynamicDampingFactor = 0.3;

// all cubies stored here.
const cubies = [];



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

        console.log(`Coordinates: ${x}, ${y}, ${z}, "FACE COLORS: ", ${faceColors}}`)

        // double check with Desmos 3D calculator

        // Convert our color choices into an array of 6 Three.js materials
        const cubieMaterials = faceColors.map((color) => {
          return new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.2, // Makes them look a bit shiny/plastic-y
            metalness: 0.1,
          });
        });

        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
        // const material = new THREE.MeshStandardMaterial({ color: "#444444" })
        const cubie = new THREE.Mesh(geometry, cubieMaterials);

        cubie.position.set(x, y, z);

        // shadow stuff
        cubie.castShadow = true;
        cubie.receiveShadow = true;

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
console.log("STARTING STATE: ", myStateCube.getCube());


// 40 and 49
let testStateCube =  [
      2, 4, 0, 4, 4, 4, 3, 4, 0, 1, 3, 4,
      2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 4, 2, 4, 0, 0, 0, 0, 0, 0,
      3, 1, 2, 1, 1, 1, 1, 1, 1, 4, 0, 1,
      3, 3, 3, 3, 3, 3
    ]

function syncVisualCubeToState() {
  console.log("rannnn");
  // myStateCube.setCube(testStateCube)
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

  console.log("CURR CUBE VARIABLE", currCube);
  console.log("CURR CUBE STATE: ", myStateCube.getCube())
}

// event listeners

keyboardControls(myStateCube, syncVisualCubeToState, cubies, scene, camera, currAppState);


// scramble button

const scrambleBtn = document.getElementById("btn-scramble");

scrambleBtn.addEventListener("click", () => {
  console.log("scramble button clicked")
  scrambleCube(20, myStateCube, syncVisualCubeToState, cubies, scene, currAppState);

})

let predictedAlgoString = null;

// Models 

const { ollModel, pllModel } = await loadModels();

// buttons
const ollBtn = document.getElementById("btn-predict-oll")
const pllBtn = document.getElementById("btn-predict-pll")

ollBtn.addEventListener("click", async () => {
  const res = await handlePredictions(myStateCube, ollModel, pllModel, "oll", camera)
  console.log(res)
  predictedAlgoString = res
})


pllBtn.addEventListener("click", async () => {
  const res = await handlePredictions(myStateCube, ollModel, pllModel, "pll", camera)
  console.log(res)
  predictedAlgoString = res
})


// using algo strings to initiate moves.

const algoStringInput = document.getElementById("algo-string-input");

algoStringInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // call function
    console.log("PRESSED ENTER IN INPUT FIELD: ", algoStringInput.value);
    playAlgorithm(algoStringInput.value, myStateCube, syncVisualCubeToState, cubies, scene, currAppState)
  }
})


// solve cube button

const solveCubeBtn = document.getElementById("btn-solve-cube");

solveCubeBtn.addEventListener("click", async () => {
  // call function
  console.log("here.....solved....")
  await solveCubeStraight(myStateCube, syncVisualCubeToState, cubies, scene, currAppState)
})

// play Algorithm button when algo displayed on screen and controls toggle button
const playAlgoButton = document.getElementById("play-algo-btn");

playAlgoButton.addEventListener("click", () => {
  console.log("pressed play algo button")
  if(predictedAlgoString) {
    playAlgorithm(predictedAlgoString, myStateCube, syncVisualCubeToState, cubies, scene, currAppState)

  }
}
)

toggleControls();


let isHardMode = false;

setMode(controls, isHardMode)



// TESTING

// const testAdverseBtn = document.getElementById("btn-testing-adverse");

// testAdverseBtn.addEventListener("click", async () => {
//   console.log("clicked Adversarial Test button")
//   const { ollModel, pllModel } = await loadModels();

//   runAdversarialEvaluationSuite(ollModel, pllModel)
// })

// const testNNBtn = document.getElementById("btn-testing-nn")
// const testSolverBtn = document.getElementById("btn-testing-solver")

// const NUM_TRIALS = 50;

// testNNBtn.addEventListener("click", async () => {
//   console.log("clicked NN test button")
//   const { ollModel, pllModel } = await loadModels()

//   let totalOllLat = 0, totalPllLat = 0;
  
//   for (let i=0; i<NUM_TRIALS; i++) {
//     const nnRes = await benchmarkNeuralNetworks(ollModel, pllModel)
//     totalOllLat += nnRes.ollAvgMs
//     totalPllLat += nnRes.pllAvgMs 
//   }

//   const finalRes = {
//     trials: NUM_TRIALS,
//     nnOllAvgMs: parseFloat((totalOllLat / NUM_TRIALS).toFixed(2)),
//     nnPllAvgMs: parseFloat((totalPllLat / NUM_TRIALS).toFixed(2)),
//   }

//   console.log("HERE ARE THE RESULTS FOR NN TRIALS", finalRes)
// })

// // {ollAvgMs: 0.98, pllAvgMs: 0.73}

// // FINAL RESULT: {trials: 50, nnOllAvgMs: 0.21, nnPllAvgMs: 0.22}

// testSolverBtn.addEventListener("click", async () => {
//   console.log("clicked solver test button")

//   let totalKociembaRandomLat = 0, totalKociembaSuperFlipLat = 0
  
//   for (let i=0; i<NUM_TRIALS; i++) {
//     const solverRes = await benchmarkKociemba()
    
//     const superFlipRes = solverRes.find(res => res.type.includes("Superflip"));
//     const randomRes = solverRes.find(res => res.type.includes("Random"));

//     if(superFlipRes) totalKociembaSuperFlipLat += superFlipRes.latencyMs
//     if(randomRes) totalKociembaRandomLat += randomRes.latencyMs
//   }

//   const finalRes = {
//     trials: NUM_TRIALS,
//     kociembaRandomAvgMs: parseFloat((totalKociembaRandomLat / NUM_TRIALS).toFixed(2)),
//     kociembaSuperflipAvgMs: parseFloat((totalKociembaSuperFlipLat / NUM_TRIALS).toFixed(2))
//   }


//   console.log("HERE ARE THE RESULTS FOR SOLVER TRIALS: ", finalRes)
// })


// [ {type: 'Superflip (Worst Case)', latencyMs: 552.5}, {type: 'Random Scramble', latencyMs: 3.7}, {type: 'Random Scramble', latencyMs: 12.9} ]


// FINAL RESULTS: {trials: 50, kociembaRandomAvgMs: 4.29, kociembaSuperflipAvgMs: 498.13}