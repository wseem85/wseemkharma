'use client';
import Button from '../components/button';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlobeWithArcs from '../components/globe';
import BarsSeperator from '../components/animated-seperator';
import { textVariant } from '../utils/motion';
import AboutMe from '../components/about-me';
import { useMediaQuery } from 'react-responsive';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('pages');
  const aboutT = useTranslations('about');
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
      className={`c-space my-12 sm:my-16 lg:my-20 relative top-[100px] max-w-7xl mx-auto`}
      id="about"
    >
      {/* Section header with improved responsive typography */}
      <motion.div
        className="mb-6 sm:mb-8 lg:mb-12"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
      >
        <h1 className="head-text text-center mb-2 sm:mb-4">{t('about')}</h1>
        <h3 className="head-sub_text text-center px-4">{t('engineer')}</h3>
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

        {/* Tech Stack Card */}
        <motion.div
          className="lg:col-span-1 xl:col-span-2 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid-container">
            <p className="grid-headtext text-lg sm:text-xl">
              {aboutT('techStack')}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  key: 'frontend',
                  technologies: ['react', 'nextjs', 'typescript', 'javascript'],
                },
                { key: 'backend', technologies: ['nodejs', 'restApis'] },
                { key: 'database', technologies: ['postgresql', 'mongodb'] },
                {
                  key: 'infrastructure',
                  technologies: ['docker', 'githubActions'],
                },
                {
                  key: 'integrations',
                  technologies: [
                    'stripe',
                    'paypal',
                    'openai',
                    'gemini',
                    'grok',
                    'restWebhooks',
                  ],
                },
              ].map(({ key, technologies }) => (
                <div
                  key={key}
                  className="rounded-lg border border-black-300 bg-black-200/50 p-3"
                >
                  <p className="mb-2 text-sm font-semibold text-teal-groundlight">
                    {aboutT(`techCategories.${key}`)}
                  </p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {technologies.map((technology) => (
                      <li key={technology} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-ground" />
                        {aboutT(`technologies.${technology}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security and Deployment Column */}
        <motion.div
          className="lg:col-span-1 xl:col-span-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid-container h-full space-y-8">
            <section>
              <p className="grid-headtext text-lg sm:text-xl">
                {aboutT('security')}
              </p>
              <p className="grid-subtext mt-4 text-sm leading-relaxed sm:text-base">
                {aboutT('securityText')}
              </p>
            </section>

            <section>
              <p className="grid-headtext text-lg sm:text-xl">
                {aboutT('deployment')}
              </p>
              <p className="grid-subtext mt-4 text-sm leading-relaxed sm:text-base">
                {aboutT('deploymentText')}
              </p>
            </section>
          </div>
        </motion.div>

        {/* Creative Toolkit Card */}
        <motion.div
          className="lg:col-span-1 xl:col-span-3 "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid-container h-full">
            <p className="grid-headtext text-lg sm:text-xl">
              {aboutT('creativeToolkit')}
            </p>
            <p className="grid-subtext text-sm sm:text-base">
              {aboutT('creativeText')}
            </p>

            <div className="space-y-4">
              <BarsSeperator color="bg-teal-ground" />
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                {aboutT('windowsServerText')}
              </p>
              <BarsSeperator color="bg-teal-ground" />
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                {aboutT('supportText')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Globe/Location Card - Responsive positioning */}
        <motion.div
          className="xl:col-span-3"
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
                {aboutT('locationHeadline')}
              </p>
              <p className="grid-subtext text-sm sm:text-base">
                {aboutT('locationDescription')}
              </p>
              <Link href="/services">
                <Button
                  name={aboutT('contactButton')}
                  isBeam
                  containerClass="px-5 py-2.5 sm:px-6 sm:py-3 inine-block mt-6
                  bg-gradient-to-r from-teal-ground to-teal-groundlight
                  text-white font-medium
                  rounded-lg
                  transition-all duration-300
                  hover:from-teal-groundlight hover:to-teal-ground
                  hover:shadow-lg hover:shadow-teal-ground/30
                  active:scale-[0.98]
                  inline-flex items-center gap-2
                  w-full sm:w-auto justify-center sm:justify-start"
                />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Email Contact Card */}
        {/* <motion.div
          className="lg:col-span-2 xl:col-span-3"
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
        </motion.div> */}
      </div>
    </section>
  );
};

export default About;
