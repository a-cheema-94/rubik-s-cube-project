import { LAST_LAYER_ALGO_STORE } from "../ml_section/oll_pll_algos.js";
import { playAlgorithm } from "./algoStringMoves.js";
import { RubiksCube } from "./rubik's_cube_state.js";


function getReverseCubeMoves(algoString) {
  let cubeMoves = algoString.trim().split(/\s+/);

  cubeMoves = cubeMoves.toReversed().map(move => {
    // cases: ', 2, plain
    if (move.includes("'")) return move.replace("'", "");
    if (move.includes("2")) return move;
    return move + "'"
  })

  return cubeMoves;
}

// console.log(getReverseCubeMoves("S R' U' R U R U R U' R' S'"))

export async function generateRandomF2LStates(cubeState, syncFunc, cubies, scene, appState) {
  
  
  const ollAlgos = [...Object.values(LAST_LAYER_ALGO_STORE.oll), ...Object.values(LAST_LAYER_ALGO_STORE.pll)].map(res => res.algo)
  const randomF2LAlgo = ollAlgos[Math.floor(Math.random() * ollAlgos.length)];
  let algoString = getReverseCubeMoves(randomF2LAlgo).join(" ")


  await playAlgorithm(algoString, cubeState, syncFunc, cubies, scene, appState)

  console.log("Generated random F2L state!!")
}