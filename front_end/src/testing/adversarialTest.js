// SOLVED STATE AND OTHER PRE TESTING STATES
import * as tf from "@tensorflow/tfjs";
import { RubiksCube } from "../rubik's_cube_state";
import { validateCubeForModel } from "../validate_cube_state";

const SOLVED_STATE = [
      4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
      2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
      5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
      0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
      1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
      3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
  ];

// F2L EXAMPLE
const F2L_EXAMPLE_STATE = [
  2, 4, 0, 4, 4, 4, 3, 4, 0, 1, 3, 4,
  2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 4, 2, 4, 0, 0, 0, 0, 0, 0,
  3, 1, 2, 1, 1, 1, 1, 1, 1, 4, 0, 1,
  3, 3, 3, 3, 3, 3
];

// FUNCTIONS FOR GENERATING TEST CASES FOR EACH CATEGORY

// Single flipped edge
function generateFlippedEdgeCases(baseState = F2L_EXAMPLE_STATE) {
  // based on above facelet indexes
  const edgePairs = [
    { name: 'U-F', indices: [7, 10] },
    { name: 'U-R', indices: [5, 37] },
    { name: 'U-B', indices: [1, 46] },
    { name: 'U-L', indices: [3, 28] },
    { name: 'F-D', indices: [16, 19] },
    { name: 'R-D', indices: [43, 23] },
    { name: 'B-D', indices: [52, 25] },
    { name: 'L-D', indices: [34, 21] },
    { name: 'F-R', indices: [14, 39] },
    { name: 'R-B', indices: [41, 48] },
    { name: 'B-L', indices: [50, 30] },
    { name: 'L-F', indices: [32, 12] }
  ];

  return edgePairs.map((edge) => {
    const copy = [...baseState];
    const [i1, i2] = edge.indices;
    
    // Swap facelets to flip orientation
    const temp = copy[i1];
    copy[i1] = copy[i2];
    copy[i2] = temp;

    return {
      id: `FE_${edge.name}`,
      category: 'Single Flipped Edge',
      description: `Edge ${edge.name} inverted at indices ${i1} & ${i2}`,
      state: copy,
      expectedValid: false
    };
  });
}

// Single twisted corner
function generateTwistedCornerCases(baseState = F2L_EXAMPLE_STATE) {
  const cornerTriplets = [
    { name: 'U-F-R', indices: [8, 11, 36] },
    { name: 'U-R-B', indices: [2, 38, 45] },
    { name: 'U-B-L', indices: [0, 47, 27] },
    { name: 'U-L-F', indices: [6, 29, 9] },
    { name: 'D-F-L', indices: [18, 15, 35] },
    { name: 'D-R-F', indices: [20, 42, 17] },
    { name: 'D-B-R', indices: [26, 51, 44] },
    { name: 'D-L-B', indices: [24, 33, 53] }
  ];

  const cases = [];

  cornerTriplets.forEach((corner) => {
    const [a, b, c] = corner.indices;

    // Clockwise twist (A -> B, B -> C, C -> A)
    const cwCopy = [...baseState];
    cwCopy[b] = baseState[a];
    cwCopy[c] = baseState[b];
    cwCopy[a] = baseState[c];

    cases.push({
      id: `TC_${corner.name}_CW`,
      category: 'Single Twisted Corner',
      description: `Corner ${corner.name} twisted CW`,
      state: cwCopy,
      expectedValid: false
    });

    // Counter-Clockwise twist (A -> C, C -> B, B -> A)
    const ccwCopy = [...baseState];
    ccwCopy[c] = baseState[a];
    ccwCopy[a] = baseState[b];
    ccwCopy[b] = baseState[c];

    cases.push({
      id: `TC_${corner.name}_CCW`,
      category: 'Single Twisted Corner',
      description: `Corner ${corner.name} twisted CCW`,
      state: ccwCopy,
      expectedValid: false
    });
  });

  return cases;
}


// Invalid sticker counts -> i.e. 10 of the same sticker instead of 9
function generateStickerCountCases(baseState = F2L_EXAMPLE_STATE) {
  const targetColor = 4; // U color
  const targetIndices = [
    10, 11, 12, 14, 15, // Front facelets (excluding center 13)
    19, 20, 21, 23, 24, // Down facelets (excluding center 22)
    28, 29, 30, 32, 33, // Left facelets (excluding center 31)
    37, 38, 39, 41, 42, // Right facelets (excluding center 40)
    46, 47, 48, 50, 51  // Back facelets (excluding center 49)
  ];

  return targetIndices.map((idx) => {
    const copy = [...baseState];
    copy[idx] = targetColor; // Force 10th upper layer sticker

    return {
      id: `SC_IDX_${idx}`,
      category: 'Invalid Sticker Count',
      description: `Index ${idx} forced to color ${targetColor} (10 '${targetColor}'s total)`,
      state: copy,
      expectedValid: false
    };
  });
}

// Invalid centre configuration -> centre pieces in wrong places.

function generateInvalidCenterCases(baseState = F2L_EXAMPLE_STATE) {
  const centers = [
    { face: 'U', idx: 4 },
    { face: 'F', idx: 13 },
    { face: 'D', idx: 22 },
    { face: 'L', idx: 31 },
    { face: 'R', idx: 40 },
    { face: 'B', idx: 49 }
  ];

  const cases = [];

  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {

      const c1 = centers[i];
      const c2 = centers[j];

      const copy = [...baseState];
      // Swap center values
      copy[c1.idx] = baseState[c2.idx];
      copy[c2.idx] = baseState[c1.idx];

      cases.push({
        id: `IC_${c1.face}_${c2.face}`,
        category: 'Invalid Center Config',
        description: `Centers ${c1.face} (${c1.idx}) and ${c2.face} (${c2.idx}) swapped`,
        state: copy,
        expectedValid: false
      });
    }
  }

  return cases;
}

// console.log(generateInvalidCenterCases(F2L_EXAMPLE_STATE))
// MASTER TEST CASES:
 
export function generateMasterTestCases() {
  return [
    ...generateFlippedEdgeCases(),
    ...generateTwistedCornerCases(),
    ...generateStickerCountCases(),
    ...generateInvalidCenterCases(),

  ]
}

console.log(generateMasterTestCases())

// format: { id, category, description, state, expectedValid }
// MAIN TEST RUNNER
export function runAdversarialEvaluationSuite(ollModel, pllModel) {
  console.log("adversarial testing suite initialized")

  const dataset = generateMasterTestCases();
  console.log(`Generated ${dataset.length} test cases across 4 categories`)

  const results = [];

  for (let i=0; i<dataset.length; i++) {
    const testCase = dataset[i];
    const startTime = performance.now(); // returns timestamp in ms

    let validationResult = null;
    let isValid = false;
    let validationReason = "";

    // execute cases.
    // passes each test case through validator function
    let cubeTestingState = new RubiksCube()
    cubeTestingState.setCube(testCase.state)
    try {
      validationResult = validateCubeForModel(cubeTestingState);

      if(validationResult && validationResult.encodedData) {
        isValid = true;
        validationReason = `Validated as ${validationResult.state.toUpperCase()} state`
      } else {
        isValid = false;
        validationReason = `Rejected by Validator (Invalid config)`
      }
    } catch (error) {
      isValid = false;
      validationReason = `Rejected with Exception: ${error.message}`;
    }
    

    // feed into model
    let ollMaxConf = 0;
    let ollPredictedClass = null;
    let pllMaxConf = 0;
    let pllPredictedClass = null;
    let detectedModelState = validationResult ? validationResult.state : "none";

    // Only run ML inference if the validator accepted the cube state (or bypassed)
    if (isValid && validationResult.encodedData) {
      try {
        tf.tidy(() => {
          // Construct 1D -> 2D Tensor shape [1, 105] from the 105-element one-hot array
          const inputTensor = tf.tensor2d([validationResult.encodedData], [1, 105]);

          // Predict with OLL Model (if detected as 'oll' or testing both)
          if (ollModel && (detectedModelState === 'oll' || detectedModelState === 'both')) {
            const ollPrediction = ollModel.predict(inputTensor);
            const ollProbabilities = ollPrediction.dataSync();
            ollMaxConf = Math.max(...ollProbabilities);
            // convert to array and grab class
            ollPredictedClass = Array.from(ollProbabilities).indexOf(ollMaxConf);
          }

          // Predict with PLL Model (if detected as 'pll' or testing both)
          if (pllModel && (detectedModelState === 'pll' || detectedModelState === 'both')) {
            const pllPrediction = pllModel.predict(inputTensor);
            const pllProbabilities = pllPrediction.dataSync();
            pllMaxConf = Math.max(...pllProbabilities);
            pllPredictedClass = Array.from(pllProbabilities).indexOf(pllMaxConf);
          }
        });
      } catch (err) {
        console.warn(`Model execution error on test case ${testCase.id}:`, err);
      }
    }

    const endTime = performance.now();
    const latencyMs = parseFloat((endTime - startTime).toFixed(2));


    // For adversarial/invalid cases, expectedValid is false.
    // - "PASSED": Validator correctly caught and REJECTED it (isValid === false).
    // - "FAILED (BYPASSED)": Validator incorrectly ACCEPTED it (isValid === true).
    const validatorPassed = (isValid === testCase.expectedValid);
    const status = validatorPassed ? 'PASSED' : 'FAILED (BYPASSED)';

    results.push({
      id: testCase.id,
      category: testCase.category,
      baseStateName: testCase.baseStateName,
      description: testCase.description,
      expectedValid: testCase.expectedValid,
      actualValid: isValid,
      detectedModelState: detectedModelState,
      validationReason: validationReason,
      validatorPassed: validatorPassed,
      maxModelConfidence: Math.max(ollMaxConf, pllMaxConf),
      ollConfidence: parseFloat(ollMaxConf.toFixed(4)),
      ollPredictedClass: ollPredictedClass,
      pllConfidence: parseFloat(pllMaxConf.toFixed(4)),
      pllPredictedClass: pllPredictedClass,
      latencyMs: latencyMs,
      status: status
    });

  }

  const summary = calculateSummaryStats(results);

  console.log("✅ Evaluation Complete!");
  console.table(summary);

  return {
    summary: summary,
    details: results
  };

  





}

function calculateSummaryStats(results) {
  const total = results.length;
  const passed = results.filter(r => r.validatorPassed).length;
  const bypassed = total - passed;
  const avgLatency = results.reduce((acc, r) => acc + r.latencyMs, 0) / total;
  
  // Calculate average model confidence on invalid inputs that bypassed validation
  const bypassedItems = results.filter(r => !r.validatorPassed);
  const avgBypassedConfidence = bypassedItems.length > 0
    ? bypassedItems.reduce((acc, r) => acc + r.maxModelConfidence, 0) / bypassedItems.length
    : 0;

  return {
    totalTestCases: total,
    validatorRejectedCount: passed,
    validatorBypassedCount: bypassed,
    validatorCatchRatePct: parseFloat(((passed / total) * 100).toFixed(2)),
    avgInferenceLatencyMs: parseFloat(avgLatency.toFixed(2)),
    avgBypassedModelConfidence: parseFloat(avgBypassedConfidence.toFixed(4))
  };
}