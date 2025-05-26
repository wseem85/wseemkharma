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
      contentStyle={{ backgroundColor: '#252526', color: '#c4c4c4' }}
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
        left: '0', // Ensure left alignment
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full ">
          <img
            src={experience.icon.src}
            alt={experience.company_name}
            style={{
              width: '70%',
              height: '70%',
            }}
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white font-bold text-[24px] ">
          {experience.title}
        </h3>

        <p className="vertical-timeline-element-subtitle" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>
      <div className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li key={`experience-point-${index}`} className="pl-1 tracking-wider">
            {point}
          </li>
        ))}
      </div>
    </VerticalTimelineElement>
  );
};
const Experiences = () => {
  return (
    <section className="c-space my-20 px-4">
      <motion.div
        className="mb-4"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
      >
        <h1 className="head-text text-center mb-2">Work Experience</h1>
        <h3 className="head-sub_text text-center">
          {' '}
          12+ years IT veteran - I've seen it all!
        </h3>
      </motion.div>
      <motion.div
        className="flex flex-col"
        variants={sectionVariant()}
        initial="hidden"
        whileInView="show"
      >
        <VerticalTimeline
          lineColor="#c4c4c4"
          layout="1-column"
          className="vertical-timeline-custom-line"
        >
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </motion.div>
    </section>
  );
};
export default Experiences;
