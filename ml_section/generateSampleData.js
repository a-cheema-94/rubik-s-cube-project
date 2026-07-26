// import { LAST_LAYER_ALGO_STORE } from "./oll_pll_algos.js"
import { COLORS, RubiksCube } from "../rubik's_cube_state.js";
import { colorToFacesNormalizer } from "./colorNormalizer.js";


const SAMPLE_SOLVED_CUBE = [
  4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
  2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
  5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
  0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
  1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
  3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
]


// steps for generating sample data for model.
  // Indices fixed to faces?
  // apply all algorithm and find inverses and relationships. - DONE
  // how to split top layer from whole cube
  // work out what configurations to apply for a varied training set.

 

function getUpperFaceColor(cubeState) {
  const upper_face_idx = 4;
  return cubeState[upper_face_idx];
}

const cube = new RubiksCube();


console.log("============START=============")
console.log(getUpperFaceColor(cube.getCube()))
console.log("CURR CUBE STATE: ", cube.getCube())
console.log("============END=============")

const LAST_LAYER_INDICES = [
  0,1,2,3,4,5,6,7,8, // upper layer

  9,10,11, // adjacent face pieces
  36,37,38, // adjacent right pieces
  27,28,29, // adjacent left pieces
  45,46,47, // adjacent back pieces
];


// generate data
// initialize a new cube state
// apply CFOP algos to it
// need permutations -> four different states with the U face (U U' U2 and nothing) and four different views with (y, y' y2 and nothing)
  // -> makes network more robust to recognize algorithm from different angles. i.e. 4x4 = 16 variations
  
// 

export function oneHotEncode (arr) {
  let finalArr = new Array(arr.length).fill(null);
  arr.forEach((sticker, idx) => {
    let newStickerArr = new Array(5).fill(0)
    // five possible sides for each sticker, U, L, R, F, B, no D face since only considering the top layer.

    if(sticker >= 0 && sticker <= 4) {
      newStickerArr[sticker] = 1
    } else {
      console.warn(`Invalid value detected!: ${sticker}`)
    }
    finalArr[idx] = newStickerArr
  })

  let finalFinalArr = []
  finalArr.forEach(binArr => {
    finalFinalArr.push(...binArr)
  })

  return finalFinalArr;
}



export class SyntheticDataGenerator {
  constructor(stateCube, normalizer, oneHotEncode) {
    this.cube = stateCube;
    this.normalizer = normalizer;
    this.oneHotEncode = oneHotEncode;
    this.dataset = [];
  }

  generateDataSamples(algoSet, targetClass) {
    const upperPermutations = ["", "U", "U2", "U'"]
    const viewPermutations = ["", "y", "y2", "y'"]

    for (const yMove of viewPermutations) {
      for (const uMove of upperPermutations) {
        // reset cube before each iteration
        this.cube.reset();

        // because we use relative positions in the color normalizer, we don't need to worry about mixing up the cube with different colors after reset, the neural network will only have face positions, regardless of what colors there are.

        // apply moves to cube state array in reverse to get target algo pattern
        this.cube.applyMoves(algoSet, true);

        // apply permutations -> apply a upper layer move and vary the view after
        if (uMove) this.cube.applyMoves(uMove);
        if (yMove) this.cube.applyMoves(yMove);


        // get top layer stickers for training
        const topLayerColors = LAST_LAYER_INDICES.map(idx => this.cube.getCube()[idx])

        // normalize topLayerColors -> map colors to faces
        const normalizedColors = this.normalizer(topLayerColors, this.cube.getCube())

        // one hot encoding
        const encodedData = this.oneHotEncode(normalizedColors)

        // put data in dataset
        this.dataset.push({ data: encodedData, target: targetClass })
      }
    }
  }
}

const test_data_generation = new SyntheticDataGenerator(cube, colorToFacesNormalizer, oneHotEncode)

test_data_generation.generateDataSamples("R U R' U R U2 R'", "solved_cross_1")

console.log("TEST DATA SET LENGTH: ", test_data_generation.dataset)




// const originalState = [
//       4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
//       2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
//       5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
//       0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
//       1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
//       3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
// ]

// const sampleUpperLayer = [
//       2, 4, 0, 4, 4, 4, 1,
//       4, 4, 2, 1, 1, 3, 2,
//       4, 0, 0, 4, 3, 3, 4
//     ]


// console.log(colorToFacesNormalizer(sampleUpperLayer, originalState))