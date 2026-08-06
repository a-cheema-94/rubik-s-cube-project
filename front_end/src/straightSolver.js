import { RubiksCube } from "./rubik's_cube_state.js";
import { playAlgorithm } from "./algoStringMoves.js";



// export const COLORS = {
//   0: WHITE,
//   1: YELLOW,
//   2: BLUE,
//   3: GREEN,
//   4: ORANGE,
//   5: RED
// }



const randomCubeState = [1, 1, 1, 0, 4, 4, 2, 3, 3, 5, 5, 1, 1, 3, 4, 5, 1, 1, 3, 5, 3, 5, 5, 3, 4, 0, 4, 5, 4, 0, 3, 1, 2, 0, 2, 0, 5, 1, 4, 2, 0, 2, 4, 4, 0, 2, 3, 2, 0, 2, 0, 3, 5, 2]


// correct order: U, R, F, D, L, B in string format with letters signifying face direction instead of colors.


const correctOrderState = [...randomCubeState.slice(0, 9), ...randomCubeState.slice(36, 45), ...randomCubeState.slice(9, 18), ...randomCubeState.slice(18, 27), ...randomCubeState.slice(27, 36), ...randomCubeState.slice(45, 54)]

const correctMap = { [4]: "U", [0]: "R", [3]: "F", [5]: "D", [1]: "L", [2]: "B" }
let desiredCubeState = correctOrderState.map(color => correctMap[color]).join("")

export async function solveCubeStraight(cube, syncVisualCubeToState, cubies, scene, currAppState) {
  const cubeStateString = convertStateToCubeJS(cube.getCube())
  let finalSolution = ""

  try {
    const response = await fetch("http://localhost:3000/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cubeStateString: cubeStateString })
    });

    const data = await response.json();

    if(data.success) {
      console.log("Got algo string from backend server");
      finalSolution = data.solution
    } else {
      console.error(`Did not get a solution: ${data.error}`)
    }

  } catch (error) {
    console.error(`Did not connect to server: ${error.message0}`)
  }


  await playAlgorithm(finalSolution, cube, syncVisualCubeToState, cubies, scene, currAppState)

  console.log(`moves completed!!, it took: ${finalSolution.trim().split(/\s+/).length}`)
}


// pull out each face -> find center index -> use created map to map color to string values: U, R, F, D, L, B
// place in object with face as key and 9 element array as value.
// convert object into a 54 element string.
function convertStateToCubeJS(cubeArr) {
  const facesOrder = ["U", "R", "F", "D", "L", "B"]

  const upFace = cubeArr.slice(0, 9)
  const rightFace = cubeArr.slice(36, 45)
  const frontFace = cubeArr.slice(9, 18)
  const downFace = cubeArr.slice(18, 27)
  const leftFace = cubeArr.slice(27, 36)
  const backFace = cubeArr.slice(45, 54)

  let idx = 0;
  const colorMap = {
    [upFace[4]]: "U",
    [rightFace[4]]: "R",
    [frontFace[4]]: "F",
    [downFace[4]]: "D",
    [leftFace[4]]: "L",
    [backFace[4]]: "B"
  }

  console.log("COLOR MAP: ", colorMap)
  const correctCubeOrder = [...upFace, ...rightFace, ...frontFace, ...downFace, ...leftFace, ...backFace]
  
  
  const finalString = correctCubeOrder.map(color => colorMap[color]).join("")

  return finalString

}



// const sampleCube = new RubiksCube()
// sampleCube.setCube(randomCubeState)

// const answer = convertStateToCubeJS(sampleCube.getCube())

// console.log("PREDICTED ANSWER: ", desiredCubeState)
// console.log("GENERATED ANSWER: ", answer)
// if(desiredCubeState === answer) {
//   console.log("SUCCESS!!!")
// } else {
//   console.log("FAILURE!!")
// }




// try {
  

//   console.log(finalSolution)
//   sampleCube.applyMoves(finalSolution)

//   console.log("HOPEFULLY SOLVED CUBE ARRAY?: ", sampleCube.getCube())

//   console.log("SOLUTION MOVES LENGTH: ", finalSolution.trim().split(/\s+/).length)
// } catch (err) {
//   console.error("Invalid cube state: ", err)
// }

