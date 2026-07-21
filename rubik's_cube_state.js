import { BLUE, GREEN, ORANGE, RED, WHITE, YELLOW } from "./cube_colors.js";

export const COLORS = {
  0: WHITE,
  1: YELLOW,
  2: BLUE,
  3: GREEN,
  4: ORANGE,
  5: RED
}

export class RubiksCube {
  constructor () {

    this.state = [
      4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
      2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
      5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
      0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
      1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
      3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
    ]

  }

  // clockwise and anticlockwise rotations, swap colors when given position indexes.
  // inputs: cubie 1, 2, 3, 4
  _clockwiseSwaps(c1, c2, c3, c4) {
    const temp_1 = this.state[c1];
    const temp_2 = this.state[c3];
    this.state[c3] = this.state[c2];
    this.state[c1] = this.state[c4];
    this.state[c2] = temp_1;
    this.state[c4] = temp_2;
    
  }

  _anticlockwiseSwaps(c1, c2, c3, c4) {
    const temp_1 = this.state[c1];
    const temp_2 = this.state[c3];
    this.state[c3] = this.state[c4];
    this.state[c1] = this.state[c2];
    this.state[c2] = temp_2;
    this.state[c4] = temp_1;
    
  }

  // rotate 1 layer
  moveU() {
    // Upper layer corner swaps
    this._clockwiseSwaps(0, 2, 8, 6)
    // Upper layer edge swaps
    this._clockwiseSwaps(1, 5, 7, 3)

    // Shift three adjacent cubes
    this._clockwiseSwaps(9, 27, 45, 36)
    this._clockwiseSwaps(10, 28, 46, 37)
    this._clockwiseSwaps(11, 29, 47, 38)
  }
  moveUDash() {
    // Upper layer corner swaps
    this._anticlockwiseSwaps(0, 2, 8, 6)
    // Upper layer edge swaps
    this._anticlockwiseSwaps(1, 5, 7, 3)

    // Shift three adjacent cubes
    this._anticlockwiseSwaps(9, 27, 45, 36)
    this._anticlockwiseSwaps(10, 28, 46, 37)
    this._anticlockwiseSwaps(11, 29, 47, 38)
  }

  moveD() {
    // Upper layer corner swaps
    this._clockwiseSwaps(18, 20, 26, 24)
    // Upper layer edge swaps
    this._clockwiseSwaps(19, 23, 25, 21)

    // Shift three adjacent cubes f, r, b, l
    this._clockwiseSwaps(15, 42, 51, 33)
    this._clockwiseSwaps(16, 43, 52, 34)
    this._clockwiseSwaps(17, 44, 53, 35)
  }
  moveDDash() {
    // Upper layer corner swaps
    this._anticlockwiseSwaps(18, 20, 26, 24)
    // Upper layer edge swaps
    this._anticlockwiseSwaps(19, 23, 25, 21)

    // Shift three adjacent cubes f, r, b, l
    this._anticlockwiseSwaps(15, 42, 51, 33)
    this._anticlockwiseSwaps(16, 43, 52, 34)
    this._anticlockwiseSwaps(17, 44, 53, 35)
  }

  moveL() {
    // Upper layer corner swaps
    this._clockwiseSwaps(27, 29, 35, 33)
    // Upper layer edge swaps
    this._clockwiseSwaps(28, 32, 34, 30)

    // Shift three adjacent cubes u, f, d, b 
    this._clockwiseSwaps(0, 9, 18, 53)
    this._clockwiseSwaps(3, 12, 21, 50)
    this._clockwiseSwaps(6, 15, 24, 47)
  }
  moveLDash() {
    // Upper layer corner swaps
    this._anticlockwiseSwaps(27, 29, 35, 33)
    // Upper layer edge swaps
    this._anticlockwiseSwaps(28, 32, 34, 30)

    // Shift three adjacent cubes u, f, d, b 
    this._anticlockwiseSwaps(0, 9, 18, 53)
    this._anticlockwiseSwaps(3, 12, 21, 50)
    this._anticlockwiseSwaps(6, 15, 24, 47)
  }

  moveR() {
    // Upper layer corner swaps
    this._clockwiseSwaps(36, 38, 44, 42)
    // Upper layer edge swaps
    this._clockwiseSwaps(37, 41, 43, 39)

    // Shift three adjacent cubes u, f, d, b 
    this._clockwiseSwaps(8, 45, 26, 17)
    this._clockwiseSwaps(5, 48, 23, 14)
    this._clockwiseSwaps(2, 51, 20, 11)
  }
  moveRDash() {
    // Upper layer corner swaps
    this._anticlockwiseSwaps(36, 38, 44, 42)
    // Upper layer edge swaps
    this._anticlockwiseSwaps(37, 41, 43, 39)

    // Shift three adjacent cubes u, f, d, b 
    this._anticlockwiseSwaps(8, 45, 26, 17)
    this._anticlockwiseSwaps(5, 48, 23, 14)
    this._anticlockwiseSwaps(2, 51, 20, 11)
  }

  moveF() {
    // Upper layer corner swaps
    this._clockwiseSwaps(9, 11, 17, 15)
    // Upper layer edge swaps
    this._clockwiseSwaps(10, 14, 16, 12)

    // Shift three adjacent cubes u, r, d, l 
    this._clockwiseSwaps(6, 36, 20, 35)
    this._clockwiseSwaps(7, 39, 19, 32)
    this._clockwiseSwaps(8, 42, 18, 29)
  }
  moveFDash() {
    // Upper layer corner swaps
    this._anticlockwiseSwaps(9, 11, 17, 15)
    // Upper layer edge swaps
    this._anticlockwiseSwaps(10, 14, 16, 12)

    // Shift three adjacent cubes u, r, d, l 
    this._anticlockwiseSwaps(6, 36, 20, 35)
    this._anticlockwiseSwaps(7, 39, 19, 32)
    this._anticlockwiseSwaps(8, 42, 18, 29)
  }

  moveB() {
    // Upper layer corner swaps
    this._clockwiseSwaps(45, 47, 53, 51)
    // Upper layer edge swaps
    this._clockwiseSwaps(46, 50, 52, 48)

    // Shift three adjacent cubes u, r, d, l 
    this._clockwiseSwaps(2, 27, 24, 44)
    this._clockwiseSwaps(1, 30, 25, 41)
    this._clockwiseSwaps(0, 33, 26, 38)
  }
  moveBDash() {
    // Upper layer corner swaps
    this._anticlockwiseSwaps(45, 47, 53, 51)
    // Upper layer edge swaps
    this._anticlockwiseSwaps(46, 50, 52, 48)

    // Shift three adjacent cubes u, r, d, l 
    this._anticlockwiseSwaps(2, 27, 24, 44)
    this._anticlockwiseSwaps(1, 30, 25, 41)
    this._anticlockwiseSwaps(0, 33, 26, 38)
  }

  // slice turns
  // M -> clockwise vertical slice
  moveM() {
    this._clockwiseSwaps(1, 10, 19, 52)
    this._clockwiseSwaps(4, 13, 22, 49)
    this._clockwiseSwaps(7, 16, 25, 46)
  }

  // M' -> anticlockwise vertical slice
  moveMDash() {
    this._anticlockwiseSwaps(1, 10, 19, 52)
    this._anticlockwiseSwaps(4, 13, 22, 49)
    this._anticlockwiseSwaps(7, 16, 25, 46)
  }

  // E -> clockwise horizontal slice
  moveE() {
    this._clockwiseSwaps(12, 39, 48, 30)
    this._clockwiseSwaps(13, 40, 49, 31)
    this._clockwiseSwaps(14, 41, 50, 32)
  }

   // E -> anticlockwise horizontal slice
  moveEDash() {
    this._anticlockwiseSwaps(12, 39, 48, 30)
    this._anticlockwiseSwaps(13, 40, 49, 31)
    this._anticlockwiseSwaps(14, 41, 50, 32)
  }

  // S -> middle clockwise slice
  moveS() {
    this._clockwiseSwaps(3, 37, 23, 34);
    this._clockwiseSwaps(4, 40, 22, 31);
    this._clockwiseSwaps(5, 43, 21, 28);
  }

  moveSDash() {
    this._anticlockwiseSwaps(3, 37, 23, 34);
    this._anticlockwiseSwaps(4, 40, 22, 31);
    this._anticlockwiseSwaps(5, 43, 21, 28);
  }

  // DOUBLE LAYER ROTATIONS
  moveFDouble() {
    this.moveF();
    this.moveS();
  }
  moveFDoubleDash() {
    this.moveFDash();
    this.moveSDash();
  }
  
  moveBDouble() {
    this.moveB();
    this.moveSDash();
  }
  moveBDoubleDash() {
    this.moveBDash();
    this.moveS();
  }

  moveRDouble() {
    this.moveR();
    this.moveMDash();
  }
  moveRDoubleDash() {
    this.moveRDash();
    this.moveM();
  }

  moveLDouble() {
    this.moveL();
    this.moveM();
  }
  moveLDoubleDash() {
    this.moveLDash();
    this.moveMDash();
  }

  moveUDouble() {
    this.moveU();
    this.moveEDash();
  }
  moveUDoubleDash() {
    this.moveUDash();
    this.moveE();
  }

  moveDDouble() {
    this.moveD();
    this.moveE();
  }
  moveDDoubleDash() {
    this.moveDDash();
    this.moveEDash();
  }

  // x, y and z rotations
  moveX() {
    this.moveLDash();
    this.moveMDash();
    this.moveR();
  }
  moveXDash() {
    this.moveL();
    this.moveM();
    this.moveRDash();
  }

  moveY() {
    this.moveU();
    this.moveEDash();
    this.moveDDash();

  }
  moveYDash() {
    this.moveUDash();
    this.moveE();
    this.moveD();

  }

  moveZ() {
    this.moveF();
    this.moveS();
    this.moveBDash();
  }

  moveZDash() {
    this.moveFDash();
    this.moveSDash();
    this.moveB();
  }


  getCube() {
    return [...this.state]
  }

  reset() {
    this.state = [
      4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
      2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
      5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
      0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
      1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
      3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
    ];
  }

  applyMoves(algoString, reverse = false) {
    if (!algoString) return;

    // clean up whitespace for each string when splitting into a moves array
    let cubeMoves = algoString.trim().split(/\s+/);

    // if reverse flag set to true => reverse string and apply inverse moves
    if (reverse) {
      cubeMoves = cubeMoves.toReversed().map(move => {
        // cases: ', 2, plain
        if (move.includes("'")) return move.replace("'", "");
        if (move.includes("2")) return move;
        return move + "'"
      })
    }

    // make a map that maps characters to class moves, e.g. "R" maps to .moveR()
    const charToMovesMap = {
      'U': 'moveU', "U'": 'moveUDash', 'Uw': 'moveUDouble', "Uw'": 'moveUDoubleDash', 'u': 'moveUDouble', "u'": 'moveUDoubleDash',
      'D': 'moveD', "D'": 'moveDDash', 'Dw': 'moveDDouble', "Dw'": 'moveDDoubleDash', 'd': 'moveDDouble', "d'": 'moveDDoubleDash',
      'L': 'moveL', "L'": 'moveLDash', 'Lw': 'moveLDouble', "Lw'": 'moveLDoubleDash', 'l': 'moveLDouble', "l'": 'moveLDoubleDash',
      'R': 'moveR', "R'": 'moveRDash', 'Rw': 'moveRDouble', "Rw'": 'moveRDoubleDash', 'r': 'moveRDouble', "r'": 'moveRDoubleDash',
      'F': 'moveF', "F'": 'moveFDash', 'Fw': 'moveFDouble', "Fw'": 'moveFDoubleDash', 'f': 'moveFDouble', "f'": 'moveFDoubleDash',
      'B': 'moveB', "B'": 'moveBDash', 'Bw': 'moveBDouble', "Bw'": 'moveBDoubleDash', 'b': 'moveBDouble', "b'": 'moveBDoubleDash',
      'M': 'moveM', "M'": 'moveMDash',
      'E': 'moveE', "E'": 'moveEDash',
      'S': 'moveS', "S'": 'moveSDash',
      'x': 'moveX', "x'": 'moveXDash',
      'y': 'moveY', "y'": 'moveYDash',
      'z': 'moveZ', "z'": 'moveZDash'
    }

    // iterate through each move and apply -> taking into account double moves with "2"
    for (const move of cubeMoves) {
      const baseMove = move.replace("2", "")

      const moveMethodName = charToMovesMap[baseMove]

      const isDouble = move.includes("2");
      if(this[moveMethodName]) {
        this[moveMethodName]()
        if (isDouble) {
          this[moveMethodName]();
        }
      } else {
        console.log(`Illegal Move!! Try again fool!`)
      }
    }

  }
}

const rCube = new RubiksCube();

rCube.moveD()

// console.log(rCube.getCube())


// todo => refactor code into different files and functions and then import into index.js.
// todo => test rotations with testing scripts amongst other stuff.
// todo => m and e button clicks sort out and s rotation
// todo => need x and y rotations for oll and pll and need double layer moves -> how to classify double layer moves.
// todo => save state to local storage, so previous state of cube is saved.