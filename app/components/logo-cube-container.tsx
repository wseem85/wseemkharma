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
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {tags.map((tag, index) => (
        <div
          key={tag.id || index}
          className=" !w-16 !h-16 "
          style={{ width: '60px', height: '60px', minWidth: '60px' }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
            {/* Reduced ambient light so directional lighting is more noticeable */}
            <ambientLight intensity={0.7} />

            {/* Main front light - directly from camera/user position */}
            <directionalLight
              position={[0, 0, 3]}
              intensity={1.0}
              color="#ffffff"
            />

            {/* Subtle top light for dimension */}
            <directionalLight
              position={[0, 3, 0]}
              intensity={0.4}
              color="#f0f0ff"
            />

            <Suspense fallback={<SmallCanvasLoader />}>
              <LogoCube
                logoPath={tag.path}
                logoName={tag.name}
                position={[0, 0, 0]}
                scale={1.2}
              />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Suspense>
          </Canvas>
        </div>
      ))}
    </div>
  );
};

export default LogoCubesContainer;
