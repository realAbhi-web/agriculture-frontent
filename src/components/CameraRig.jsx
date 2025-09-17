import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export default function CameraRig({ setTreeX }) {
  const scroll = useScroll();
  const targetPos = new THREE.Vector3();
  const lookAtPos = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const offset = scroll?.offset ?? 0;

    // Move tree and camera based on scroll
    if (offset < 0.33) {
      setTreeX(5); // tree right
      targetPos.set(5, 5, 10); // camera node 1
    } else if (offset < 0.66) {
      setTreeX(5); // tree center
      targetPos.set(0, 15, 10); // camera node 2
    } else {
      setTreeX(5); // tree left
      targetPos.set(-5, 5, 0); // camera node 3
    }

    // Smoothly move camera to target position
    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(lookAtPos);
  });

  return null;
}