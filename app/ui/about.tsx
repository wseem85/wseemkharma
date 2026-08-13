'use client';
import Button from '../components/button';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlobeWithArcs from '../components/globe';
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
        <h1 className="head-text text-center mb-2 sm:mb-4">About Me</h1>
        <h3 className="head-sub_text text-center px-4">Full-Stack Engineer</h3>
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
            <p className="grid-headtext text-lg sm:text-xl">Tech Stack</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['Frontend', 'React', 'Next.js', 'TypeScript', 'JavaScript'],
                ['Backend', 'Node.js', 'REST APIs'],
                ['Database', 'PostgreSQL', 'MongoDB'],
                ['Infrastructure', 'Docker', 'GitHub Actions'],
                [
                  'Integrations & APIs',
                  'Stripe',
                  'PayPal',
                  'OpenAI',
                  'Gemini',
                  'Grok',
                  'REST/Webhook integrations',
                ],
              ].map(([category, ...technologies]) => (
                <div
                  key={category}
                  className="rounded-lg border border-black-300 bg-black-200/50 p-3"
                >
                  <p className="mb-2 text-sm font-semibold text-red-groundlight">
                    {category}
                  </p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {technologies.map((technology) => (
                      <li key={technology} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-ground" />
                        {technology}
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
                Security &amp; Best Practices
              </p>
              <p className="grid-subtext mt-4 text-sm leading-relaxed sm:text-base">
                I build with security as a first-class concern, not an
                afterthought. My work follows OWASP Top 10 principles across the
                stack — secure authentication and session handling (JWT
                lifecycle and revocation), CSRF protection, secure HTTP headers,
                strict input validation and file-upload hardening, and careful
                secrets management. I use tools like Burp Suite to test for
                vulnerabilities before they ship, not after.
              </p>
            </section>

            <section>
              <p className="grid-headtext text-lg sm:text-xl">
                Deployment &amp; DevOps
              </p>
              <p className="grid-subtext mt-4 text-sm leading-relaxed sm:text-base">
                I don&apos;t hand off a project at &apos;it works on my
                machine.&apos; I containerize applications with Docker, automate
                testing and deployment through GitHub Actions CI/CD pipelines,
                and deploy to production cloud infrastructure. Once it&apos;s
                live, the work isn&apos;t done — I monitor, maintain, and
                iterate, so the systems I build stay reliable long after launch.
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
              Creative & Technical Toolkit
            </p>
            <p className="grid-subtext text-sm sm:text-base">
              I bridge development and design using Photoshop, Illustrator and
              GIMP to create pixel-perfect assets, intuitive UI elements.
            </p>

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
                  containerClass="px-5 py-2.5 sm:px-6 sm:py-3
                  bg-gradient-to-r from-red-ground to-red-groundlight
                  text-white font-medium
                  rounded-lg
                  transition-all duration-300
                  hover:from-red-groundlight hover:to-red-ground
                  hover:shadow-lg hover:shadow-red-ground/30
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
