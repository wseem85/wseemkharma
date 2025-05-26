'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import Logo from './logo';

const LogosContainer = ({ imgs }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const runAnimation = async () => {
      while (true) {
        // Animate each logo sequentially
        await animate(
          '.logo',
          { scale: [1, 1.2, 1] },
          {
            duration: 0.6,
            delay: stagger(0.5),
            ease: 'easeInOut',
          }
        );

        // Pause before restarting the sequence
        await new Promise((resolve) => setTimeout(resolve, 1900));
      }
    };

    runAnimation();
  }, []);

  return (
    <motion.div
      className="flex gap-6 flex-wrap"
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {imgs.map(({ id, src, name }) => (
        <motion.div
          key={id}
          className="logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Logo src={src} name={name} />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default LogosContainer;
