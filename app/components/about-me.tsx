import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const overview =
  'A Computer Engineer, With 12 years of Experience, in Many IT related fields such as web development, graphic design, windows network administration, IT support, and many more.';
const education =
  'B.A Computers & Automatic Control Engineering | Tishreen University | 2003 - 2008.';

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  delay?: number;
}

const TypewriterText = ({
  text,
  onComplete,
  delay = 0,
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex === text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, 50); // Typing speed

    return () => clearTimeout(timeout);
  }, [currentIndex, text, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (isComplete) {
      setShowCursor(false);
      return;
    }

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <motion.div className="grid-subtext">
        {displayText.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
        {showCursor && !isComplete && (
          <motion.span
            className="inline-block w-0.5 h-[1.1em] bg-current align-middle translate-y-[1px] ml-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 'name',
      content: 'I am Wseem Kharma',
      type: 'heading',
    },
    {
      id: 'overview',
      content: overview,
      type: 'typing',
    },
    {
      id: 'education-title',
      content: 'Education',
      type: 'heading',
    },
    {
      id: 'education',
      content: education,
      type: 'typing',
    },
  ];

  const handleSectionComplete = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection((prev) => prev + 1);
    }
  };

  return (
    <>
      <motion.div
        className=""
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <Image
          src="/myavatar.png"
          alt="avatar"
          width={150}
          height={150}
          className="border border-gray-200 rounded-lg shadow-white-sm hover:shadow-white-lg transition-shadow duration-300"
          priority
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <div className="space-y-4">
          {sections.map((section, index) => {
            if (index > activeSection) return null;

            if (section.type === 'heading') {
              return (
                <motion.h2
                  key={section.id}
                  className="grid-headtext"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onAnimationComplete={() => {
                    if (index === activeSection) {
                      handleSectionComplete();
                    }
                  }}
                >
                  {section.content}
                </motion.h2>
              );
            }

            return (
              <TypewriterText
                key={section.id}
                text={section.content}
                onComplete={() => {
                  if (index === activeSection) {
                    handleSectionComplete();
                  }
                }}
                delay={0.3}
              />
            );
          })}
        </div>
      </AnimatePresence>
    </>
  );
};

export default AboutMe;
