import { RubiksCube } from "./rubik's_cube_state.js";
import { LAST_LAYER_INDICES, oneHotEncode } from "../ml_section/generateSampleData.js";
import { colorToFacesNormalizer } from "../ml_section/colorNormalizer.js";


// todo => finding pll case tricky -> since currFace could be top or bottom. -> have to check for f2l straight away.
// todo => don't know current face to apply oll algorithm once outputted by model. Need some way of knowing if should rotate to match the pattern

export function validateCubeForModel(cube) {
  // make deep copy of cube state so no synching errors
  const dummyCube = new RubiksCube();
  dummyCube.setCube([...cube.getCube()]);

  let facesInOrder = ["U", "F", "D", "L", "R", "B"]
  let currentSolvedFace = null;

  for (let i=0; i<6; i++) {
    let currFace = [...dummyCube.getCube().slice(i*9, i*9+9)]
    if (currFace.every(val => val === currFace[0])) {
      currentSolvedFace = facesInOrder[i]
      break;
    }

  }

  if (!currentSolvedFace) {
    console.warn("Cannot give OLL prediction, no fully solved face")
    return {encodedData: null, state: "none"};
  }
  

  const moveFaceToBottomMap = {
    "U": ["moveX", "moveX"],
    "F": ["moveXDash"],
    "L": ["moveZDash"],
    "R": ["moveZ"],
    "B": ["moveX"],
    "D": [] // no moves necessary
  }

  const movesToApply = moveFaceToBottomMap[currentSolvedFace]
  movesToApply.forEach(move => dummyCube[move]());

  console.log("SHOULD BE AT RIGHT ORDER: ", dummyCube.getCube())
  console.log("LAST LAYER: ", dummyCube.getCube().slice(18, 27))

  // check for F2L solve
  const solvedF2L = verifyF2LSolved(dummyCube.getCube())
  if(!solvedF2L) {
    console.warn("Bottom face is solved but corners are incorrect, F2L NOT satisfied!!")
    return { encodedData: null, state: "none" };
  }


  // state flag: Oll or Pll?
  const upFace = dummyCube.getCube().slice(0, 9);
  const isOllSolved = upFace.every(val => val === upFace[0]);
  const cubeState = isOllSolved ? "pll" : "oll";

  // get top layer stickers for training
  const topLayerColors = LAST_LAYER_INDICES.map(idx => dummyCube.getCube()[idx])

  // normalize topLayerColors -> map colors to faces
  const normalizedColors = colorToFacesNormalizer(topLayerColors, dummyCube.getCube())


  // one hot encoding
  const encodedData = oneHotEncode(normalizedColors)
  
  return { encodedData, state: cubeState };
}


// need to verify that first two layers are properly solved before ready for model predictions
function verifyF2LSolved(orientedCube) {
  // first indexes for each adjacent face: F, L, R, B
  const adjacentFaceIdxs = [9, 27, 36, 45]
  for (const face of adjacentFaceIdxs) {
    
    const centerColor = orientedCube[face + 4];

    // check bottom two rows of each face, 3-8 each added to a face index.
    for (let i=3; i<=8; i++) {
      if (orientedCube[face + i] !== centerColor) {
        return false
      }
    }
  }


  console.log("Satisfies F2L!!!")
  return true;
}



// TESTS

let algoToTest = "R U2 R2 F R F' U2 R' F R F'"
let moveForVariation = "moveZ"

// function testValidateCubeForModel(algoToTest, moveForVariation) {

//   const testing_cube = new RubiksCube();
//   testing_cube.applyMoves(algoToTest, true);

//   const test1 = [...testing_cube.getCube()]
//   console.log("INITIAL BOTTOM LAYER: ", testing_cube.getCube().slice(18, 27))
//   testing_cube[moveForVariation]();
//   console.log("BOTTOM LAYER AFTER MOVE: ", testing_cube.getCube())
//   console.log(testing_cube.getCube().slice(18, 27))
  
  
//   const test2 = validateCubeForModel(testing_cube).getCube();
  
//   const arrayEquals = (a, b) => a.length === b.length && a.every((val, idx) => val === b[idx]);
  
//   if(arrayEquals(test1, test2)) {
//     console.log("SUCCESSSSS!!!!!!!")
//   } else {
//     console.log("FAILURE !!!")
//   }
// }



// console.log("=================TESTS BEGIN==================")
// testValidateCubeForModel(algoToTest, moveForVariation)
// console.log("=================TESTS END==================")


const finalTestingCube = new RubiksCube();
console.log("INITIAL STATE: ", finalTestingCube.getCube())
finalTestingCube.applyMoves(algoToTest, true)
finalTestingCube[moveForVariation]();

const finalOutputTest = validateCubeForModel(finalTestingCube);

console.log(finalOutputTest.length)



