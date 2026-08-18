import { LAST_LAYER_ALGO_STORE } from "./oll_pll_algos.js"
import { oneHotEncode, SyntheticDataGenerator } from "./generateSampleData.js";
import { RubiksCube } from "../rubik's_cube_state.js";
import { colorToFacesNormalizer } from "./colorNormalizer.js";
import fs from "node:fs";

// setup and create oll and pll csv files

const cube = new RubiksCube();
const dataGenerator = new SyntheticDataGenerator(cube, colorToFacesNormalizer, oneHotEncode)

let ollSuccess = false
let pllSuccess = false

function exportToCSVFile(data, filename) {
  // header row:
  let header = []

  for (let i=0; i<105; i++ ) {
    // push each "feature" onto header => f0, f1, ... f104
    header.push(`f_${i}`)
  }
  header = header.join(",") + ",label\n"

  // convert dataset arrays into excel format:
  // 0,1,0,1,0,1,0,1,0,....,target_algo
  const excel_rows = data.map(datapoint => {
    return `${datapoint.data.join(",")},${datapoint.target}`
  }).join("\n");

  fs.writeFileSync(filename, header + excel_rows);
  console.log(`Wrote ${data.length} entries to file: ${filename}`)

  if (data.length === 928) {
    ollSuccess = true;
  } else if (data.length === 352) {
    pllSuccess = true;
  }
}

// oll
for(const [key, value] of Object.entries(LAST_LAYER_ALGO_STORE["oll"])){
  
  dataGenerator.generateDataSamples(value["algo"], parseInt(key))
}
exportToCSVFile(dataGenerator.dataset, "./ml_section/data/oll_training_data.csv")
// empty dataset before populating with pll data
dataGenerator.dataset = [];

// pll
for(const [key, value] of Object.entries(LAST_LAYER_ALGO_STORE["pll"])){
  
  dataGenerator.generateDataSamples(value["algo"], parseInt(key))
}
exportToCSVFile(dataGenerator.dataset, "./ml_section/data/pll_training_data.csv")


if(ollSuccess) console.log("OLL SUCCESS !!!")
if(pllSuccess) console.log("PLL SUCCESS !!!")

console.log(cube.errorAlgos)