// import Globe from 'react-globe.gl';
'use client';
import Button from '@/app/components/button';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import SquareLogosContainer from '../components/squar-logos-container';
import GlobeWithArcs from '../components/globe';
import LogosContainer from '../components/logos-container';

import BarsSeperator from '../components/animated-seperator';
import { textVariant } from '../utils/motion';

import AboutMe from '../components/about-me';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const handleCopy = () => {
    navigator.clipboard.writeText('engwseem2@gmail.com');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // First animation runs for 5 seconds
        setAnimationPhase(0);
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Second animation runs for 3 seconds
        setAnimationPhase(1);
        await new Promise((resolve) => setTimeout(resolve, 4500));
      }
    };

    sequence();

    return () => {
      // Cleanup if needed
    };
  }, []);
  return (
    <section className="c-space my-20" id="about">
      <motion.div
        className="mb-8"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
      >
        <h1 className="head-text text-center mb-2">About Me</h1>
        <h3 className="head-sub_text text-center">
          {' '}
          12+ years IT veteran - I've seen it all!
        </h3>
      </motion.div>
      <div
        className="grid  
  xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 
  gap-5 h-full
  auto-rows-min "
      >
        <div className="xl:row-span-2 lg:row-span-1 row-span-1 min-h-[420px]">
          <div className="grid-container">
            <AboutMe />
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-3 lg:row-span-3 row-span-1">
          <div className="grid-container">
            <p className="grid-headtext">Tech Stack</p>
            <p className="grid-subtext">
              I specialized in Web development , with a focus on React , Next.js
              , Node.js , Mongo , Postgres
            </p>
            <LogosContainer
              imgs={[
                { id: 1, src: '/logos/nextjs.png', name: 'nextjs' },
                { id: 2, src: '/logos/tailwindcss.svg', name: 'Tailwindcss' },
                { id: 3, src: '/logos/react.svg', name: 'react' },
                { id: 8, src: '/logos/postgresql.svg', name: 'postgresql' },
                { id: 4, src: '/logos/typescript.svg', name: 'typescript' },
                { id: 5, src: '/logos/javascript.svg', name: 'javascript' },
                { id: 6, src: '/logos/threejs.svg', name: 'threejs' },
                { id: 7, src: '/logos/nodejs.svg', name: 'nodejs' },
              ]}
            />

            <div>
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext">
                Front to back, code to deployment—I own the entire process. Your
                idea becomes a fast, scalable, and polished app with no gaps.
                Let’s skip the fragmented workflows and build something that
                truly delivers.
              </p>
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext">
                Your website should look flawless on any device—whether it’s a
                4K monitor or a budget smartphone. I rigorously test across
                browsers and screen sizes so your audience gets a consistent,
                frustration-free experience everywhere.
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-3 lg:row-span-3 row-span-1">
          <div className="grid-container">
            <p className="grid-headtext">Creative & Technical Toolkit</p>
            <p className="grid-subtext">
              I bridge development and design using Photoshop, Illustrator and
              GIMP to create pixel-perfect assets, intuitive UI elements.
            </p>
            <SquareLogosContainer
              initialDelay={0}
              imgs={[
                {
                  id: 1,
                  src: '/logos/git-icon-logo-svgrepo-com.svg',
                  name: 'git',
                },
                { id: 2, src: '/logos/github-mark-white.png', name: 'github' },
                { id: 3, src: '/logos/photoshop1.png', name: 'photoshop' },
                { id: 4, src: '/logos/illustrator.png', name: 'illustrator' },
                { id: 5, src: '/logos/gimp.svg', name: 'gimp' },
                { id: 6, src: '/logos/linux1.png', name: 'linux' },
                { id: 7, src: '/logos/windows.png', name: 'server' },
              ]}
            />

            <div>
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext">
                I specialize in configuring and maintaining Windows Server
                environments for optimal enterprise performance. From Active
                Directory management to Group Policy implementation, I ensure
                secure user access controls and seamless network operations. .
              </p>
            </div>
          </div>
        </div>
        <div className="xl:row-span-2 lg:col-span-1 lg:row-span-2 row-span-1 ">
          <div className="grid-container">
            <div className="roundex-3xl w-full sm:h-[326px] h-full justify-center items-center">
              <GlobeWithArcs />
            </div>
            <div>
              <p className="grid-headtext">
                ☀️🌙 My workday spans sunrise to sunset across continents. Based
                in Syria, available worldwide.
              </p>
              <p className="grid-subtext">
                Your timezone is my workzone - offering seamless remote
                collaboration to anywhere.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-1">
          <div className="grid-container">
            <img
              src="/contactme.png"
              alt="grid-4"
              className="w-full h-fit object-cover sm:object-top"
            />
            <div className="space-y-2 ">
              <p className="grid-subtext text-center">Shoot me an email</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? '/tick.svg' : '/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  engwseem2@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
