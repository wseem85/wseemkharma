// components/canvas/logo-cube.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
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

  const texture = useLoader(THREE.TextureLoader, logoPath);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI * 0.05;
      meshRef.current.rotation.x = Math.PI * 0.05;
    }
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!hovered) {
        meshRef.current.rotation.y += delta * 0.3;
        meshRef.current.rotation.x =
          Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      } else {
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
