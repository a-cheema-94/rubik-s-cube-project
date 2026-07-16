export const moveToCubiePosition = {
    // Math.PI / 2 is 90 degrees, angles represented in radians in 3D space

    // Upper (y = 1)
    "u": { axis: "y", value: 1, move: "moveU", angle: -Math.PI / 2 },
    "U": { axis: "y", value: 1, move: "moveUDash", angle: Math.PI / 2 },
    
    // Bottom (y = -1)
    "d": { axis: "y", value: -1, move: "moveD", angle: Math.PI / 2 },
    "D": { axis: "y", value: -1, move: "moveDDash", angle: - Math.PI / 2 },
    
    // Right (x = 1)
    "r": { axis: "x", value: 1, move: "moveR", angle: -Math.PI / 2 },
    "R": { axis: "x", value: 1, move: "moveRDash", angle: Math.PI / 2 },
    
    // Left (x = -1)
    "l": { axis: "x", value: -1, move: "moveL", angle: Math.PI / 2 },
    "L": { axis: "x", value: -1, move: "moveLDash", angle: -Math.PI / 2 },
    
    // Front (z = 1)
    "f": { axis: "z", value: 1, move: "moveF", angle: -Math.PI / 2 },
    "F": { axis: "z", value: 1, move: "moveFDash", angle: Math.PI / 2 },
    
    // Back (z = -1)
    "b": { axis: "z", value: -1, move: "moveB", angle: Math.PI / 2 },
    "B": { axis: "z", value: -1, move: "moveBDash", angle: -Math.PI / 2 },

    // Slices (M is middle vertical X, E is middle horizontal Y)
    "m": { axis: "x", value: 0, move: "moveM", angle: Math.PI / 2 },
    "M": { axis: "x", value: 0, move: "moveMDash", angle: -Math.PI / 2 },
    "e": { axis: "y", value: 0, move: "moveE", angle: Math.PI / 2 },
    "E": { axis: "y", value: 0, move: "moveEDash", angle: -Math.PI / 2 },
    "s": { axis: "z", value: 0, move: "moveS", angle: -Math.PI / 2 },
    "S": { axis: "z", value: 0, move: "moveSDash", angle: Math.PI / 2 }
 }

 // Camera orientation relative map
// export const CAMERA_ORIENTATIONS = {
//     // no change same front face
//     "+Z": { f: "f", b: "b", r: "r", l: "l" },
//     // right side now front face
//     "+X": { f: "r", b: "l", r: "b", l: "f" },
//     // Top face now front face
//     "+Y": { f: "u", b: "d", u: "b", d: "f" },
    
//     // back side now front face
//     "-Z": { f: "b", b: "f", r: "l", l: "r" },
//     // left side now front face
//     "-X": { f: "l", b: "r", r: "f", l: "b" },
//     // Bottom face now front face
//     "-Y": { f: "d", b: "u", u: "f", d: "b" }
// };


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