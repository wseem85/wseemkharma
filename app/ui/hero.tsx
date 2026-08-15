'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { orbitron } from '../lib/fonts';
import ProjectDiscoveryWizard from '../components/project-discovery-wizard';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

const heroIcons = [
  { src: '/logos/react.svg', name: 'React' },
  { src: '/logos/nextjs.png', name: 'Next.js' },
  { src: '/logos/typescript.svg', name: 'TypeScript' },
  { src: '/logos/nodejs.svg', name: 'Node.js' },
  { src: '/logos/postgresql.svg', name: 'PostgreSQL' },
  { src: '/logos/mongodb.png', name: 'MongoDB' },
  { src: '/logos/git-icon-logo-svgrepo-com.svg', name: 'Git' },
  { src: '/logos/github-mark-white.png', name: 'GitHub' },
  { src: '/logos/photoshop1.png', name: 'Photoshop' },
  { src: '/logos/illustrator.png', name: 'Illustrator' },
  { src: '/logos/gimp.svg', name: 'GIMP' },
  { src: '/logos/it-support.png', name: 'IT Support' },
  { src: '/logos/linux1.png', name: 'Linux' },
  { src: '/logos/windows.png', name: 'Windows Server' },
];

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('hero');
  const headingWords = [t('design'), t('build'), t('ship')];

  return (
    <section className="relative top-[80px] flex min-h-[550px] w-full items-center overflow-hidden bg-[#101114]">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -left-1/4 top-[-20%] h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(220, 38, 38, 0.28) 0%, rgba(220, 38, 38, 0.08) 35%, transparent 72%)',
          }}
          animate={{
            x: ['0%', '115%', '0%'],
            y: ['0%', '18%', '0%'],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-[-25%] h-[560px] w-[560px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.24) 0%, rgba(37, 99, 235, 0.07) 38%, transparent 72%)',
          }}
          animate={{
            x: ['0%', '-115%', '0%'],
            y: ['0%', '-15%', '0%'],
            opacity: [0.6, 0.95, 0.6],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="flex max-w-4xl flex-col items-start gap-6 sm:gap-8">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-[2px] w-12 bg-red-ground sm:w-20" />
            <span className="h-[2px] w-5 bg-red-ground/60 sm:w-8" />
            <span className="h-[2px] w-2 bg-red-ground/40" />
          </div>

          <p
            className={`${!isArabic ? orbitron.className : ''} text-sm uppercase tracking-[0.18em] text-gray-300 sm:text-base`}
          >
            {t('role')}
          </p>

          <motion.h1
            className={`max-w-4xl font-black tracking-tight text-white ${
              isArabic
                ? 'text-4xl leading-[1.2] sm:text-6xl lg:text-7xl'
                : 'text-5xl leading-[0.95] sm:text-7xl lg:text-8xl'
            }`}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.16 } },
            }}
            aria-label={`${t('design')} ${t('build')} ${t('ship')}`}
          >
            {headingWords.map((word) => (
              <motion.span
                key={word}
                className="mr-3 inline-block bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent sm:mr-5"
                variants={{
                  // Keep the heading paintable for LCP; animate position instead of hiding it.
                  hidden: { opacity: 1, y: 24, filter: 'blur(0px)' },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <p className="max-w-2xl text-base leading-relaxed text-gray-300 sm:text-xl">{t('description')}</p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-red-ground px-7 py-3 font-semibold tracking-wide text-white transition-transform duration-200 hover:scale-105 hover:bg-red-groundlight active:scale-95"
            >
              {t('workTogether')}
            </button>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 bg-black/20 px-7 py-3 font-semibold tracking-wide text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/10 active:scale-95"
            >
              {t('seeWork')}
            </Link>
          </div>

          <div
            className="mt-2 flex max-w-full flex-wrap items-center gap-2 sm:gap-3"
            aria-label="Technologies and tools"
          >
            {heroIcons.map((icon, index) => (
              <motion.div
                key={icon.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 p-2 shadow-white-sm backdrop-blur-sm sm:h-11 sm:w-11"
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {
                        opacity: [0, 1, 1, 0],
                        y: [12, 0, 0, -12],
                        scale: [0.85, 1, 1, 0.85],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 5,
                        delay: index * 0.16,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                title={icon.name}
              >
                <Image
                  src={icon.src}
                  alt={icon.name}
                  width={24}
                  height={24}
                  loading="lazy"
                  sizes="24px"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {isWizardOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <ProjectDiscoveryWizard onClose={() => setIsWizardOpen(false)} />,
          document.body,
        )}
    </section>
  );
};

export default Hero;
