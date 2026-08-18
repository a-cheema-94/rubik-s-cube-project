import { RubiksCube } from "./rubik's_cube_state.js";

function runTests() {
  const solvedStateJSON = JSON.stringify(new RubiksCube().getCube());

  function assertCubeIsSolved(cube, testName) {
    const currentStateJSON = JSON.stringify(cube.getCube());
    if (currentStateJSON === solvedStateJSON) {
      console.log(`✅ PASSED: ${testName}`);
    } else {
      console.error(`❌ FAILED: ${testName}\nExpected solved state, but got variations.`);
    }
  }

  // Test Case 1: 4x Clockwise turns returns to solved 
  console.log("Running Test 1: 4x single turns...");
  const movesToTest = ['U', 'D', 'L', 'R', 'F', 'B', 'M', 'E'];
  movesToTest.forEach(move => {
    const cube = new RubiksCube();
    for (let i = 0; i < 4; i++) {
      cube[`move${move}`]();
    }
    assertCubeIsSolved(cube, `4x move${move} returns to solved`);
  });

  // Test Case 2: Move and Inverse Cancellation 
  console.log("\nRunning Test 2: Move and Inverse cancellation...");
  movesToTest.forEach(move => {
    const cube = new RubiksCube();
    cube[`move${move}`]();
    // Execute dash/inverse move
    const dashMethod = move.includes('Dash') ? move.replace('Dash', '') : `${move}Dash`;
    cube[`move${dashMethod}`]();
    assertCubeIsSolved(cube, `move${move} followed by move${dashMethod} cancels out`);
  });

  // Test Case 3: (R U R' U') x 6 
  console.log("\nRunning Test 3: 6x (R U R' U')...");
  const cubeTestThree = new RubiksCube();
  for (let i = 0; i < 6; i++) {
    cubeTestThree.moveR();
    cubeTestThree.moveU();
    cubeTestThree.moveRDash();
    cubeTestThree.moveUDash();
  }
  assertCubeIsSolved(cubeTestThree, "6x (R U R' U') returns cube to solved");

  // Test Case 4: Slice Turn Integration (M' U M U') x 5 
  console.log("\nRunning Test 4: 5x Move (M' U M U')...");
  const cubeSlice = new RubiksCube();
  for (let i = 0; i < 5; i++) {
    cubeSlice.moveMDash();
    cubeSlice.moveU();
    cubeSlice.moveM();
    cubeSlice.moveUDash();
  }
  assertCubeIsSolved(cubeSlice, "5x (M' U M U') returns cube to solved");
}

runTests();