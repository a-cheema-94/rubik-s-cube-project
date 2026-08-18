const ROTATION_FACTOR = Math.PI / 2;

export const moveToCubiePosition = {
    // Math.PI / 2 is 90 degrees, angles represented in radians in 3D space

    // Upper (y = 1)
    "u": { axis: "y", values: [1], move: "moveU", angle: -ROTATION_FACTOR },
    "U": { axis: "y", values: [1], move: "moveUDash", angle: ROTATION_FACTOR },
    
    // Bottom (y = -1)
    "d": { axis: "y", values: [-1], move: "moveD", angle: ROTATION_FACTOR },
    "D": { axis: "y", values: [-1], move: "moveDDash", angle: - ROTATION_FACTOR },
    
    // Right (x = 1)
    "r": { axis: "x", values: [1], move: "moveR", angle: -ROTATION_FACTOR },
    "R": { axis: "x", values: [1], move: "moveRDash", angle: ROTATION_FACTOR },
    
    // Left (x = -1)
    "l": { axis: "x", values: [-1], move: "moveL", angle: ROTATION_FACTOR },
    "L": { axis: "x", values: [-1], move: "moveLDash", angle: -ROTATION_FACTOR },
    
    // Front (z = 1)
    "f": { axis: "z", values: [1], move: "moveF", angle: -ROTATION_FACTOR },
    "F": { axis: "z", values: [1], move: "moveFDash", angle: ROTATION_FACTOR },
    
    // Back (z = -1)
    "b": { axis: "z", values: [-1], move: "moveB", angle: ROTATION_FACTOR },
    "B": { axis: "z", values: [-1], move: "moveBDash", angle: -ROTATION_FACTOR },

    // Slices (M is middle vertical X, E is middle horizontal Y)
    "m": { axis: "x", values: [0], move: "moveM", angle: ROTATION_FACTOR },
    "M": { axis: "x", values: [0], move: "moveMDash", angle: -ROTATION_FACTOR },
    "e": { axis: "y", values: [0], move: "moveE", angle: ROTATION_FACTOR },
    "E": { axis: "y", values: [0], move: "moveEDash", angle: -ROTATION_FACTOR },
    "s": { axis: "z", values: [0], move: "moveS", angle: -ROTATION_FACTOR },
    "S": { axis: "z", values: [0], move: "moveSDash", angle: ROTATION_FACTOR },

    // double layer moves
    "fw": { axis: "z", values: [1, 0], move: "moveFDouble", angle: -ROTATION_FACTOR }, // double rotate forward face and slice layer
    "Fw": { axis: "z", values: [1, 0], move: "moveFDoubleDash", angle: ROTATION_FACTOR },

    "bw": { axis: "z", values: [-1, 0], move: "moveBDouble", angle: ROTATION_FACTOR },
    "Bw": { axis: "z", values: [-1, 0], move: "moveBDoubleDash", angle: -ROTATION_FACTOR },

    "rw": { axis: "x", values: [1, 0], move: "moveRDouble", angle: -ROTATION_FACTOR },
    "Rw": { axis: "x", values: [1, 0], move: "moveRDoubleDash", angle: ROTATION_FACTOR },

    "lw": { axis: "x", values: [-1, 0], move: "moveLDouble", angle: ROTATION_FACTOR },
    "Lw": { axis: "x", values: [-1, 0], move: "moveLDoubleDash", angle: -ROTATION_FACTOR },

    "uw": { axis: "y", values: [1, 0], move: "moveUDouble", angle: -ROTATION_FACTOR },
    "Uw": { axis: "y", values: [1, 0], move: "moveUDoubleDash", angle: ROTATION_FACTOR },

    "dw": { axis: "y", values: [-1, 0], move: "moveDDouble", angle: ROTATION_FACTOR },
    "Dw": { axis: "y", values: [-1, 0], move: "moveDDoubleDash", angle: -ROTATION_FACTOR },
    // x and y rotations

    "x": { axis: "x", values: [-1, 0, 1], move: "moveX", angle: -ROTATION_FACTOR },
    "X": { axis: "x", values: [-1, 0, 1], move: "moveXDash", angle: ROTATION_FACTOR },

    "y": { axis: "y", values: [-1, 0, 1], move: "moveY", angle: -ROTATION_FACTOR },
    "Y": { axis: "y", values: [-1, 0, 1], move: "moveYDash", angle: ROTATION_FACTOR },

    "z": { axis: "z", values: [-1, 0, 1], move: "moveZ", angle: -ROTATION_FACTOR },
    "Z": { axis: "z", values: [-1, 0, 1], move: "moveZDash", angle: ROTATION_FACTOR },
 }


// Right x = 1: yellow
// state indexes: (36 - 44)

// Left x = -1: white
// state indexes: (27 - 35)

// Up y = 1: orange
// state indexes: (0 - 8)

// Down y = -1: red
// state indexes: (18 - 26)

// Front z = 1: blue
// state indexes: (9 - 17)

// Back z = -1: green
// state indexes: (45 - 53)