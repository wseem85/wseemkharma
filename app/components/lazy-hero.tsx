'use client';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';

const Hero = lazy(() => import('../ui/hero'));

const HeroSkeleton = () => (
  <div className="min-h-[550px] w-full relative top-[90px] mx-auto overflow-hidden bg-hero-pattern bg-cover bg-no-repeat bg-center">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-pulse text-white text-lg">
        Loading 3D Model...
      </div>
    </div>
  </div>
);

const LazyHero = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debug: Log when component mounts
    console.log('LazyHero mounted');

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(
          'Intersection observed:',
          entry.isIntersecting,
          entry.intersectionRatio
        );
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          console.log('Hero should load now');
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: '200px', // Increased margin for earlier loading
        threshold: 0.1, // Trigger when 10% is visible
      }
    );

    // Fallback timer - load after 2 seconds if intersection doesn't work
    const fallbackTimer = setTimeout(() => {
    
      setShouldLoad(true);
    }, 2000);

    if (ref.current) {
    
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);



  return (
    <div ref={ref} className="min-h-[550px]">
      {shouldLoad ? (
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
      ) : (
        <HeroSkeleton />
      )}
    </div>
  );
};

export default LazyHero;
