import * as tf from "@tensorflow/tfjs";
import {
  calculatePreRotations,
  validateCubeForModel,
} from "./validate_cube_state.js";
import { LAST_LAYER_ALGO_STORE } from "../ml_section/oll_pll_algos.js";
import { getFaceFacingCamera } from "./getFacingCameraHelper.js";
import { displayPredictions } from "./helperFunctions.js";

export async function loadModels() {
  console.log("Attempting to load ML models...");

  try {
    // Load the OLL model

    const ollModel = await tf.loadLayersModel("/models/oll_model/model.json");
    console.log("OLL Model loaded successfully!");

    // Print the model architecture to the console to prove it's fully intact
    console.log("OLL Architecture:");
    ollModel.summary();

    // Load the PLL model
    const pllModel = await tf.loadLayersModel("/models/pll_model/model.json");
    console.log("PLL Model loaded successfully!");

    console.log("PLL Architecture:");
    pllModel.summary();

    console.log(
      "Models are loaded into memory and ready for future predictions.",
    );

    // We return them just in case you want to attach this to a variable later
    return { ollModel, pllModel };
  } catch (error) {
    console.error(
      "Failed to load models. Check your paths and Vite server.",
      error,
    );
  }
}

export async function handlePredictions(
  cube,
  ollModel,
  pllModel,
  userModelRequest,
  camera,
) {
  const {
    encodedData,
    state: actualCubeState,
    currCube,
  } = validateCubeForModel(cube);

  if (actualCubeState === "none") {
    alert("Cube is not ready for model, solve first two layers.");
  }

  // we compare which button the user clicked against the actual state of the cube.
  if (actualCubeState !== userModelRequest) {
    console.warn(
      `User requested ${userModelRequest}, but cube state is ${actualCubeState}`,
    );
    alert(`Cannot run ${userModelRequest.toUpperCase()} prediction. Current detected state: ${actualCubeState.toUpperCase()}.`)
    return;
  }

  const currModel = userModelRequest === "pll" ? pllModel : ollModel;

  // execute prediction
  const inputTensor = tf.tensor2d([encodedData]);
  console.log("INPUT TENSOR: ", inputTensor);
  console.log("CURR MODEL: ", currModel);
  const prediction = currModel.predict(inputTensor);
  // find the index with the largest probability
  // extract index from tensor flow object
  const predictionIdx = prediction.argMax(-1).dataSync()[0];

  inputTensor.dispose();
  prediction.dispose();

  // use state variable to extract either oll or pll list of algos
  const currAlgoStore = LAST_LAYER_ALGO_STORE[actualCubeState];

  const predictedAlgo = currAlgoStore[predictionIdx];
  console.log(
    `PREDICTION: ${userModelRequest.toUpperCase()} Case: `,
    predictedAlgo.name,
  );

  // ? Here is where to input logic about correct face for algo -> attach pre y or U rotations to algo. Call the function here.
  // todo => sometimes pre rotations get it wrong
  const possiblePreRotation = calculatePreRotations(
    currCube,
    predictedAlgo["normalizedPattern"],
    userModelRequest,
  );

  console.log("PREDICTED ALGO NAME: ", predictedAlgo["name"]);

  console.log("IS THERE A PRE ROTATION??: ", possiblePreRotation);

  // Map how many Y rotations are needed to turn the camera's front face into logical Front
  const cameraYOffsetMap = {
    F: "",
    R: "y'",
    B: "y2",
    L: "y",
  };

  const cameraFacingFace = getFaceFacingCamera(camera);
  const cameraOffset = cameraYOffsetMap[cameraFacingFace];

  const predictedResult = {};

  predictedResult["name"] =
    `${userModelRequest.toUpperCase()}: ${predictedAlgo.name}`;
  predictedResult["algo"] = predictedAlgo.algo;
  let fullPreMoves = "";

  // Combine camera orientation + setup orientation + model pre-y rotation
  let finalAlgo = predictedAlgo["algo"];

  if (possiblePreRotation) {
    finalAlgo = `${possiblePreRotation} ${finalAlgo}`;
    fullPreMoves = possiblePreRotation + fullPreMoves;
    predictedResult["pre"] = fullPreMoves;
  }
  if (cameraOffset) {
    finalAlgo = `${possiblePreRotation} ${finalAlgo}`;
    fullPreMoves = cameraOffset + " " + fullPreMoves;
    predictedResult["pre"] = fullPreMoves;
  }

  console.log("PREDICTED RESULT: ", predictedResult);
  displayPredictions(predictedResult);

  return finalAlgo;

  // console.log("ALGO NAME: ", predictedAlgo["name"])
  // return predictedAlgo["algo"]
}
