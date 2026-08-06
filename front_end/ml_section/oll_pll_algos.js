export const LAST_LAYER_ALGO_STORE = {
  oll: {
  0: {
    name: 'cube_solved',
    algo: '',
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 2, 2,
      2, 4, 4, 4, 3, 3, 3
    ]
  },
  1: {
    name: 'solved_cross_1',
    algo: "R U R' U R U2 R'",
    normalizedPattern: [
      2, 0, 1, 0, 0, 0, 0,
      0, 4, 3, 1, 0, 3, 3,
      0, 1, 2, 2, 4, 4, 0
    ]
  },
  2: {
    name: 'solved_cross_2',
    algo: "R U2 R' U' R U' R'",
    normalizedPattern: [
      1, 0, 0, 0, 0, 0, 2,
      0, 3, 0, 1, 4, 0, 4,
      4, 0, 3, 3, 1, 2, 2
    ]
  },
  3: {
    name: 'solved_cross_3',
    algo: "R U R' U R U' R' U R U2 R'",
    normalizedPattern: [
      3, 0, 3, 0, 0, 0, 1,
      0, 1, 4, 1, 2, 0, 4,
      0, 0, 3, 0, 2, 2, 4
    ]
  },
  4: {
    name: 'solved_cross_4',
    algo: "R U2 R2 U' R2 U' R2 U2 R",
    normalizedPattern: [
      1, 0, 4, 0, 0, 0, 3,
      0, 4, 2, 3, 0, 3, 2,
      1, 0, 1, 0, 0, 4, 2
    ]
  },
  5: {
    name: 'solved_cross_5',
    algo: "R U R D R' U' R D' R2",
    normalizedPattern: [
      1, 0, 4, 0, 0, 0, 0,
      0, 0, 1, 1, 2, 3, 2,
      0, 0, 4, 4, 3, 3, 2
    ]
  },
  6: {
    name: 'solved_cross_6',
    algo: "R2 D' R U' R' D R U R",
    normalizedPattern: [
      0, 0, 4, 0, 0, 0, 2,
      0, 0, 1, 1, 2, 3, 2,
      1, 4, 4, 0, 0, 3, 3
    ]
  },
  7: {
    name: 'solved_cross_7',
    algo: "R2 D R' U2 R D' R' U2 R'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 2,
      0, 1, 0, 1, 0, 4, 2,
      1, 4, 4, 3, 2, 3, 3
    ]
  },
  8: {
    name: 't_shape_1',
    algo: "F R U R' U' F'",
    normalizedPattern: [
      2, 1, 0, 0, 0, 0, 2,
      2, 0, 1, 0, 4, 1, 3,
      3, 0, 4, 0, 4, 0, 3
    ]
  },
  9: {
    name: 't_shape_2',
    algo: "R U R' U' R' F R F'",
    normalizedPattern: [
      1, 1, 0, 0, 0, 0, 2,
      2, 0, 0, 0, 1, 2, 3,
      3, 4, 4, 3, 4, 0, 0
    ]
  },
  10: {
    name: 'block_shape_1',
    algo: "r U2 R' U' R U' r'",
    normalizedPattern: [
      1, 0, 0, 1, 0, 0, 2,
      2, 3, 0, 0, 4, 0, 4,
      4, 0, 0, 3, 1, 3, 2
    ]
  },
  11: {
    name: 'block_shape_2',
    algo: "r' U2 R U R' U r",
    normalizedPattern: [
      2, 2, 1, 3, 0, 0, 3,
      0, 0, 2, 1, 3, 4, 4,
      0, 1, 0, 0, 4, 0, 0
    ]
  },
  12: {
    name: 'edge_only_1',
    algo: "r U R' U' M U R U' R'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 1, 0,
      3, 0, 1, 0, 1, 2, 0,
      2, 4, 4, 4, 3, 2, 3
    ]
  },
  13: {
    name: 'edge_only_2',
    algo: "R U R' U' M' U R U' r'",
    normalizedPattern: [
      0, 1, 0, 0, 0, 0, 0,
      2, 0, 1, 0, 1, 2, 3,
      2, 4, 4, 4, 3, 0, 3
    ]
  },
  14: {
    name: 'lightning_shape_1',
    algo: "r U R' U R U2 r'",
    normalizedPattern: [
      2, 0, 1, 0, 0, 1, 0,
      4, 4, 3, 0, 0, 3, 0,
      0, 1, 2, 2, 4, 3, 0
    ]
  },
  15: {
    name: 'lightning_shape_2',
    algo: "R' F' r U' r' F2 R",
    normalizedPattern: [
      1, 0, 4, 1, 0, 0, 2,
      2, 0, 0, 0, 3, 4, 4,
      1, 0, 0, 3, 0, 3, 2
    ]
  },
  16: {
    name: 'lightning_shape_3',
    algo: "r' R2 U R' U R U2 R' U M'",
    normalizedPattern: [
      1, 4, 4, 3, 0, 0, 0,
      0, 3, 2, 1, 0, 2, 2,
      0, 4, 0, 1, 3, 0, 0
    ]
  },
  17: {
    name: 'lightning_shape_4',
    algo: "r R2 U' R U' R' U2 R U' M",
    normalizedPattern: [
      0, 0, 1, 1, 0, 0, 3,
      4, 4, 0, 0, 1, 0, 2,
      2, 3, 0, 4, 0, 3, 2
    ]
  },
  18: {
    name: 'lightning_shape_5',
    algo: "f R' F' R U R U' R' S'",
    normalizedPattern: [
      0, 4, 1, 0, 0, 0, 3,
      3, 0, 0, 0, 1, 2, 2,
      0, 3, 1, 4, 4, 0, 2
    ]
  },
  19: {
    name: 'lightning_shape_6',
    algo: "f' r U r' U' r' F r S",
    normalizedPattern: [
      1, 2, 0, 0, 0, 0, 0,
      3, 3, 1, 0, 0, 2, 1,
      3, 0, 4, 4, 4, 0, 2
    ]
  },
  20: {
    name: 'p_shape_1',
    algo: "F U R U' R' F'",
    normalizedPattern: [
      0, 0, 4, 0, 0, 1, 0,
      3, 4, 2, 0, 1, 0, 0,
      0, 3, 4, 1, 3, 2, 2
    ]
  },
  21: {
    name: 'p_shape_2',
    algo: "R' U' F' U F R",
    normalizedPattern: [
      0, 0, 0, 0, 0, 4, 3,
      2, 3, 0, 0, 0, 2, 0,
      1, 1, 1, 4, 2, 3, 4
    ]
  },
  22: {
    name: 'p_shape_3',
    algo: "R' U' F U R U' R' F' R",
    normalizedPattern: [
      3, 0, 0, 3, 0, 0, 4,
      1, 0, 0, 0, 1, 2, 2,
      3, 2, 0, 1, 4, 4, 0
    ]
  },
  23: {
    name: 'p_shape_4',
    algo: "S R U R' U' R' F R f'",
    normalizedPattern: [
      1, 1, 0, 3, 0, 0, 2,
      0, 0, 0, 4, 1, 2, 2,
      3, 4, 0, 3, 4, 0, 0
    ]
  },
  24: {
    name: 'c_shape_1',
    algo: "R' U' R' F R F' U R",
    normalizedPattern: [
      0, 0, 4, 1, 0, 4, 0,
      0, 4, 2, 2, 1, 0, 0,
      0, 3, 0, 1, 3, 3, 2
    ]
  },
  25: {
    name: 'c_shape_2',
    algo: "f R f' U' r' U' R U M'",
    normalizedPattern: [
      2, 0, 0, 2, 0, 3, 3,
      0, 0, 0, 1, 4, 1, 0,
      2, 1, 0, 4, 3, 4, 0
    ]
  },
  26: {
    name: 'fish_shape_1',
    algo: "F R' F' R U R U' R'",
    normalizedPattern: [
      0, 0, 1, 0, 0, 1, 3,
      3, 0, 0, 0, 1, 2, 0,
      0, 3, 4, 4, 4, 2, 2
    ]
  },
  27: {
    name: 'fish_shape_2',
    algo: "R U2 R2' F R F' R U2 R'",
    normalizedPattern: [
      0, 2, 2, 3, 0, 0, 3,
      0, 0, 0, 1, 2, 3, 4,
      0, 1, 0, 4, 1, 0, 4
    ]
  },
  28: {
    name: 'fish_shape_3',
    algo: "R U R' U' R' F R2 U R' U' F'",
    normalizedPattern: [
      1, 0, 2, 0, 0, 1, 3,
      3, 0, 0, 0, 4, 1, 0,
      3, 0, 4, 4, 0, 2, 2
    ]
  },
  29: {
    name: 'fish_shape_4',
    algo: "R U R' U R' F R F' R U2 R'",
    normalizedPattern: [
      3, 3, 0, 0, 0, 2, 2,
      0, 1, 1, 1, 0, 4, 0,
      3, 2, 4, 0, 4, 0, 0
    ]
  },
  30: {
    name: 'w_shape_1',
    algo: "R U R' U R U' R' U' R' F R F'",
    normalizedPattern: [
      2, 0, 0, 0, 0, 1, 0,
      2, 4, 4, 0, 1, 0, 0,
      2, 1, 3, 3, 3, 4, 0
    ]
  },
  31: {
    name: 'w_shape_2',
    algo: "L' U' L U' L' U L U r U' r' F",
    normalizedPattern: [
      0, 0, 4, 1, 0, 0, 2,
      4, 0, 1, 0, 2, 3, 3,
      1, 4, 0, 0, 0, 2, 3
    ]
  },
  32: {
    name: 'hook_shape_1',
    algo: "F R U R' U' R U R' U' F'",
    normalizedPattern: [
      3, 0, 2, 0, 0, 1, 1,
      3, 2, 4, 0, 0, 1, 0,
      3, 0, 4, 0, 0, 2, 4
    ]
  },
  33: {
    name: 'hook_shape_2',
    algo: "F R' F' R U2 R U' R' U R U2 R'",
    normalizedPattern: [
      3, 0, 4, 0, 0, 1, 4,
      2, 1, 3, 0, 2, 0, 0,
      1, 2, 3, 0, 0, 4, 0
    ]
  },
  34: {
    name: 'hook_shape_3',
    algo: "r U R' U R U' R' U R U2 r'",
    normalizedPattern: [
      3, 0, 3, 1, 0, 0, 1,
      2, 1, 4, 0, 2, 0, 4,
      0, 0, 0, 0, 2, 3, 4
    ]
  },
  35: {
    name: 'hook_shape_4',
    algo: "r' U' R U' R' U R U' R' U2 r",
    normalizedPattern: [
      3, 2, 3, 3, 0, 0, 1,
      0, 1, 4, 1, 2, 0, 4,
      0, 0, 0, 0, 2, 0, 4
    ]
  },
  36: {
    name: 'hook_shape_5',
    algo: "r U' r2' U r2 U r2' U' r",
    normalizedPattern: [
      1, 0, 4, 3, 0, 0, 3,
      4, 4, 2, 0, 0, 3, 2,
      1, 0, 0, 0, 0, 1, 2
    ]
  },
  37: {
    name: 'hook_shape_6',
    algo: "r' U r2 U' r2' U' r2 U r'",
    normalizedPattern: [
      1, 4, 4, 1, 0, 0, 3,
      0, 4, 2, 3, 0, 3, 2,
      1, 0, 0, 0, 0, 0, 2
    ]
  },
  38: {
    name: 'line_shape_1',
    algo: "F U R U' R' U R U' R' F'",
    normalizedPattern: [
      4, 1, 3, 0, 0, 0, 4,
      2, 1, 0, 0, 2, 0, 3,
      0, 3, 4, 1, 2, 0, 0
    ]
  },
  39: {
    name: 'line_shape_2',
    algo: " R' F' U' F U' R U R' U R",
    normalizedPattern: [
      2, 0, 3, 4, 0, 2, 2,
      0, 1, 1, 1, 0, 4, 0,
      4, 0, 0, 0, 0, 3, 3
    ]
  },
  40: {
    name: 'line_shape_3',
    algo: "r U r' U R U' R' U R U' R' r U' r'",
    normalizedPattern: [
      3, 1, 3, 0, 0, 0, 1,
      2, 1, 4, 0, 2, 0, 3,
      0, 0, 4, 0, 2, 0, 4
    ]
  },
  41: {
    name: 'line_shape_4',
    algo: "R' F R U R U' R2 F' R2 U' R' U R U R'",
    normalizedPattern: [
      1, 1, 3, 0, 0, 0, 1,
      2, 3, 0, 0, 0, 2, 4,
      4, 4, 3, 2, 0, 0, 0
    ]
  },
  42: {
    name: 'l_shape_1',
    algo: "r U r' R U R' U' r U' r'",
    normalizedPattern: [
      1, 1, 0, 0, 0, 0, 2,
      2, 3, 0, 0, 4, 0, 3,
      4, 0, 4, 3, 1, 0, 2
    ]
  },
  43: {
    name: 'l_shape_2',
    algo: "R' F' R L' U' L U R' F R",
    normalizedPattern: [
      0, 1, 1, 0, 0, 0, 3,
      4, 4, 2, 0, 0, 3, 2,
      0, 2, 3, 0, 4, 0, 1
    ]
  },
  44: {
    name: 'l_shape_3',
    algo: "F U R U' R2 F' R U R U' R'",
    normalizedPattern: [
      1, 1, 3, 0, 0, 0, 0,
      2, 4, 2, 0, 0, 3, 3,
      0, 4, 4, 1, 2, 0, 0
    ]
  },
  45: {
    name: 'l_shape_4',
    algo: "R' F R U R' F' R F U' F'",
    normalizedPattern: [
      2, 1, 4, 0, 0, 0, 3,
      2, 0, 0, 0, 1, 2, 3,
      1, 0, 4, 4, 0, 0, 3
    ]
  },
  46: {
    name: 'awkward_shape_1',
    algo: "r2 D' r U r' D r2 U' r' U' r",
    normalizedPattern: [
      0, 3, 0, 0, 0, 1, 3,
      0, 1, 2, 2, 2, 0, 0,
      4, 4, 4, 0, 1, 0, 3
    ]
  },
  47: {
    name: 'awkward_shape_2',
    algo: "F U R U2 R' U' R U2 R' U' F'",
    normalizedPattern: [
      1, 0, 1, 0, 0, 1, 0,
      4, 0, 4, 0, 2, 3, 0,
      0, 0, 3, 3, 4, 2, 2
    ]
  },
  48: {
    name: 'awkward_shape_3',
    algo: "R U R' U R U2 R' F R U R' U' F'",
    normalizedPattern: [
      1, 0, 1, 0, 0, 1, 0,
      2, 0, 4, 0, 2, 3, 0,
      2, 4, 3, 3, 0, 4, 0
    ]
  },
  49: {
    name: 'awkward_shape_4',
    algo: "R' U' F2 u' R U R' D R2 B",
    normalizedPattern: [
      3, 0, 0, 0, 0, 4, 3,
      2, 0, 2, 0, 4, 1, 0,
      1, 0, 1, 0, 2, 3, 4
    ]
  },
  50: {
    name: 'dot_case_1',
    algo: "R U2 R2 F R F' U2 R' F R F'",
    normalizedPattern: [
      3, 4, 1, 3, 0, 1, 2,
      2, 2, 1, 0, 3, 0, 0,
      0, 0, 0, 0, 4, 0, 4
    ]
  },
  51: {
    name: 'dot_case_2',
    algo: "f U R U' R' S' U R U' R' F'",
    normalizedPattern: [
      4, 4, 3, 3, 0, 1, 4,
      2, 1, 0, 0, 2, 0, 0,
      0, 3, 0, 1, 2, 0, 0
    ]
  },
  52: {
    name: 'dot_case_3',
    algo: "F R' F' R U S' R U' R' S",
    normalizedPattern: [
      0, 1, 1, 2, 0, 4, 3,
      3, 0, 0, 0, 1, 2, 0,
      0, 3, 0, 4, 4, 0, 2
    ]
  },
  53: {
    name: 'dot_case_4',
    algo: "S' R U R' S U' R' F R F'",
    normalizedPattern: [
      1, 1, 0, 2, 0, 4, 2,
      3, 0, 0, 0, 1, 2, 0,
      3, 4, 0, 3, 4, 0, 0
    ]
  },
  54: {
    name: 'dot_case_5',
    algo: "r U R' U R U2 r' r' U' R U' R' U2 r",
    normalizedPattern: [
      0, 4, 0, 3, 0, 1, 4,
      2, 2, 0, 0, 0, 1, 0,
      2, 4, 0, 1, 3, 0, 3
    ]
  },
  55: {
    name: 'dot_case_6',
    algo: "R' F2 R2 U2 R' F' R U2 R2 F2 R",
    normalizedPattern: [
      1, 2, 0, 3, 0, 1, 2,
      4, 4, 0, 0, 1, 0, 0,
      3, 0, 0, 3, 4, 0, 2
    ]
  },
  56: {
    name: 'dot_case_7',
    algo: "R' F2 R2 U2 R' F R U2 R2 F2 R",
    normalizedPattern: [
      0, 4, 1, 1, 0, 3, 2,
      2, 4, 1, 0, 0, 3, 0,
      0, 3, 0, 0, 4, 0, 2
    ]
  },
  57: {
    name: 'dot_case_8',
    algo: "S R' U' R U R U R U' R' S'",
    normalizedPattern: [
      0, 4, 0, 1, 0, 3, 0,
      2, 0, 4, 0, 4, 1, 0,
      1, 3, 0, 3, 2, 0, 2
    ]
  }
},
  pll: {
  0: {
    name: 'cube_solved',
    algo: '',
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 2, 2,
      2, 4, 4, 4, 3, 3, 3
    ]
  },
  1: {
    name: 'Ua Perm',
    algo: "R U R' U R' U' R2 U' R' U R' U R ",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 3, 3, 3, 4, 1,
      4, 2, 4, 2, 1, 2, 1
    ]
  },
  2: {
    name: 'Ub Perm',
    algo: "R' U R' U' R' U' R' U R U R2",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 2, 4,
      2, 4, 3, 4, 3, 2, 3
    ]
  },
  3: {
    name: 'H Perm',
    algo: "M2 U' M2 U2 M2 U' M2",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 3, 1, 2, 4,
      2, 4, 2, 4, 3, 1, 3
    ]
  },
  4: {
    name: 'Z Perm',
    algo: "M' U' M2 U' M2 U' M' U2 M2",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 2, 3, 2, 3, 2,
      3, 1, 4, 1, 4, 1, 4
    ]
  },
  5: {
    name: 'Aa Perm',
    algo: "x R' U R' D2 R U' R' D2 R2 x'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 3, 4, 2,
      1, 3, 4, 4, 2, 3, 2
    ]
  },
  6: {
    name: 'Ab Perm',
    algo: "x R2 D2 R U R' D2 R U' R x'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 2, 3, 2,
      3, 2, 4, 4, 4, 3, 1
    ]
  },
  7: {
    name: 'E Perm',
    algo: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 4, 1, 2, 3, 2,
      1, 1, 4, 3, 2, 3, 4
    ]
  },
  8: {
    name: 'T Perm',
    algo: "R U R' U' R' F R2 U' R' U' R U R' F'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 2, 3, 4,
      1, 4, 2, 4, 2, 3, 3
    ]
  },
  9: {
    name: 'F Perm',
    algo: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 3, 2, 3, 2,
      1, 4, 4, 4, 2, 1, 3
    ]
  },
  10: {
    name: 'Jb Perm',
    algo: "R U R' F' R U R' U' R' F  R2 U' R'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 4, 1, 1, 2, 4,
      4, 3, 3, 3, 1, 2, 2
    ]
  },
  11: {
    name: 'Ja/L Perm',
    algo: "x R2 F R F' R U2  r' U r U2 x'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 2, 3, 3,
      1, 4, 4, 4, 2, 2, 3
    ]
  },
  12: {
    name: 'Ra Perm',
    algo: "R U' R' U' R U R D R' U' R D' R' U2 R'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 4, 4, 1, 2, 1,
      4, 3, 2, 3, 1, 3, 2
    ]
  },
  13: {
    name: 'Rb Perm',
    algo: "R' U2 R U2 R' F  R U R' U' R' F' R2",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 4, 1, 4, 1, 4,
      2, 2, 3, 3, 3, 2, 1
    ]
  },
  14: {
    name: 'Y Perm',
    algo: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 3, 4, 2,
      2, 2, 3, 4, 3, 4, 1
    ]
  },
  15: {
    name: 'Na Perm',
    algo: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 3, 1, 1, 2, 4,
      4, 4, 2, 2, 1, 3, 3
    ]
  },
  16: {
    name: 'Nb Perm',
    algo: "R' U R U' R' F' U' F R U R' U' R U' f R f'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 3, 4, 4,
      2, 2, 2, 4, 3, 3, 1
    ]
  },
  17: {
    name: 'V Perm',
    algo: "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 3, 4, 3,
      2, 2, 4, 4, 3, 2, 1
    ]
  },
  18: {
    name: 'Ga Perm',
    algo: "R2 U R' U R' U' R U' R2 D U' R' U R D'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 2, 2, 3, 4,
      1, 4, 3, 4, 2, 1, 3
    ]
  },
  19: {
    name: 'Gb Perm',
    algo: "D R' U' R U D' R2 U R' U R U' R U' R2",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 3, 2, 3, 1,
      1, 4, 2, 4, 2, 4, 3
    ]
  },
  20: {
    name: 'Gc Perm',
    algo: "D R2 U' R U' R U R' U R2 D' U R U' R'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 3, 2, 3, 4,
      1, 4, 1, 4, 2, 2, 3
    ]
  },
  21: {
    name: 'Gd Perm',
    algo: "R U R' U' D R2 U' R U' R' U R' U R2 D'",
    normalizedPattern: [
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 4, 2, 3, 3,
      1, 4, 2, 4, 2, 1, 3
    ]
  }
},
};

