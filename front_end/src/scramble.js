import { animateMove } from "./controls";
import { moveToCubiePosition } from "./rotating_animations";
import { updateUIButtons } from "./helperFunctions";

const MOVES = ["u", "U", "d", "D", "r", "R", "l", "L", "f", "F", "b", "B"];

export function scrambleCube(
  movesCount = 20,
  cubeState,
  syncFunc,
  cubies,
  scene,
  appState,
  onCompleteCallback,
) {
  if (appState.isRotating) return;

  appState.isRotating = true;

  const queue = [];

  // Generate random moves, making sure we don't immediately undo the previous move
  // (e.g., preventing "U" followed immediately by "u")
  let lastMove = "";
  while (queue.length < movesCount) {
    // pick random move from MOVES array
    const randomMove = MOVES[Math.floor(Math.random() * MOVES.length)];

    // Ensure this move is not the direct opposite of the last move
    if (lastMove && randomMove.toLowerCase() === lastMove.toLowerCase()) {
      continue;
    }

    // push random move into queue and update the lastMove variable
    queue.push(randomMove);
    lastMove = randomMove;
  }

  console.log("Scramble Sequence:", queue.join(" "));

  // executes one move at a time.
  function executeNext() {
    // scramble finished
    if (queue.length === 0) {
      appState.isRotating = false;

      console.log("Scramble DONE");
      if (onCompleteCallback) onCompleteCallback();
      return;
    }

    // take first move in the queue and shift all other moves up the queue.
    const currentMoveKey = queue.shift();
    const moveInfo = moveToCubiePosition[currentMoveKey]; // get its move info

    // Run the visual animation, and call executeNext when it's done
    animateMove(moveInfo, cubeState, syncFunc, cubies, scene, () => {
      // updateUIButtons(cubeState.getCube());
      executeNext(); // call this function recursively
    });
  }

  executeNext();
}
