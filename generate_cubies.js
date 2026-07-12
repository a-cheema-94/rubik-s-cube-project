import * as THREE from 'three'

export function generateCubies () {
  let count = 0

  // generate 3 x 3 x 3 cubies
  for (let x=-1; x<=1; x++) {
    for (let y=-1; y<=1; y++) {
      for (let z=-1; z<=1; z++) {
        count++
        // console.log(`Creating a cubie at position X: ${x}, Y: ${y}, Z: ${z}`)
        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95)
        const material = new THREE.MeshStandardMaterial({ color: "#444444" })
        const cubie = new THREE.Mesh(geometry, material);
        
        cubie.position.set(x, y, z)

        
        cubie.castShadow = true;
        cubie.receiveShadow = true;

        scene.add(cubie);

        // if side on inside: paint it dark grey
        // if side on outside: paint with one of the colors
        // add cubie to mesh on screen
      }
    }
    // console.log(x)
  }
  // console.log(`FINAL COUNT: ${count}`)
}

// generateCubies()