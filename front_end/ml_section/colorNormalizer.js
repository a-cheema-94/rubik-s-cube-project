// model needs to recognize algo pattern in relation to top face and must be color variant,
// e.g. a white middle line upper layer pattern should fall under the same category as a yellow middle line upper layer pattern.
// input => 21 array upper layer with colors, output 21 normalized array 

const CUBE_CENTER_INDICES = {
  "U": 4, "F": 13, "R": 40, "B": 49, "L": 31
}


export function colorToFacesNormalizer(upperLayer, fullCube) {
  // find center colors from full cube and assign to variables.
  const mappings = new Map()
  let finalNormalizedArray = []
  
  // use the center indices to find current colors and map those colors to faces with 
  // colors: (0: white, 1: yellow, 2: blue, 3: green, 4: orange, 5: red)
  // faces: (0: Up, 1: Front, 2: Right, 3: Back, 4: Left)
  let currFace = 0;
  for (const [key, value] of Object.entries(CUBE_CENTER_INDICES)) {
    mappings.set(fullCube[value], currFace)
    currFace ++;
  }

  console.log("NORMALIZER GENERATED MAPPINGS: ", mappings)

  // change each color in upper layer to its' corresponding position mapping
  for (const sticker of upperLayer) {
    finalNormalizedArray.push(mappings.get(sticker))
  }

  return finalNormalizedArray
  
}

