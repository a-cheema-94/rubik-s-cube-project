// Map standard CFOP notation to your internal MOVE_MAP keys

import { animateMove } from "./controls.js";
import { moveToCubiePosition } from "./rotating_animations.js";
import { updateUIButtons } from "./helperFunctions.js";

const CFOP_TO_MAP = {
  U: "u",
  "U'": "U",
  Uw: "uw",
  "Uw'": "Uw",
  u: "uw",
  "u'": "Uw",
  D: "d",
  "D'": "D",
  Dw: "dw",
  "Dw'": "Dw",
  d: "dw",
  "d'": "Dw",
  L: "l",
  "L'": "L",
  Lw: "lw",
  "Lw'": "Lw",
  l: "lw",
  "l'": "Lw",
  R: "r",
  "R'": "R",
  Rw: "rw",
  "Rw'": "Rw",
  r: "rw",
  "r'": "Rw",
  F: "f",
  "F'": "F",
  Fw: "fw",
  "Fw'": "Fw",
  f: "fw",
  "f'": "Fw",
  B: "b",
  "B'": "B",
  Bw: "bw",
  "Bw'": "Bw",
  b: "bw",
  "b'": "Bw",
  M: "m",
  "M'": "M",
  E: "e",
  "E'": "E",
  S: "s",
  "S'": "S",
  x: "x",
  "x'": "X",
  y: "y",
  "y'": "Y",
  z: "z",
  "z'": "Z",
};



export async function playAlgorithm(
  algoString,
  cubeState,
  syncFunc,
  cubies,
  scene,
  appState,
) {
  if (!algoString || appState.isRotating) return;
  console.log("called play algo function");
  let rawMoves = algoString.trim().split(/\s+/);
  let playbackQueue = [];

  // Expand '2' moves into two separate moves for the animation queue
  for (const move of rawMoves) {
    const baseMove = move.replace("2", "");
    const mappedKey = CFOP_TO_MAP[baseMove];

    if (mappedKey) {
      playbackQueue.push(mappedKey);
      if (move.includes("2")) {
        playbackQueue.push(mappedKey); // Add a second time
      }
    } else {
      console.warn(`Unrecognized move: ${move}`);
    }
  }

  // use queue to execute in order.
  for (const internalKey of playbackQueue) {
    const moveConfig = moveToCubiePosition[internalKey];
    if (!moveConfig) continue;

    appState.isRotating = true; // Lock the system

    // Wrap animateMove in a Promise so the for-loop waits for the animation to finish
    await new Promise((resolve) => {
      animateMove(moveConfig, cubeState, syncFunc, cubies, scene, () => {
        appState.isRotating = false;
        resolve(); // This allows the loop to continue to the next move
      });
    });

    
  }
}
