

//     export const COLORS = {
//   0: WHITE,
//   1: YELLOW,
//   2: BLUE,
//   3: GREEN,
//   4: ORANGE,
//   5: RED
// }

import { LAST_LAYER_ALGO_STORE } from "./oll_pll_algos"

const INVERSES = {
  // oll
  "solved_cross_1": "solved_cross_2",
  "solved_cross_2": "solved_cross_1",
  "solved_cross_3": "solved_cross_3", // y
  "solved_cross_4": "solved_cross_4", 
  "solved_cross_5": "solved_cross_6", // + y
  "solved_cross_6": "solved_cross_5", // + y2
  "solved_cross_7": "solved_cross_6", // + y2

  "t_shape_1": "p_shape_1",
  "t_shape-2": "fish_shape_1",

  "block_shape_1": "lightning_shape_1",
  "block_shape_2": "lightning_shape_2", // + y2

  "edge_only_1": "edge_only_2",
  "edge_only_2": "edge_only_1",

  "lightning_shape_1": "block_shape_1",
  "lightning_shape_2": "block_shape_2", // + y2
  "lightning_shape_3": "block_shape_1", // + y'
  "lightning_shape_4": "block_shape_2", // y
  "lightning_shape_5": "p_shape_4",
  "lightning_shape_6": "p_shape_3", // y2
  
  "p_shape_1": "t_shape_1",
  "p_shape_2": "t_shape_1", // y
  "p_shape_3": "lightning_shape_5", // y2
  "p_shape_4": "lightning_shape_5",
  
  "c_shape_1": "p_shape_2", // y'
  "c_shape_2": "fish_shape_1", // y
  
  "fish_shape_1": "t_shape_2",
  "fish_shape_2": "fish_shape_1",
  "fish_shape_3": "l_shape_3",
  "fish_shape_4": "lightning_shape_2", // y2

  "w_shape_1": "p_shape_3", // y
  "w_shape_2": "p_shape_4", // y

  "hook_shape_1": "line_shape_1",
  "hook_shape_2": "hook_shape_1",
  "hook_shape_3": "hook_shape_3", // y
  "hook_shape_4": "hook_shape_4", // y'
  "hook_shape_5": "hook_shape_6",
  "hook_shape_6": "hook_shape_5",


  "line_shape_1": "hook_shape_1",
  "line_shape_2": "line_shape_2", // y2
  "line_shape_3": "hook_shape_3", // y
  "line_shape_4": "hook_shape_3", // y

  "l_shape_1": "lightning_shape_1",
  "l_shape_2": "lightning_shape_2",
  "l_shape_3": "fish_shape_3",
  "l_shape_4": "fish_shape_4", // y'


  "awkward_shape_1": "t_shape_2", // y2
  "awkward_shape_2": "p_shape_1", // y'
  "awkward_shape_3": "p_shape_2",
  "awkward_shape_4": "t_shape_1",

  "dot_case_1": "dot_case_2",
  "dot_case_2": "dot_case_2", // y2
  "dot_case_3": "dot_case_4",
  "dot_case_4": "dot_case_3",
  "dot_case_5": "dot_case_4", // y
  "dot_case_6": "dot_case_7",
  "dot_case_7": "dot_case_6",
  "dot_case_8": "dot_case_8",

  // pll
  "Ua Perm": "Ub Perm", // y2
  "Ub Perm": "Ua Perm",
  "H Perm": "Ub Perm", // y
  "Z Perm": "Z Perm", // y
  
  "Aa Perm": "Ab Perm",
  "Ab Perm": "Aa Perm",
  "E Perm": "E Perm",

  "T Perm": "T Perm",
  "F Perm": "F Perm",
  "Jb Perm": "Jb Perm", // y
  "Ja/L Perm": "Ja/L Perm",
  "Ra Perm": "Ra Perm", // y'
  "Rb Perm": "Rb Perm", // y'

  "Y Perm": "Y Perm",
  "Na Perm": "Na Perm",
  "Nb Perm": "Nb Perm",
  "V Perm": "V Perm",
  
  "Ga Perm": "Gb Perm",
  "Gb Perm": "Ga Perm",
  "Gc Perm": "Gd Perm",
  "Gd Perm": "Gc Perm",
}


const SAMPLE_SOLVED_CUBE = [
      4, 4, 4, 4, 4, 4, 4, 4, 4,  // U (0-8)
      2, 2, 2, 2, 2, 2, 2, 2, 2,  // F (9-17)
      5, 5, 5, 5, 5, 5, 5, 5, 5,  // D (18-26)
      0, 0, 0, 0, 0, 0, 0, 0, 0,  // L (27-35)
      1, 1, 1, 1, 1, 1, 1, 1, 1,  // R (36-44)
      3, 3, 3, 3, 3, 3, 3, 3, 3   // B (45-53)
    ]




// steps for generating sample data for model.
  // colors fixed to indices in state. How to split off? -> show configurations of state array -> unsolved last layer with the rest solved for each color?
  // apply all algorithm and find inverses and relationships. - DONE
  // how to split top layer from whole cube
  // work out what configurations to apply for a varied training set.

