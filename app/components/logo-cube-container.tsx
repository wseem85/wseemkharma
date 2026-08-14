// components/logo-cube-container.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LogoCube from './canvas/logo-cube';
import SmallCanvasLoader from './canvas/small-canvas-loader';

interface LogoTag {
  id: number;
  name: string;
  path: string;
}

interface LogoCubesContainerProps {
  tags: LogoTag[];
}

const LogoCubesContainer: React.FC<LogoCubesContainerProps> = ({ tags }) => {
  const spacing = 2.2;

  return (
    <div className="flex h-16 w-full min-w-0 justify-start sm:h-[4.5rem]">
      <div
        className="h-16 shrink-0 sm:h-[4.5rem]"
        style={{ width: `${Math.max(tags.length * 48, 48)}px` }}
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 28 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: 'low-power' }}
        >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[0, 0, 3]}
          intensity={1.0}
          color="#ffffff"
        />
        <directionalLight
          position={[0, 3, 0]}
          intensity={0.4}
          color="#f0f0ff"
        />

        <Suspense fallback={<SmallCanvasLoader />}>
          {tags.map((tag, index) => (
            <LogoCube
              key={`${tag.id}-${tag.name}`}
              logoPath={tag.path}
              logoName={tag.name}
              position={[
                (index - (tags.length - 1) / 2) * spacing,
                0,
                0,
              ]}
              scale={1.2}
            />
          ))}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default LogoCubesContainer;
