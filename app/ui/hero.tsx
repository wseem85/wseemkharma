'use client';
// import { comouterCanvas } from '@/app/components/canvas';
import ComputerModel from '@/public//canvas/computer_and_laptop/ComputerModel';

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
  const isMobileandLandscape = useMediaQuery({
    maxWidth: 768,
    orientation: 'landscape',
  });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1024,
  });
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  return (
    <section
      className={`min-h-[550px]  ${isMobile ? 'min-h-400px' : ''} ${isMobileandLandscape ? 'min-h-[500px]' : ''}h-fit w-full relative top-[90px] mx-auto overflow-hidden bg-hero-pattern bg-cover bg-no-repeat bg-center`}
    >
      {/* Main content container with improved responsive spacing */}
      <div
        className={`absolute ${isMobileandLandscape ? '' : ''} inset-0 pt-6  max-w-7xl mx-auto flex flex-row items-start gap-3 sm:gap-5 lg:gap-12 px-3 sm:px-6 lg:px-8`}
      >
        {/* Decorative side bars - improved visibility */}
        <div className="gap-2 sm:gap-3 xl:gap-5 flex-col justify-center items-center mt-3 sm:mt-4 lg:mt-5 hidden xs:flex">
          <div className="w-4 sm:w-6 lg:w-7 h-[2px] sm:h-[3px] bg-red-ground opacity-90"></div>
          <div className="w-3 sm:w-5 lg:w-6 h-[2px] sm:h-[3px] bg-red-ground opacity-80"></div>
          <div className="w-3 sm:w-4 lg:w-5 h-[2px] sm:h-[3px] bg-red-ground opacity-70"></div>
          <div className="w-2 sm:w-3 lg:w-4 h-[2px] sm:h-[3px] bg-red-ground opacity-60"></div>
          <div className="w-2 sm:w-3 lg:w-3 h-[2px] sm:h-[3px] bg-red-ground opacity-50"></div>
          <div className="w-1 sm:w-2 lg:w-2 h-[2px] sm:h-[3px] bg-red-ground opacity-40"></div>
          <div className="w-1 sm:w-1 lg:w-1 h-[2px] sm:h-[3px] bg-red-ground opacity-40"></div>
          <div className="w-[2px] sm:w-[3px] h-[2px] sm:h-[3px] bg-red-ground opacity-30 lg:hidden xl:block"></div>
          <div className="w-[1px] sm:w-[2px] h-[2px] sm:h-[3px] bg-red-ground opacity-20 lg:hidden xl:block"></div>
          <div className="w-[1px] h-[2px] sm:h-[3px] bg-red-ground opacity-10 lg:hidden xl:block"></div>
        </div>

        {/* Hero text content with better responsive typography */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 flex-1">
          <motion.h1
            className="hero_tag"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className="text-gray-300">Wseem</span>
          </motion.h1>

          <motion.p
            className={`${orbitron.className} antialiased tracking-wide text-sm sm:text-base lg:text-lg xl:text-xl text-white-600`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A Full Stack Developer | Computer Engineer
          </motion.p>

          <motion.p
  className="hero_sub_tag tracking-wide leading-relaxed"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  I transform <span className="px-2 py-1 text-white/95 bg-blue-800/50">your vision</span> into a powerful <span className="px-2 py-1 text-white/95 bg-blue-800/50">digital presence</span> that{' '}
  <br/>
	<span className="px-2 py-1 text-white/95 border-b-2 border-red-ground">engages users</span> and{' '}
  <span className="px-2 py-1 leading-5 text-white/95 border-b-2 border-red-ground">drives business growth</span>.
</motion.p>
        </div>

        {/* 3D Canvas with improved responsive positioning */}
        <div
          className={`absolute ${
            isSmall
              ? 'top-[130px] h-[300px] -right-10'
              : !isSmall && isMobile
                ? 'top-[100px] h-[380px] -right-16'
                : isMobile && isMobileandLandscape
                  ? 'top-[-30px] h-[600px]'
                  : isTablet
                    ? 'top-[120px] h-[400px] -right-20'
                    : 'top-[160px] h-[500px] -right-24'
          } inset-0 left-0 right-0 pointer-events-none`}
        >
          <Canvas>
            <Suspense fallback={<CanvasLoader />}>
              <HeroCamera isMobile={isMobile}>
                <ambientLight intensity={1} color={0xffffff} />
                <directionalLight intensity={1} position={[40, 0, 6.4]} />

                <ComputerModel
                  position={[-3.5, -6.5, 4.2]}
                  rotation={[3.4, -3.6, 3.1]}
                  scale={isSmall ? 0.56 : isMobile ? 0.58 : 0.6}
                />
              </HeroCamera>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};
export default Hero;
