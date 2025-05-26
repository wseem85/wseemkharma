'use client';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef } from 'react';

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);
    if (!isMobile) {
      easing.dampE(groupRef.current.rotation, [
        state.pointer.y / 7,
        state.pointer.x / 5,
        0,
      ]);
    }
  });
  return (
    <group ref={groupRef} scale={0.5}>
      {children}
    </group>
  );
};
export default HeroCamera;
