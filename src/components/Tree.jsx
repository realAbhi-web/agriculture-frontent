import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function Tree({ url,x=0 }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={2}
      position={[x, -2, 0]}
    />
  );
}

useGLTF.preload("/whispering_elm_tree.glb");
