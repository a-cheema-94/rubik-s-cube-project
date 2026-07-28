import * as tf from '@tensorflow/tfjs';
import { validateCubeForModel } from './validate_cube_state';
import { LAST_LAYER_ALGO_STORE } from '../ml_section/oll_pll_algos';

export async function loadModels() {
  console.log("Attempting to load ML models...");

  try {
    // 1. Load the OLL model
    // Note the path: Vite maps ./public/models directly to /models
    const ollModel = await tf.loadLayersModel('/models/oll_model/model.json');
    console.log("OLL Model loaded successfully!");
    
    // Print the model architecture to the console to prove it's fully intact
    console.log("OLL Architecture:");
    ollModel.summary(); 

    // 2. Load the PLL model
    const pllModel = await tf.loadLayersModel('/models/pll_model/model.json');
    console.log("PLL Model loaded successfully!");
    
    console.log("PLL Architecture:");
    pllModel.summary();

    console.log("Models are loaded into memory and ready for future predictions.");
    
    // We return them just in case you want to attach this to a variable later
    return { ollModel, pllModel };

  } catch (error) {
    console.error("Failed to load models. Check your paths and Vite server.", error);
  }
}

export async function handlePredictions(cube, ollModel, pllModel, userModelRequest) {
  
  const { encodedData, state: actualCubeState } = validateCubeForModel(cube);

  if (actualCubeState === "none") {
    alert("Cube is ready for model, solve first two layers.")
  }

  // we compare which button the user clicked against the actual state of the cube.
  if(actualCubeState !== userModelRequest) {
    console.warn(`User requested ${userModelRequest}, but cube state is ${actualCubeState}`)
    return;
  }
  
  const currModel = userModelRequest === "pll" ? pllModel : ollModel;
  
  // execute prediction
  const inputTensor = tf.tensor2d([encodedData]);
  console.log("INPUT TENSOR: ", inputTensor)
  console.log("CURR MODEL: ", currModel)
  const prediction = currModel.predict(inputTensor);
  // find the index with the largest probability
  // extract index from tensor flow object
  const predictionIdx = prediction.argMax(-1).dataSync()[0]


  inputTensor.dispose()
  prediction.dispose()

  // use state variable to extract either oll or pll list of algos
  const currAlgoStore = LAST_LAYER_ALGO_STORE[actualCubeState]
  const predictedAlgo = currAlgoStore[predictionIdx];
  console.log(`PREDICTION: ${userModelRequest.toUpperCase()} Case: `, predictedAlgo.name)

  return predictedAlgo;

}