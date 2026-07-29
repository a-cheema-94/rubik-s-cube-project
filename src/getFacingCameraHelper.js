import * as THREE from 'three';

// Returns which logical face ('F', 'R', 'B', 'L') is currently facing the camera
export function getFaceFacingCamera(camera) {
  // Vector pointing from cube origin toward the camera
  const cameraDir = new THREE.Vector3();
  camera.getWorldDirection(cameraDir);
  const toCamera = cameraDir.negate();

  // Standard world face normals
  const faceNormals = {
    "F": new THREE.Vector3(0, 0, 1),   // +Z
    "R": new THREE.Vector3(1, 0, 0),   // +X
    "B": new THREE.Vector3(0, 0, -1),  // -Z
    "L": new THREE.Vector3(-1, 0, 0)   // -X
  };

  let maxDot = -Infinity;
  let facingFace = "F";

  for (const [face, normal] of Object.entries(faceNormals)) {
    const dot = normal.dot(toCamera);
    if (dot > maxDot) {
      maxDot = dot;
      facingFace = face;
    }
  }

  // get the highest dot product and then return face associated with it.

  return facingFace;
}