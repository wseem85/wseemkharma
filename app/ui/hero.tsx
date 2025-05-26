'use client';
// import { comouterCanvas } from '@/app/components/canvas';
import ComputerModel from '@/public//canvas/computer_and_laptop/ComputerModel';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import HeroCamera from '../components/HeroCamera';
import { Leva, useControls } from 'leva';
import { useMediaQuery } from 'react-responsive';
import { orbitron } from '@/app/lib/fonts';
import { Suspense } from 'react';
import CanvasLoader from '../components/canvas/canvas-loader';
import Button from '../components/button';
const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  // const controls = useControls('HackerRoom', {
  //   // Two separate arguments
  //   positionX: {
  //     value: -3.5,
  //     min: -10,
  //     max: 40,
  //   },
  //   positionY: {
  //     value: -7.5,
  //     min: -7.5,
  //     max: 40,
  //   },
  //   positionZ: {
  //     value: 4.2,
  //     min: 0,
  //     max: 20,
  //   },
  //   scale: {
  //     value: 0.7,
  //     min: 0.01,
  //     max: 10,
  //   },

  //   rotationX: {
  //     value: 3.4,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationY: {
  //     value: -3.6,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationZ: {
  //     value: 3.1,
  //     min: -10,
  //     max: 10,
  //   },
  //   intensity: {
  //     value: 0.5,
  //     min: 0,
  //     max: 1,
  //   },

  //   angle: {
  //     value: 0.5,
  //     min: 0,
  //     max: 1,
  //   },

  //   penumbra: {
  //     value: 0.5,
  //     min: 0,
  //     max: 1,
  //   },
  // });

  return (
    <section className="h-screen w-full relative mx-auto">
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 lg:gap-12 px-6">
        <div className=" gap-3 xl:gap-5 flex-col justify-center items-center mt-4 sm:mt-5  hidden xs:flex">
          <div className="w-7 h-[3px] bg-red-ground opacity-90 "></div>
          <div className="w-6 h-[3px] bg-red-ground opacity-80 "></div>
          <div className="w-5 h-[3px] bg-red-ground opacity-70"></div>
          <div className="w-4 h-[3px] bg-red-ground opacity-60"></div>
          <div className="w-3 h-[3px] bg-red-ground opacity-50"></div>
          <div className="w-2 h-[3px] bg-red-ground opacity-40"></div>
          <div className="w-1 h-[3px] bg-red-ground opacity-40"></div>
          <div className="w-[3px] h-[3px] bg-red-ground opacity-30 lg:hidden xl:block"></div>
          <div className="w-[2px] h-[3px] bg-red-ground opacity-20 lg:hidden xl:block"></div>
          <div className="w-[1px] h-[3px] bg-red-ground opacity-10 lg:hidden xl:block"></div>
        </div>
        <div className="space-y-2">
          <h1 className="hero_tag">
            Hi, I'm <span className="text-gray-300">Wseem </span>
          </h1>
          <p className={`${orbitron.className} antialiased tracking-wide`}>
            A Computer Engineer | Full Stack Developer
          </p>
          <p className="hero_sub_tag tracking-wide">
            I build <span className="text-red-ground">fast, scalable,</span> and{' '}
            <span className="text-red-ground">user-friendly</span> web
            applications with clean code and modern tech.
          </p>
        </div>
        <div
          className={`absolute ${
            isSmall
              ? 'top-[180px] h-[350px]'
              : isMobile
              ? 'top-[120px] h-[400px]'
              : isTablet
              ? 'top-[150px] h-[420px]'
              : 'top-[200px] h-[440px]'
          } inset-0 left-0 right-0`}
        >
          <Canvas>
            <Suspense fallback={<CanvasLoader />}>
              <HeroCamera isMobile={isMobile}>
                {/* <PerspectiveCamera
                makeDefault
                position={[0, 15, 50]} // Higher Y position
                fov={60} // Wider field of view
                near={1} // Closer near plane
                far={1000} // Distant far plane
                rotation={[-0.2, 0, 0]}
              /> */}
                <ambientLight intensity={1} color={0xffffff} />
                <directionalLight
                  intensity={1}
                  // position={[
                  //   controls.positionX,
                  //   controls.positionY,
                  //   controls.positionZ,
                  // ]}
                  position={[40, 0, 6.4]}
                />

                <ComputerModel
                  position={[-3.5, -7.5, 4.2]}
                  rotation={[3.4, -3.6, 3.1]}
                  scale={isSmall ? 0.5 : isMobile ? 0.6 : isTablet ? 0.7 : 0.72}
                  // position={[
                  //   controls.positionX,
                  //   controls.positionY,
                  //   controls.positionZ,
                  // ]}
                  // rotation={[
                  //   controls.rotationX,
                  //   controls.rotationY,
                  //   controls.rotationZ,
                  // ]}
                  // scale={controls.scale}
                />

                {/* Controls for user interaction */}
                {/* <OrbitControls
                // enableZoom={true}
                enablePan={true}
                enableRotate={true}
                target={[0, 10, 0]}
                minDistance={10}
                maxDistance={50}
                minPolarAngle={0} // 30 degrees minimum (can't look straight down)
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 4} // -45 degrees (left limit)
                maxAzimuthAngle={Math.PI / 4}
              /> */}
              </HeroCamera>
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div
        className={`absolute w-full ${
          isSmall
            ? 'bottom-4'
            : isMobile
            ? 'bottom-8'
            : isTablet
            ? 'bottom-8'
            : 'bottom-4'
        } left-0 right-0 a-10 c-space`}
      >
        <a href="#about" className="w-fit">
          <Button
            name="More About Me"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};
export default Hero;
