import * as tf from '@tensorflow/tfjs';

export async function testModelLoading() {
  console.log("Attempting to load ML models...");

  try {
    // 1. Load the OLL model
    // Note the path: Vite maps ./public/models directly to /models
    const ollModel = await tf.loadLayersModel('/models/oll_model/model.json');
    console.log("✅ OLL Model loaded successfully!");
    
    // Print the model architecture to the console to prove it's fully intact
    console.log("OLL Architecture:");
    ollModel.summary(); 

    // 2. Load the PLL model
    const pllModel = await tf.loadLayersModel('/models/pll_model/model.json');
    console.log("✅ PLL Model loaded successfully!");
    
    console.log("PLL Architecture:");
    pllModel.summary();

    console.log("Models are loaded into memory and ready for future predictions.");
    
    // We return them just in case you want to attach this to a variable later
    return { ollModel, pllModel };

  } catch (error) {
    console.error("❌ Failed to load models. Check your paths and Vite server.", error);
  }
}