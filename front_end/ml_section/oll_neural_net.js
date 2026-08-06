import * as tf from "@tensorflow/tfjs-node";
import fs from "fs";

console.log("===================START==========================")

// read csv file
const csv = fs.readFileSync("./ml_section/data/oll_training_data.csv", "utf-8")

console.log(typeof(csv))

const rows = csv.trim().split("\n"); // trim whitespace and have an array which each element being a row of 105.

const headerRow = rows.shift().split(",");
// console.log("SHOULD BE 106: ", headerRow.length)
const labelIdx = headerRow.indexOf("label")
// console.log("LABEL INDEX: ", labelIdx) // 105

const X_values = []
const y_values = []

// console.log("TESTING TO SEE IF HEADERS REMOVED", rows[0].split(",")[labelIdx]) // 0




rows.forEach(row => {
  const values = row.split(",").map(val => Number(val))

  // push features into X_values and labels into y_values
  y_values.push(values[labelIdx])
  values.splice(labelIdx, 1);
  X_values.push(values)
})

// 58 * 16 = 928
// console.log(X_values.length)
// console.log(y_values.length)
// console.log(X_values)
// console.log(y_values)

// convert js arrays to tensors
const X = tf.tensor2d(X_values, [X_values.length, 105], "float32")
const y = tf.tensor1d(y_values, "float32")

console.log("X TENSOR OBJECT: ", X)
console.log("Y TENSOR OBJECT: ", y)

// model architecture

// define layers, nodes and activations
const oll_model = tf.sequential();

oll_model.add(
  tf.layers.dense({
    inputShape: [105],
    units: 128,
    activation: "relu",
  })
);

oll_model.add(
  tf.layers.dense({
    units: 64,
    activation: "relu",
  })
);

oll_model.add(
  tf.layers.dense({
    units: 58,
    activation: "softmax",
  })
);

oll_model.compile({
  optimizer: "adam",
  loss: "sparseCategoricalCrossentropy",
  metrics: ["accuracy"]
})

async function trainAndSaveModel() {
  console.log("Starting the training process.............");

  await oll_model.fit(X, y, {
    epochs: 150,
    batchSize: 16,
  });

  // evaluate model
  const evalRes = oll_model.evaluate(X, y);

  const loss = await evalRes[0].data();
  const accuracy = await evalRes[1].data();

  console.log(`Overall Model Accuracy: ${(accuracy[0] * 100).toFixed(2)}%`)
  console.log(`Overall Model Loss: ${(loss[0] * 100).toFixed(2)}%`)

  // save to public folder
  const filepath = "file://./public/models/oll_model"

  await oll_model.save(filepath)

  console.log(`Model saved at ${filepath}`)


  // testing
  console.log("==========BEGIN TESTING==========")
  // Grab the 151st row (slice keeps the 2D shape: [1, 105])
  const sample_input = X.slice([151, 0], [1, 105]); 
  
  // y is a 1D tensor, so we just get the scalar value
  const actual_label_tensor = y.slice([151], [1]); 
  const actual_label = actual_label_tensor.dataSync()[0];

  // Run prediction
  const probabilities = oll_model.predict(sample_input);
  
  // tf.argMax requires the axis to calculate along (axis 1 for flat arrays)
  const predicted_class_tensor = probabilities.argMax(1);
  const predicted_class = predicted_class_tensor.dataSync()[0];
  
  const confidence_tensor = probabilities.max(1);
  const confidence = confidence_tensor.dataSync()[0] * 100;

  console.log(`Actual Label:    ${actual_label}`);
  console.log(`Predicted Class: ${predicted_class}`);
  console.log(`Confidence:      ${confidence.toFixed(2)}%`);

  // Clean up memory
  sample_input.dispose();
  actual_label_tensor.dispose();
  probabilities.dispose();
  predicted_class_tensor.dispose();
  confidence_tensor.dispose();
}



trainAndSaveModel();