// components/canvas/logo-cube.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
// Fix the import to use the correct path for Three.js
import * as THREE from 'three';

interface LogoCubeProps {
  logoPath: string;
  logoName: string;
  position?: [number, number, number];
  scale?: number;
}

const LogoCube: React.FC<LogoCubeProps> = ({
  logoPath,
  logoName,
  position = [0, 0, 0],
  scale = 1.5,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Load texture using Three.js TextureLoader through useLoader
  const texture = useLoader(THREE.TextureLoader, logoPath);

  // Set initial rotation to make sure front face is showing at start
  useEffect(() => {
    if (meshRef.current) {
      // Start with a slight rotation so it doesn't look too flat
      meshRef.current.rotation.y = Math.PI * 0.05;
      meshRef.current.rotation.x = Math.PI * 0.05;
    }
  }, []);

  // Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow rotation when not hovered
      if (!hovered) {
        // Rotate only around y-axis to prevent logo appearing upside down
        meshRef.current.rotation.y += delta * 0.3;

        // Very slight tilt on x-axis to give dimension but not enough to turn upside down
        // The sin function will oscillate between -0.1 and 0.1 radians (about 5 degrees)
        meshRef.current.rotation.x =
          Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      } else {
        // When hovered, only rotate around y-axis to keep logo readable
        meshRef.current.rotation.y += delta * 1.2;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={active ? scale * 1.2 : scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.3}
        roughness={0.4}
        emissive={
          hovered ? new THREE.Color(0x666666) : new THREE.Color(0x000000)
        }
      />
    </mesh>
  );
};

export default LogoCube;
