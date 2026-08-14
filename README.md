# Rubik's Cube Solver & CFOP Predictor

An interactive web application that provides a virtual Rubik's Cube environment, machine learning-based CFOP phase prediction (OLL/PLL), and optimal graph-search solving. 

This project was built as part of an MSc dissertation, focusing on the intersection of Machine Learning (TensorFlow.js) and combinatorial graph-search algorithms (Kociemba's Two-Phase Algorithm).

## Architecture Overview

To optimize performance and avoid blocking the browser's main thread, this project uses a decoupled microservice architecture:
*   **Frontend (`/frontend`):** Built with React and Vite. Handles the 3D/2D cube rendering, state management (54-element array), and TensorFlow.js client-side inference for CFOP stage predictions (OLL/PLL).
*   **Backend (`/solver-backend`):** A lightweight Node.js/Express microservice that runs the native Kociemba algorithm to calculate optimal 20-move solutions via the Kociemba npm package.

## Features
*   **Virtual Cube State:** Robust decoupled 54-element array mapping.
*   **ML Phase Prediction:** Uses TensorFlow.js to classify OLL and PLL states, automatically calculating required U and y pre-rotations to match on screen cube.
*   **Optimal Solver API:** Offloads the heavy Two-Phase algorithm to a Node.js backend for instant, non-blocking solves.

---

##  Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your machine.


### 1. Clone the Repository
```bash
git clone [https://github.com/a-cheema-94/rubik-s-cube-project.git](https://github.com/a-cheema-94/rubik-s-cube-project.git)
cd rubik-s-cube-project
```

### 2. Setup and Run the Backend (Solver API)
The backend must be running for the frontend to receive optimal Kociemba solutions. It runs on http://localhost:3000

Open your terminal and run:
```bash
cd back_end/
npm install
node server.js

```
***You should see a message confirming: "Solver backend running on http://localhost:3000".***

#### 3. Setup and Run the Frontend (UI)
Open a second, separate terminal window (leave the backend running in the first one).

```bash
cd front_end/
npm install
npx vite
```

***Vite will start the development server, usually on http://localhost:5173. Open this link in your browser to view the app.***

### Project Structure

```bash
├── frontend/
│   ├── ml_section/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── solver-backend/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

### Built With

*  Frontend: React, Vite, TensorFlow.js
*  Backend: Node.js, Express, Kociemba
*  Algorithms: Kociemba's Two-Phase Algorithm, CFOP pattern matching.