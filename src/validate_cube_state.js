import { RubiksCube } from "./rubik's_cube_state.js";
import {
  LAST_LAYER_INDICES,
  oneHotEncode,
} from "../ml_section/generateSampleData.js";
import { colorToFacesNormalizer } from "../ml_section/colorNormalizer.js";

export function validateCubeForModel(cube) {
  const orientedF2LSolvedCube = verifyF2lAndOrientCube(cube);

  if (!orientedF2LSolvedCube) {
    console.warn("Cannot give OLL prediction, first two layers unsolved");
    return { encodedData: null, state: "none", currCube: null };
  }

  // state flag: Oll or Pll?
  const upFace = orientedF2LSolvedCube.getCube().slice(0, 9);
  const isOllSolved = upFace.every((val) => val === upFace[0]);
  const cubeState = isOllSolved ? "pll" : "oll";

  // get top layer stickers for training
  const topLayerColors = LAST_LAYER_INDICES.map(
    (idx) => orientedF2LSolvedCube.getCube()[idx],
  );

  // normalize topLayerColors -> map colors to faces
  const normalizedColors = colorToFacesNormalizer(
    topLayerColors,
    orientedF2LSolvedCube.getCube(),
  );

  // one hot encoding
  const encodedData = oneHotEncode(normalizedColors);

  return { encodedData, state: cubeState, currCube: orientedF2LSolvedCube };
}

export function verifyF2lAndOrientCube(cube) {
  // iterate through each face (i.e. 6 x 9) -> when find a solved face perform rotations.
  // Then check if adjacent squares in next two layers are solved. if solved -> return new cube, if not then continue.
  // If no solve then return null

  const facesInOrder = ["U", "F", "D", "L", "R", "B"];
  const stateArr = cube.getCube();

  const moveFaceToBottomMap = {
    U: ["moveX", "moveX"],
    F: ["moveXDash"],
    D: [], // no moves necessary
    L: ["moveZDash"],
    R: ["moveZ"],
    B: ["moveX"],
  };

  for (let i = 0; i < 6; i++) {
    const faceName = facesInOrder[i];
    const currFace = stateArr.slice(i * 9, i * 9 + 9);

    if (currFace.every((sticker) => sticker === currFace[0])) {
      // we have solid face so rotate cube so clone cube and rotate face so face at bottom.
      const dummyCube = new RubiksCube();
      dummyCube.setCube([...stateArr]);

      moveFaceToBottomMap[faceName].forEach((move) => dummyCube[move]());

      // use verify F2L function to check adjacent squares are equal
      if (verifyF2LSolved(dummyCube.getCube())) {
        return dummyCube;
      }
    }
  }

  return null;
}

// need to verify that first two layers are properly solved before ready for model predictions
function verifyF2LSolved(orientedCube) {
  // first indexes for each adjacent face: F, L, R, B
  const adjacentFaceIdxs = [9, 27, 36, 45];
  for (const faceIdx of adjacentFaceIdxs) {
    const centerColor = orientedCube[faceIdx + 4];

    // check bottom two rows of each face, 3-8 each added to a face index against the center color for current face.
    for (let i = 3; i <= 8; i++) {
      if (orientedCube[faceIdx + i] !== centerColor) {
        return false;
      }
    }
  }

  console.log("Satisfies F2L!!!");
  return true;
}

export function calculatePreRotations(cube, normalizedPattern, modelType) {
  // moves
  const yMoves = ["", "y", "y2", "y'"];
  const uMoves = ["", "U", "U2", "U'"];

  // double for loop for every permutation of y and U rotations.
  for (let u = 0; u < 4; u++) {
    for (let y = 0; y < 4; y++) {
      // clone cube
      const dummyCube = new RubiksCube();
      dummyCube.setCube([...cube.getCube()]);

      // apply the y or U rotations to dummyCube if y or U are > 0
      if (u === 1) dummyCube.moveU();
      if (u === 2) {
        dummyCube.moveU();
        dummyCube.moveU();
      }
      if (u === 3) dummyCube.moveUDash();

      if (y === 1) dummyCube.moveY();
      if (y === 2) {
        dummyCube.moveY();
        dummyCube.moveY();
      }
      if (y === 3) dummyCube.moveYDash();

      const topLayer = LAST_LAYER_INDICES.map(
        (idx) => dummyCube.getCube()[idx],
      );
      console.log("CURRENT TOP LAYER PRE Y: ", topLayer);

      const normalizedTopLayer = colorToFacesNormalizer(
        topLayer,
        dummyCube.getCube(),
      );

      console.log("NORMALIZED LAYER PRE Y: \n", normalizedTopLayer);
      // check is normalized top layer for current cube is the same as the one in predicted algorithm

      let isMatched = false;
      if (modelType === "oll") {
        console.log("OLL MODEL TYPE!!!!");
        isMatched = isOllMatch(normalizedTopLayer, normalizedPattern);
      } else if (modelType === "pll") {
        console.log("HARD CODED NORMALIZED PATTERN:");
        console.log(normalizedPattern);
        console.log("NORMALIZED TOP LAYER:");
        console.log(normalizedTopLayer);
        isMatched = normalizedTopLayer.every(
          (val, idx) => val === normalizedPattern[idx],
        );
      }

      console.log("IS MATCHED", isMatched);

      if (isMatched) return [uMoves[u], yMoves[y]].filter(Boolean).join(" ");
    }
  }

  return "";
}

// only care about up face i.e. 0 values => in normalized logic: 0: upper layer.
function isOllMatch(arr1, arr2) {
  console.log("ARRAY ONE: ", arr1);
  console.log("ARRAY TWO: ", arr2);

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === 0 && arr2[i] !== 0) return false;
    if (arr1[i] !== 0 && arr2[i] === 0) return false;
  }
  return true;
}
