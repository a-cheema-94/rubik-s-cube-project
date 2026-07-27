import { RubiksCube } from "./rubik's_cube_state.js";


export function orientCubeForOllModel(cube) {
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
    return null;
  }

  if (currentSolvedFace === "D") return dummyCube;
  

  const moveFaceToBottomMap = {
    "U": ["moveX", "moveX"],
    "F": ["moveXDash"],
    "L": ["moveZDash"],
    "R": ["moveZ"],
    "B": ["moveX"],
  }

  const movesToApply = moveFaceToBottomMap[currentSolvedFace]
  movesToApply.forEach(move => dummyCube[move]());

  return dummyCube
}


// TESTING

// let exampleCube = new RubiksCube()
// exampleCube.setCube([4, 5, 4, 5, 4, 5, 4, 5, 4, 2, 3, 2, 3, 2, 3, 2, 3, 2, 5, 4, 5, 4, 5, 4, 5, 4, 5, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 2, 3, 2, 3, 2, 3, 2, 3])

// translateCubeState(exampleCube)

// let test1 = [4, 5, 4, 5, 4, 5, 0, 1, 0, 2, 3, 2, 3, 2, 3, 2, 3, 2, 1, 0, 1, 4, 5, 4, 5, 4, 5, 0, 1, 5, 1, 0, 4, 0, 1, 5, 4, 0, 1, 5, 1, 0, 4, 0, 1, 3, 2, 3, 2, 3, 2, 3, 2, 3]

// let test2 = [
//     4, 5, 4, 5, 4, 5, 0, 1, 0, 2, 3, 2,
//     3, 2, 3, 2, 3, 2, 1, 0, 1, 4, 5, 4,
//     5, 4, 5, 0, 1, 5, 1, 0, 4, 0, 1, 5,
//     4, 0, 1, 5, 1, 0, 4, 0, 1, 3, 2, 3,
//     2, 3, 2, 3, 2, 3
//   ]

// const arrayEquals = (a, b) => a.length === b.length && a.every((val, idx) => val === b[idx]);

// console.log("TEST COMPARISON :", arrayEquals(test1, test2))



// 0, 9
// 9, 18
// 18, 27
// 27, 36
// 36, 45
// 45, 54

// const allEqual = arr => arr.every( v => v === arr[0] )
// allEqual( [1,1,1,1] )  // true