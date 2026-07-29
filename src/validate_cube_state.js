import { RubiksCube } from "./rubik's_cube_state.js";
import { LAST_LAYER_INDICES, oneHotEncode } from "../ml_section/generateSampleData.js";
import { colorToFacesNormalizer } from "../ml_section/colorNormalizer.js";


// todo => don't know current face to apply oll algorithm once outputted by model. Need some way of knowing if should rotate to match the pattern -> OLL: just need to match upper layer color, normalizer not working since it is matching all colors.
// todo => Re use normalized array again?

export function validateCubeForModel(cube) {
  
  const orientedF2LSolvedCube = verifyF2lAndOrientCube(cube);

  if (!orientedF2LSolvedCube) {
    console.warn("Cannot give OLL prediction, first two layers unsolved")
    return {encodedData: null, state: "none", currCube: null};
  }
  


  // state flag: Oll or Pll?
  const upFace = orientedF2LSolvedCube.getCube().slice(0, 9);
  const isOllSolved = upFace.every(val => val === upFace[0]);
  const cubeState = isOllSolved ? "pll" : "oll";

  // get top layer stickers for training
  const topLayerColors = LAST_LAYER_INDICES.map(idx => orientedF2LSolvedCube.getCube()[idx])

  // normalize topLayerColors -> map colors to faces
  const normalizedColors = colorToFacesNormalizer(topLayerColors, orientedF2LSolvedCube.getCube())


  // one hot encoding
  const encodedData = oneHotEncode(normalizedColors)
  
  return { encodedData, state: cubeState, currCube: orientedF2LSolvedCube };
}



export function verifyF2lAndOrientCube (cube) {
  // iterate through each face (i.e. 6 x 9) -> when find a solved face perform rotations.
  // Then check if adjacent squares in next two layers are solved. if solved -> return new cube, if not then continue.
  // If no solve then return null


  const facesInOrder = ["U", "F", "D", "L", "R", "B"];
  const stateArr = cube.getCube();

  const moveFaceToBottomMap = {
    "U": ["moveX", "moveX"],
    "F": ["moveXDash"],
    "D": [], // no moves necessary
    "L": ["moveZDash"],
    "R": ["moveZ"],
    "B": ["moveX"],
  }

  for (let i=0; i<6; i++) {
    const faceName = facesInOrder[i];
    const currFace = stateArr.slice(i*9, i*9+9);

    if (currFace.every(sticker => sticker === currFace[0])) {
      // we have solid face so rotate cube so clone cube and rotate face so face at bottom.
      const dummyCube = new RubiksCube()
      dummyCube.setCube([...stateArr])

      moveFaceToBottomMap[faceName].forEach(move => dummyCube[move]())

      // use verify F2L function to check adjacent squares are equal
      if (verifyF2LSolved(dummyCube.getCube())) {
        return dummyCube
      }
    }
  }


  return null;
}


// need to verify that first two layers are properly solved before ready for model predictions
function verifyF2LSolved(orientedCube) {
  // first indexes for each adjacent face: F, L, R, B
  const adjacentFaceIdxs = [9, 27, 36, 45]
  for (const faceIdx of adjacentFaceIdxs) {
    
    const centerColor = orientedCube[faceIdx + 4];

    // check bottom two rows of each face, 3-8 each added to a face index against the center color for current face.
    for (let i=3; i<=8; i++) {
      if (orientedCube[faceIdx + i] !== centerColor) {
        return false
      }
    }
  }


  console.log("Satisfies F2L!!!")
  return true;
}














export function calculatePreYRotation(cube, normalizedPattern, modelType) {
  // clone cube
  const dummyCube = new RubiksCube();
  dummyCube.setCube([...cube.getCube()]);

  const centerColorRef = cube.getCube()

  const yMoves = ["", "y", "y2", "y'"];
  const yRotations = ["", "moveY", "moveY2", "moveYDash"];

  for (let i=0; i<4; i++) {
    // i=0 => no move, i=1 => y, i=2 => y2, i=3 => y'
    if(i > 0) {
      dummyCube.moveY();
    }

    const topLayer = LAST_LAYER_INDICES.map(idx => dummyCube.getCube()[idx]);
    console.log("CURRENT TOP LAYER PRE Y: ", topLayer)

    const normalizedTopLayer = colorToFacesNormalizer(topLayer, centerColorRef);

    console.log("NORMALIZED LAYER PRE Y: \n", normalizedTopLayer)
    // check is normalized top layer for current cube is the same as the one in predicted algorithm

    // todo => handle model type matching here
    let isMatched = false;
    if (modelType === 'oll') {
      console.log("OLL MODEL TYPE!!!!")
      isMatched = isOllMatch(normalizedTopLayer, normalizedPattern)
    } else if (modelType === 'pll') {
      isMatched = normalizedTopLayer.every((val, idx) => val === normalizedPattern[idx]);
    }

    console.log("INDEX: ", i)
    console.log("IS MATCHED", isMatched)

    if (isMatched) return yMoves[i]

  }

  return "";
}


function isOllMatch(arr1, arr2) {
  
  console.log("ARRAY ONE: ", arr1 )
  console.log("ARRAY TWO: ", arr2 )

  for (let i=0; i<arr1.length; i++) {
    
    if(arr1[i] === 0 && arr2[i] !== 0) return false;
    if (arr1[i] !== 0 && arr2[i] === 0) return false;


  }
  return true

}