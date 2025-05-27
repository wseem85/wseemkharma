'use client';
import { experiences } from '../lib/placeholder-data';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { fadeIn, sectionVariant, textVariant } from '../utils/motion';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

interface Experience {
  title: string;
  company_name: string;
  icon: {
    src: string;
  };
  iconBg: string;
  date: string;
  points: string[];
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        backgroundColor: '#252526',
        color: '#c4c4c4',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow: '0 0 0 4px #1d1836',
        border: '2px solid white',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon.src}
            alt={experience.company_name}
            className="w-[70%] h-[70%] object-contain"
          />
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-tight">
            {experience.title}
          </h3>
          <p className="text-gray-300 text-base sm:text-lg font-medium mt-1">
            {experience.company_name}
          </p>
        </div>

        <ul className="list-disc ml-5 space-y-2 sm:space-y-3">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-sm sm:text-base lg:text-lg text-gray-200 pl-1 tracking-wide leading-relaxed"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

const Experiences = () => {
  return (
    <section className="c-space my-12 sm:my-16 lg:my-20 px-2 sm:px-4">
      {/* Improved responsive header */}
      <motion.div
        className="mb-6 sm:mb-8 lg:mb-12"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
      >
        <h1 className="head-text text-center mb-2 sm:mb-4">Work Experience</h1>
        <h3 className="head-sub_text text-center px-4">
          12+ years IT veteran - I've seen it all!
        </h3>
      </motion.div>

      {/* Timeline with improved responsive design */}
      <motion.div
        className="flex flex-col"
        variants={sectionVariant()}
        initial="hidden"
        whileInView="show"
      >
        <div className="relative">
          <VerticalTimeline
            lineColor="#c4c4c4"
            layout="1-column"
            className="vertical-timeline-custom-line"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </VerticalTimeline>
        </div>
      </motion.div>
    </section>
  );
};

export default Experiences;
