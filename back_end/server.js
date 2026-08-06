const express = require("express");
const cors = require("cors"); // avoid browser blocking due to CORS.
const kociemba = require("kociemba");


const app = express();
const PORT = 3000;

// middleware
app.use(cors())
app.use(express.json()) // parse json responses

// listens for requests at endpoint: /api/solve
app.post("/api/solve", (req, res) => {
  try {
    const { cubeStateString } = req.body;

    if (!cubeStateString || cubeStateString.length !== 54) {
      return res.status(400).json({
        success: false,
        error: "Invalid Input, need a 54 character string!!"
      })
    }

    console.log(`Request with cube string received.`)

    const solution = kociemba.solve(cubeStateString)

    console.log(`Solution algo string found: ${solution}`);

    res.status(200).json({
      success: true,
      solution: solution
    })

  } catch (error) {
    console.error("Error: ", error.message);
    res.status(422).json({
      success: false,
      error: "Cube state unsolvable. Look though logic and double check state array and camera orientation."
    })
  }
})

app.listen(PORT, () => {
  console.log(`Solver backend running on http://localhost:${PORT}`)
})