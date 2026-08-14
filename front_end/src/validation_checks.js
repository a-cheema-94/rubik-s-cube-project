
// below are based on default state array indices
const CORNER_TRIPLETS = [
  [8, 11, 36], // U-F-R (U=8,  F=11, R=36)
  [2, 38, 45], // U-R-B (U=2,  R=38, B=45)
  [0, 47, 27], // U-B-L (U=0,  B=47, L=27)
  [6, 29, 9],  // U-L-F (U=6,  L=29, F=9)
  [18, 15, 35],// D-F-L (D=18, F=15, L=35)
  [20, 42, 17],// D-R-F (D=20, R=42, F=17)
  [26, 51, 44],// D-B-R (D=26, B=51, R=44)
  [24, 33, 53] // D-L-B (D=24, L=33, B=53)
];

const EDGE_PAIRS = [
  [7, 10], // U-F
  [5, 37], // U-R
  [1, 46], // U-B
  [3, 28], // U-L
  [16, 19],// F-D
  [43, 23],// R-D
  [52, 25],// B-D
  [34, 21],// L-D
  [14, 39],// F-R
  [41, 48],// R-B
  [50, 30],// B-L
  [32, 12] // L-F
];


function stickerCount (arr) {
  let count = {}
  arr.forEach(face => {
    if (!count[face]){
      count[face] = 1
    } else {
      count[face] += 1
    }
  })

  for (const [_, num] of Object.entries(count)) {
    if(num !== 9) return false;
  }

  return true
}


function validateCornerParity(arr) {
  const topColor = arr[4];    // U center color
  const bottomColor = arr[22]; // D center color

  let totalOrientationSum = 0;

  for (const triplet of CORNER_TRIPLETS) {
    const [idx0, idx1, idx2] = triplet;
    
    // Find where the U or D reference sticker is located in this corner
    // CORNER_TRIPLET indexes are orientated [up / down: 0, clockwise from CLOSEST up / down: 1, anticlockwise from CLOSEST up / down: 2 ]
    if (arr[idx0] === topColor || arr[idx0] === bottomColor) {
      totalOrientationSum += 0; // Oriented correctly
    } else if (arr[idx1] === topColor || arr[idx1] === bottomColor) {
      totalOrientationSum += 1; // Clockwise
    } else if (arr[idx2] === topColor || arr[idx2] === bottomColor) {
      totalOrientationSum += 2; // Anti-Clockwise
    } else {
      // Neither sticker matches U/D reference
      return false;
    }
  }
  // Three states so take mod 3.
  return totalOrientationSum % 3 === 0;
}


function validateEdgeParity(arr) {
  const topColor = arr[4];     // U center color
  const bottomColor = arr[22];  // D center color
  const frontColor = arr[13];   // F center color
  const backColor = arr[49];    // B center color

  let totalFlippedEdges = 0;

  for (const pair of EDGE_PAIRS) {
    const [idx0, idx1] = pair;
    const color0 = arr[idx0];
    const color1 = arr[idx1];

    // Determine orientation based on standard reference rules:
    // If the edge contains U/D color, it should be on the U/D facelet (idx0 for top/bottom edges)
    if (color0 === topColor || color0 === bottomColor) {
      // Oriented correctly
    } else if (color1 === topColor || color1 === bottomColor) {
      totalFlippedEdges += 1; // Flipped
    } 
    // For middle-slice edges without U/D colors, check against F/B reference
    else if (color0 === frontColor || color0 === backColor) {
      // Oriented correctly
    } else if (color1 === frontColor || color1 === backColor) {
      totalFlippedEdges += 1; // Flipped
    }
  }

  return totalFlippedEdges % 2 === 0;
}

// final validation function
export function validateCubeStateCheck(arr) {
  if (!stickerCount(arr)) {
    return { isValid: false, reason: "Invalid sticker counts" };
  }
  if (!validateCornerParity(arr)) {
    return { isValid: false, reason: "Single twisted corner detected (Corner Parity Error)" };
  }
  if (!validateEdgeParity(arr)) {
    return { isValid: false, reason: "Single flipped edge detected (Edge Parity Error)" };
  }

  return { isValid: true };
}