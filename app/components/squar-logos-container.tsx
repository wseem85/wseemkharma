import SquareLogo from './square-logo';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';
// import { useMediaQuery } from 'react-responsive';
const SquareLogosContainer = ({
  imgs,
  initialDelay = 4100,
}: {
  imgs: { id: number; src: string; name: string }[];
  initialDelay: number;
}) => {
  const [scope, animate] = useAnimate();
  const animationRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const runAnimation = async () => {
      await new Promise((resolve) => setTimeout(resolve, initialDelay));
      while (isMounted) {
        // Wave to the right
        await animate(
          '.logo',
          { x: 15 },
          { delay: stagger(0.1), duration: 0.2 }
        );

        // Wave back to the left
        await animate(
          '.logo',
          { x: -15 },
          { delay: stagger(0.1, { from: 'last' }), duration: 0.2 }
        );
        // Pause before next wave
        // Return to center
        await animate('.logo', { x: 0 }, { duration: 0.3 });
        await new Promise((resolve) => setTimeout(resolve, 4100));
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
      {imgs.map((item) => (
        <motion.div
          key={item.id}
          className="logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <SquareLogo src={item.src} name={item.name} />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default SquareLogosContainer;
