export const LAST_LAYER_ALGO_STORE = {
  oll: {
    // cube solved -> top layer stickers all same color, but adjacent ones can be different
    0: { name: "cube_solved", algo: "" },

    // solved cross
    1: { name: "solved_cross_1", algo: "R U R' U R U2 R'" },
    2: { name: "solved_cross_2", algo: "R U2 R' U' R U' R'" },
    3: { name: "solved_cross_3", algo: "R U R' U R U' R' U R U2 R'" }, // apply to solved cube + y to get shape
    4: { name: "solved_cross_4", algo: "R U2 (R2 U') (R2 U') R2 U2 R" }, 
    5: { name: "solved_cross_5", algo: "(R U R) D (R' U' R) D' R2" },
    6: { name: "solved_cross_6", algo: "R2 D' (R U' R') D (R U R)" },
    7: { name: "solved_cross_7", algo: "R2 D (R' U2 R) D' (R' U2 R')" },

    // T Shapes
    8: { name: "t_shape_1", algo: "F (R U R' U') F'" },
    9: { name: "t_shape_2", algo: "(R U R' U') (R' F R F')" },

    // Block Shapes
    10: { name: "block_shape_1", algo: "(r U2 R') U' R U' r'" },
    11: { name: "block_shape_2", algo: "(r' U2 R) U R' U r" },

    // Edges only
    12: { name: "edge_only_1", algo: "(r U R' U') M (U R U' R')" },
    13: { name: "edge_only_2", algo: "(R U R' U') M' (U R U' r')" },

    // Lightning Shapes
    14: { name: "lightning_shape_1", algo: "r U R' U (R U2 r')" },
    15: { name: "lightning_shape_2", algo: "R' F' (r U' r') F2 R" },
    16: { name: "lightning_shape_3", algo: "r' (R2 U R' U R U2 R') U M'" },
    17: { name: "lightning_shape_4", algo: "r (R2 U' R U' R' U2 R) U' M" },
    18: { name: "lightning_shape_5", algo: "(f R' F' R) (U R U' R') S'" },
    19: { name: "lightning_shape_6", algo: "f' (r U r' U') (r' F r S)" },

    // P shapes
    20: { name: "p_shape_1", algo: "F (U R U' R') F'" },
    21: { name: "p_shape_2", algo: "R' (U' F' U F) R" },
    22: { name: "p_shape_3", algo: "R' U' F (U R U' R') F' R" },
    23: { name: "p_shape_4", algo: "S (R U R' U') (R' F R f')" },

    // C shapes
    24: { name: "c_shape_1", algo: "R' U' (R' F R F') U R" },
    25: { name: "c_shape_2", algo: "f R f' U' r' U' R U M'" },

    // fish shapes
    26: { name: "fish_shape_1", algo: "(F R' F' R) (U R U' R')" },
    27: { name: "fish_shape_2", algo: "R U2 R2' (F R F' R) U2 R'" },
    28: { name: "fish_shape_3", algo: "(R U R' U') R' F (R2 U R' U') F'" },
    29: { name: "fish_shape_4", algo: "R U R' U (R' F R F') R U2 R'" },

    // W shapes
    30: { name: "w_shape_1", algo: "(R U R' U) R U' R' U' (R' F R F')" },
    31: { name: "w_shape_2", algo: "(L' U' L U') L' U L U (r U' r' F)" },

    // Hook Shapes
    32: { name: "hook_shape_1", algo: "F (R U R' U') (R U R' U') F'" },
    33: { name: "hook_shape_2", algo: "(F R' F' R) U2 (R U' R' U) R U2 R'" },
    34: { name: "hook_shape_3", algo: "r U R' U (R U' R' U) R U2 r'" },
    35: { name: "hook_shape_4", algo: "r' U' R U' (R' U R U') R' U2 r" },
    36: { name: "hook_shape_5", algo: "r U' (r2' U) (r2 U) r2' U' r" },
    37: { name: "hook_shape_6", algo: "r' U (r2 U') (r2' U') r2 U r'" },

    // Line shapes
    38: { name: "line_shape_1", algo: "F (U R U' R') (U R U' R') F'" },
    39: { name: "line_shape_2", algo: " R' (F' U' F U') R U R' U R" },
    40: { name: "line_shape_3", algo: "r U r' (U R U' R') (U R U' R') r U' r'" },
    41: { name: "line_shape_4", algo: "R' F (R U R U') R2 F' R2 U' R' U (R U R')" },

    // L shapes
    42: { name: "l_shape_1", algo: "r U r' (R U R' U') r U' r'" },
    43: { name: "l_shape_2", algo: "R' F' R (L' U' L U) R' F R" },
    44: { name: "l_shape_3", algo: "(F U R U') R2 F' R (U R U' R')" },
    45: { name: "l_shape_4", algo: "R' F (R U R') F' R (F U' F')" },

    // Awkward shapes
    46: { name: "awkward_shape_1", algo: "r2 D' (r U r') D r2 U' (r' U' r)" },
    47: { name: "awkward_shape_2", algo: "F U (R U2 R' U') (R U2 R' U') F'" },
    48: { name: "awkward_shape_3", algo: "(R U R' U R U2 R') F (R U R' U') F'" },
    49: { name: "awkward_shape_4", algo: "R' U' F2 u' (R U R') D R2 B" },

    // Dot cases
    50: { name: "dot_case_1", algo: "R U2 (R2 F R F') U2 (R' F R F')" },
    51: { name: "dot_case_2", algo: "f (U R U' R') S' (U R U' R') F'" },
    52: { name: "dot_case_3", algo: "(F R' F' R) U S' (R U' R') S" },
    53: { name: "dot_case_4", algo: "S' (R U R') S U' (R' F R F')" },
    54: { name: "dot_case_5", algo: "(r U R' U R U2 r') (r' U' R U' R' U2 r)" },
    55: { name: "dot_case_6", algo: "(R' F2 R2 U2 R') F' (R U2 R2 F2 R)" },
    56: { name: "dot_case_7", algo: "(R' F2 R2 U2 R') F (R U2 R2 F2 R)" },
    57: { name: "dot_case_8", algo: "S R' U' (R U) (R U) R U' R' S'" },
  },
  pll: {
    // cube solved
    0: { name: "cube_solved", algo: "" },

    // edges only
    1: { name: "Ua Perm", algo: "(R U R' U) R' U' (R2 U' R') U R' U R" },
    2: { name: "Ub Perm", algo: "R' U R' U' (R3 U') R' U (R U R2)" },
    3: { name: "H Perm", algo: "M2 U' (M2 U2 M2) U' M2" },
    4: { name: "Z Perm", algo: "M' U' (M2 U') (M2 U') M' U2 M2" },

    // corners only
    5: { name: "Aa Perm", algo: "x (R' U R') D2 (R U' R') D2 R2 x'" },
    6: { name: "Ab Perm", algo: "x R2 D2 (R U R') D2 (R U' R) x'" },
    7: { name: "E Perm", algo: "x' (R U' R') D (R U R') D' (R U R') D (R U' R') D' x" },

    // Adjacent Swap
    8: { name: "T Perm", algo: "(R U R' U') R' F (R2 U' R') U' (R U R' F')" },
    9: { name: "F Perm", algo: "R' U' F' (R U R' U') R' F (R2 U' R') U' (R U R') U R" },
    10: { name: "Jb Perm", algo: "R U R' F' (R U R' U') R' F  (R2 U' R')" },
    11: { name: "Ja/L Perm", algo: "x R2 (F R F' R) U2  (r' U r) U2 x'" },
    12: { name: "Ra Perm", algo: "(R U' R' U') R U R D (R' U' R D') R' U2 R'" },
    13: { name: "Rb Perm", algo: "(R' U2 R U2) R' F  (R U R' U') R' F' R2" },

    // Diagonal Swap
    14: { name: "Y Perm", algo: "F (R U' R' U') R U R' F' (R U R' U') R' F R F'" },
    15: { name: "Na Perm", algo: "(R U R' U) R U R' F' (R U R' U') R' F (R2 U' R') U2 R U' R'" },
    16: { name: "Nb Perm", algo: "(R' U R U') R' (F' U' F) R U (R' U' R U') f R f'" },
    17: { name: "V Perm", algo: "(R' U R' U') R D' R' D R'(U D' R2 U' R2 D R2" },

    // G Perms
    18: { name: "Ga Perm", algo: "R2 (U R' U R') U' R U' R2 (D U') R' U R D'" },
    19: { name: "Gb Perm", algo: "D R' U' R (U D') R2 U R' U (R U' R U') R2" },
    20: { name: "Gc Perm", algo: "D R2 (U' R U' R) U R' U R2 (D' U) R U' R'" },
    21: { name: "Gd Perm", algo: "R U R' (U' D) R2 U' R U'(R' U R' U) R2 D'" },
  },
};

