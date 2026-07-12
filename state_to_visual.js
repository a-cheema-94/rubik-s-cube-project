const COORDINATES_TO_STATE_INDEXES = {
  "-1,-1,-1": [null, 33, null, 24, null, 53],
  "-1,-1,0": [null, 34, null, 21, null, null],
  "-1,-1,1": [null, 35, null, 18, 15, null],

  "-1,0,-1": [null, 30, null, null, null, 50],
  "-1,0,0": [null, 31, null, null, null, null],
  "-1,0,1": [null, 32, null, null, 12, null],

  "-1,1,-1": [null, 27, 0, null, null, 47],
  "-1,1,0": [null, 28, 3, null, null, null],
  "-1,1,1": [null, 29, 6, null, 9, null],

  "0,-1,-1": [null, null, null, 25, null, 52],
  "0,-1,0": [null, null, null, 22, null, null],
  "0,-1,1": [null, null, null, 19, 16, null],

  "0,0,-1": [null, null, null, null, null, 49],
  "0,0,0": [null, null, null, null, null, null],
  "0,0,1": [null, null, null, null, 13, null],

  "0,1,-1": [null, null, 1, null, null, 46],
  "0,1,0": [null, null, 4, null, null, null],
  "0,1,1": [null, null, 7, null, 10, null],

  "1,-1,-1": [44, null, null, 26, null, 51],
  "1,-1,0": [43, null, null, 23, null, null],
  "1,-1,1": [42, null, null, 20, 17, null],

  "1,0,-1": [41, null, null, null, null, 48],
  "1,0,0": [40, null, null, null, null, null],
  "1,0,1": [39, null, null, null, 14, null],

  "1,1,-1": [38, null, 2, null, null, 45],
  "1,1,0": [37, null, 5, null, null, null],
  "1,1,1": [36, null, 8, null, 11, null],
};

export {COORDINATES_TO_STATE_INDEXES}