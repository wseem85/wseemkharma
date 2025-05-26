'use client';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef } from 'react';
import * as THREE from 'three';
interface HeroCameraProps {
  children: React.ReactNode;
  isMobile: boolean;
}
const HeroCamera = ({ children, isMobile }: HeroCameraProps) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);
    if (!isMobile && groupRef.current) {
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
