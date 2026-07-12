// rubik's cube representation

const COLORS = {
  0: "white",
  1: "yellow",
  2: "blue",
  3: "green",
  4: "orange",
  5: "red"
}

const sampleCube = [
 4, 4, 4, 4, 4, 4, 4, 4, 4,  // U
 2, 2, 2, 2, 2, 2, 2, 2, 2,  // F
 5, 5, 5, 5, 5, 5, 5, 5, 5,  // D
 0, 0, 0, 0, 0, 0, 0, 0, 0,  // L
 1, 1, 1, 1, 1, 1, 1, 1, 1,  // R
 3, 3, 3, 3, 3, 3, 3, 3, 3   // B
]

const sliceCubeForHint = cube => [...cube.slice(0, 9), ...cube.slice(9, 12), ...cube.slice(27, 30), ...cube.slice(36, 39), ...cube.slice(45, 48)];

console.log(COLORS[sampleCube[27]])

console.log("Sliced Cube: ", sliceCubeForHint(sampleCube))

console.log(sampleCube.length)