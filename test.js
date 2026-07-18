// rubik's cube representation

const COLORS_TEST = {
  0: "white",
  1: "yellow",
  2: "blue",
  3: "green",
  4: "orange",
  5: "red"
}

const sampleCube = [

 4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
 2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
 5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
 0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
 1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
 3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
]

const sliceCubeForHint = cube => [...cube.slice(0, 9), ...cube.slice(9, 12), ...cube.slice(27, 30), ...cube.slice(36, 39), ...cube.slice(45, 48)];

// console.log(COLORS_TEST[sampleCube[27]])

// console.log("Sliced Cube: ", sliceCubeForHint(sampleCube))

// console.log(sampleCube.length)

let exampleTopLayer = [4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 1, 1, 3, 3, 3]
console.log(exampleTopLayer.length)

const oneHotEncode = (arr) => {
  let finalArr = new Array(arr.length).fill(null);
  arr.forEach((sticker, idx) => {
    let newStickerArr = new Array(6).fill(0)
    newStickerArr[sticker] = 1
    finalArr[idx] = newStickerArr
  })

  console.log(finalArr)
  let finalFinalArr = []
  finalArr.forEach(binArr => {
    finalFinalArr.push(...binArr)
  })

  return finalFinalArr;
}


console.log(oneHotEncode(exampleTopLayer))