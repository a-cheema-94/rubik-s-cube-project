import { RubiksCube } from "../rubik's_cube_state.js";
import { convertStateToCubeJS } from "../straightSolver.js";
import * as tf from '@tensorflow/tfjs';
import { validateCubeForModel } from "../validate_cube_state.js";

const sampleOLLs = [
  "r' U2 R U R' U r",
  "r' R2 U R' U R U2 R' U M'",
  "R U2 R2' F R F' R U2 R'",
  "F U R U' R' U R U' R' F'"
];

const samplePLLs = [
  "R U R' U' R' F R2 U' R' U' R U R' F'", 
  "R' U2 R U2 R' F  R U R' U' R' F' R2",
  "R U R' U' D R2 U' R U' R' U R' U R2 D'"
];

export function generateSampleData() {
  const ollTestCases = [];
  const pllTestCases = [];
  const kociembaTestCases = [];

  
  sampleOLLs.forEach(algo => {
    const cube = new RubiksCube(); 
    // Apply OLL in reverse to a solved cube to get the OLL pattern
    ollTestCases.push(cube.getCube());
  });

 
  samplePLLs.forEach(algo => {
    const cube = new RubiksCube();
    cube.applyMoves(algo, true);
    pllTestCases.push(cube.getCube());
  });

  
  const randomScrambles = [
    "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2", // Superflip (Worst-case)
    // random scrambles
    "D2 R2 F2 D2 F2 U R2 D F2 U2 F' R D2 B2 F' U' R' U2 B2",
    "F' L2 B' D2 R2 B' U2 F L2 D2 L' D' R' B' R' B2 D' F R"
  ];

  randomScrambles.forEach((algo, index) => {
    const cube = new RubiksCube();
    cube.applyMoves(algo, false); // Normal apply
    kociembaTestCases.push({
      type: index === 0 ? "Superflip (Worst Case)" : "Random Scramble",
      algo: algo,
      cubeString: convertStateToCubeJS(cube.getCube())
    });
  });

  return { ollTestCases, pllTestCases, kociembaTestCases };
}

console.log(generateSampleData()["pllTestCases"])

// oll and pll neural network tests
export async function benchmarkNeuralNetworks(ollModel, pllModel) {
  const stats = { oll: [], pll: [] };

  
  const runModelTest = (model, cubes, latenciesArray) => {
    if (!model || cubes.length === 0) return;

    // warm up tensor flow system
    const dummyTensor = tf.zeros([1, 105]);
    model.predict(dummyTensor).dispose();
    dummyTensor.dispose();

    
    cubes.forEach(cubeArray => {
      // Encode outside the timer
      const cube = new RubiksCube();
      cube.setCube(cubeArray)
      const validation = validateCubeForModel(cube);
      if (!validation || !validation.encodedData) return;

      const t0 = performance.now();
      tf.tidy(() => {
        const inputTensor = tf.tensor2d([validation.encodedData], [1, 105]);
        model.predict(inputTensor);
      });
      const t1 = performance.now();
      
      latenciesArray.push(t1 - t0);
    });
  };

  runModelTest(ollModel, generateSampleData()["ollTestCases"], stats.oll);
  runModelTest(pllModel, generateSampleData()["pllTestCases"], stats.pll);

  return {
    ollAvgMs: parseFloat((stats.oll.reduce((a, b) => a + b, 0) / stats.oll.length).toFixed(2)),
    pllAvgMs: parseFloat((stats.pll.reduce((a, b) => a + b, 0) / stats.pll.length).toFixed(2))
  };

}


export async function benchmarkKociemba() {
  const results = [];

  for (let i = 0; i < generateSampleData()["kociembaTestCases"].length; i++) {
    const testCase = generateSampleData()["kociembaTestCases"][i];
    
    const t0 = performance.now();
    try {
      await fetch("http://localhost:3000/api/solve", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cubeStateString: testCase.cubeString })
      });
    } catch (err) {
      console.warn(`Kociemba request failed for ${testCase.type}:`, err);
    }
    const t1 = performance.now();
    
    results.push({
      type: testCase.type,
      latencyMs: parseFloat((t1 - t0).toFixed(2))
    });
  }

  return results;
}