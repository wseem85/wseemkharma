'use client';

import { motion } from 'framer-motion';
import { experiences } from '../lib/placeholder-data';
import { textVariant } from '../utils/motion';
import { useTranslations } from 'next-intl';

interface Experience {
  id: string;
}

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const t = useTranslations('experience.items');
  const points = t.raw(`${experience.id}.points`) as string[];

  return (
    <motion.article
      className="group relative pl-12 sm:pl-20"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div
        className="absolute left-[13px] top-5 h-4 w-4 rounded-full border-4 border-[#1e1e1e] bg-teal-ground shadow-[0_0_0_4px_rgba(0,128,128,0.15)] transition-transform duration-300 group-hover:scale-125 sm:left-[17px]"
        aria-hidden="true"
      />

      <div className="rounded-2xl border border-white/10 bg-[#252526] p-5 shadow-lg shadow-black/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-teal-ground/50 group-hover:shadow-teal-ground/10 sm:p-7">
        <div className="mb-5 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-groundlight">
            {t(`${experience.id}.company`)}
          </p>
          <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
            {t(`${experience.id}.title`)}
          </h3>
          <motion.time
            className="mt-3 block text-sm font-medium tracking-wide text-gray-400 sm:text-base"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.08 + 0.2,
              ease: 'easeOut',
            }}
          >
            {t(`${experience.id}.date`)}
          </motion.time>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {points.map((point, pointIndex) => (
            <li
              key={`experience-point-${pointIndex}`}
              className="flex gap-3 text-sm leading-relaxed text-gray-300 sm:text-base"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-ground"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const Experiences = () => {
  const t = useTranslations('pages');
  return (
    <section
      className="relative top-[100px] mx-auto my-12 max-w-7xl px-4 sm:my-16 sm:px-6 lg:my-20 lg:px-8"
      id="experience"
    >
      <motion.div
        className="mb-10 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="mx-auto text-center">
          <h2 className="head-text">{t('experience')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            {t('experienceIntro')}
          </p>
        </div>
      </motion.div>

      <div className="relative space-y-6 sm:space-y-8">
        <div
          className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-teal-ground via-white/20 to-transparent sm:left-6"
          aria-hidden="true"
        />
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Experiences;
