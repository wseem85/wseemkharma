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
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const handleCopy = () => {
    navigator.clipboard.writeText('engwseem2@gmail.com');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setAnimationPhase(0);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setAnimationPhase(1);
        await new Promise((resolve) => setTimeout(resolve, 4500));
      }
    };
    sequence();
    return () => {};
  }, []);

  return (
    <section
      className={`c-space my-12 sm:my-16 lg:my-20 relative top-[100px]`}
      id="about"
    >
      {/* Section header with improved responsive typography */}
      <motion.div
        className="mb-6 sm:mb-8 lg:mb-12"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
      >
        <h1 className="head-text text-center mb-2 sm:mb-4">About Me</h1>
        <h3 className="head-sub_text text-center px-4">
          Full-Stack Engineer & IT Solutions Architect
        </h3>
      </motion.div>

      {/* Improved responsive grid layout */}
      {/* Improved responsive grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
        {/* About Me Card - Full width on mobile, spans appropriately on larger screens */}
        <motion.div
          className="lg:col-span-1 xl:col-span-2 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid-container h-full">
            <AboutMe />
          </div>
        </motion.div>

        {/* Tech Stack Card - Responsive column spanning */}
        <motion.div
          className="lg:col-span-1 xl:col-span-2 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid-container h-full">
            <p className="grid-headtext text-lg sm:text-xl">Tech Stack</p>
            <p className="grid-subtext text-sm sm:text-base">
              I specialized in Web development, with a focus on React, Next.js,
              Node.js, Mongo, Postgres
            </p>

            <div className="flex-1">
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
            </div>

            <div className="space-y-4">
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                Front to back, code to deployment—I own the entire process. Your
                idea becomes a fast, scalable, and polished app with no gaps.
                Let's skip the fragmented workflows and build something that
                truly delivers.
              </p>
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                Your website should look flawless on any device—whether it's a
                4K monitor or a budget smartphone. I rigorously test across
                browsers and screen sizes so your audience gets a consistent,
                frustration-free experience everywhere.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Creative Toolkit Card */}
        <motion.div
          className="lg:col-span-1 xl:col-span-2 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid-container h-full">
            <p className="grid-headtext text-lg sm:text-xl">
              Creative & Technical Toolkit
            </p>
            <p className="grid-subtext text-sm sm:text-base">
              I bridge development and design using Photoshop, Illustrator and
              GIMP to create pixel-perfect assets, intuitive UI elements.
            </p>

            <div className="">
              <SquareLogosContainer
                initialDelay={4100}
                imgs={[
                  {
                    id: 1,
                    src: '/logos/git-icon-logo-svgrepo-com.svg',
                    name: 'git',
                  },
                  {
                    id: 2,
                    src: '/logos/github-mark-white.png',
                    name: 'github',
                  },
                  { id: 3, src: '/logos/photoshop1.png', name: 'photoshop' },
                  { id: 4, src: '/logos/illustrator.png', name: 'illustrator' },
                  { id: 5, src: '/logos/gimp.svg', name: 'gimp' },
                  { id: 8, src: '/logos/it-support.png', name: 'it support' },
                  { id: 6, src: '/logos/linux1.png', name: 'linux' },
                  { id: 7, src: '/logos/windows.png', name: 'server' },
                ]}
              />
            </div>

            <div className="space-y-4">
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                I specialize in configuring and maintaining Windows Server
                environments for optimal enterprise performance. From Active
                Directory management to Group Policy implementation, I ensure
                secure user access controls and seamless network operations.
              </p>
              <BarsSeperator color="bg-red-ground" />
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                Experienced in troubleshooting hardware, software, and network
                issues with strong knowledge of Windows, macOS, and Linux
                systems. Skilled in remote support, ticketing systems, and
                providing efficient technical solutions to end-users.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Globe/Location Card - Responsive positioning */}
        <motion.div
          className=" xl:col-span-3 xl:row-span-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid-container h-full">
            <div className="rounded-3xl w-full flex-1 flex justify-center items-center">
              <GlobeWithArcs />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <p className="grid-headtext text-base sm:text-lg leading-relaxed">
                ☀️🌙 My workday spans sunrise to sunset across continents. Based
                in Syria, available worldwide.
              </p>
              <p className="grid-subtext text-sm sm:text-base">
                Your timezone is my workzone - offering seamless remote
                collaboration to anywhere.
              </p>
              <Link href="/contact">
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass="w-full mt-4 sm:mt-6 lg:mt-8"
                />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Email Contact Card */}
        <motion.div
          className="lg:col-span-2 xl:col-span-3 xl:row-span-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid-container h-full">
            <img
              src="/contactme.png"
              alt="Contact illustration"
              className="w-full flex-1 h-auto max-h-[120px] sm:max-h-[200px] xl:max-h-[300px] object-cover sm:object-top mx-auto"
            />
            <div className="space-y-3 sm:space-y-4">
              <p className="grid-subtext text-center text-sm sm:text-base">
                Shoot me an email
              </p>
              <div
                className="copy-container cursor-pointer hover:bg-black-300 p-2 sm:p-3 rounded-lg transition-colors"
                onClick={handleCopy}
              >
                <img
                  src={hasCopied ? '/tick.svg' : '/copy.svg'}
                  alt="copy"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-gray_gradient text-white break-all">
                  engwseem2@gmail.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
