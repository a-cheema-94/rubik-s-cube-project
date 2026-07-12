export function keyboardControls(cube, syncFunc) {

  window.addEventListener("keydown", (e) => {
  let moveExecuted = true;

  switch (e.key) {
    // Clockwise Moves (Lowercase)
    case "u": cube.moveU(); break;
    case "d": cube.moveD(); break;
    case "l": cube.moveL(); break;
    case "r": cube.moveR(); break;
    case "f": cube.moveF(); break;
    case "b": cube.moveB(); break;
    case "m": cube.moveM(); break;
    case "e": cube.moveE(); break;

    // Anti-clockwise Moves (Uppercase / Shift + key)
    case "U": cube.moveUDash(); break;
    case "D": cube.moveDDash(); break;
    case "L": cube.moveLDash(); break;
    case "R": cube.moveRDash(); break;
    case "F": cube.moveFDash(); break;
    case "B": cube.moveBDash(); break;
    case "M": cube.moveMDash(); break;
    case "E": cube.moveEDash(); break;

    default:
      // Key pressed wasn't a valid move
      moveExecuted = false; 
  }

  // Only update the visuals if a valid move was actually made
  if (moveExecuted) {
    syncFunc();
  }
});

}