import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export function TypingAnimation({ text, start = false, onComplete }) {
  const [visibleText, setVisibleText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const animationRef = useRef({
    completed: false,
    interval: null,
    currentIndex: 0,
  });

  // Reset when start becomes true
  useEffect(() => {
    if (start) {
      setVisibleText('');
      setShowCursor(false);
      animationRef.current.completed = false;
      animationRef.current.currentIndex = 0;
    }
  }, [start]);

  // Typing effect
  useEffect(() => {
    if (!start || animationRef.current.completed) return;

    animationRef.current.interval = setInterval(() => {
      if (animationRef.current.currentIndex <= text.length) {
        setVisibleText(text.slice(0, animationRef.current.currentIndex));
        animationRef.current.currentIndex++;
      } else {
        clearInterval(animationRef.current.interval);
        animationRef.current.completed = true;
        setShowCursor(false);
        onComplete?.();
      }
    }, 50);

    return () => {
      if (animationRef.current.interval) {
        clearInterval(animationRef.current.interval);
      }
    };
  }, [text, start, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!start || animationRef.current.completed) return;

    setShowCursor(true);
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [start]);

  return (
    <motion.p className="grid-subtext" style={{ position: 'relative' }}>
      {visibleText}
      {showCursor && (
        <motion.span
          style={{
            position: 'absolute',
            width: '0.5em',
            height: '1em',
            backgroundColor: 'currentColor',
          }}
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      )}
    </motion.p>
  );
}
