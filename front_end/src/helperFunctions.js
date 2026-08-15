import { verifyF2LSolved } from "./validate_cube_state.js";

function verifyOLLSolved(cube) {
  if (!verifyF2LSolved(cube)) {
    return false
  }

  const topCenterColor = cube[4];
  for (let i=0; i<9; i++) {
    if(cube[i] !== topCenterColor) {
      return false
    }
  }

  return true;
}

export function updateUIButtons(cube) {
  const ollButton = document.getElementById("btn-predict-oll")
  const pllButton = document.getElementById("btn-predict-pll")

  const canRunOLL = verifyF2LSolved(cube)
  const canRunPLL = verifyOLLSolved(cube)

  ollButton.disabled = !canRunOLL;
  pllButton.disabled = !canRunPLL;
}

// updateUIButtons(cube.getCube())

// { name: t-perm, algo: "R u R' U", pre: "U2 y" }

export function displayPredictions(predictedResult) {
  const solutionCard = document.getElementById("solution-card");

  const algoName = document.getElementById("case-name");
  const algoString = document.getElementById("core-algo")
  const preMoves = document.getElementById("pre-moves");

  algoName.textContent = predictedResult["name"]
  algoString.textContent = predictedResult["algo"]
  preMoves.textContent = predictedResult["pre"] ? `(${predictedResult["pre"]})` : ""

  solutionCard.classList.remove("hidden")
}




export function toggleControls() {
  // open and close buttons
  const toggleBtn = document.getElementById('controls-toggle-btn');
  const closeBtn = document.getElementById('close-controls-btn');

  const controlsPanel = document.getElementById('controls-panel');

  function togglePanel() {
    controlsPanel.classList.toggle("hidden")
  }

  toggleBtn.addEventListener("click", togglePanel)
  closeBtn.addEventListener("click", togglePanel)

  window.addEventListener("keydown", (e) => {
    if(e.key === "?") {
      togglePanel()
    }
  })
}

export function setMode(controls, isHardMode) {
  const easyBtn = document.getElementById("easy-mode-btn")
  const hardBtn = document.getElementById("hard-mode-btn")

  function updatePlayAlgoBtn () {
    const playBtn = document.getElementById("play-algo-btn");

    if (!playBtn) return; // user has not clicked pll button

    if (isHardMode) {
      playBtn.disabled = true;
      playBtn.title = "Playback is disabled in Hard Mode!!"
    } else {
      playBtn.disabled = false;
      playBtn.title = "Play algorithm animation"
    }
  }

  function setHardMode(enableHardMode) {
    // something
    isHardMode = enableHardMode;

    if(controls) controls.enabled = !isHardMode;

    easyBtn.classList.toggle('active', !isHardMode);
    hardBtn.classList.toggle('active', isHardMode);

    // updatePlayAlgoBtn();
  }

  easyBtn.addEventListener("click", () => setHardMode(false))
  hardBtn.addEventListener("click", () => setHardMode(true))

  setHardMode(isHardMode)
}

