'use client';
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-[326px] h-[326px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
});
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}
const GlobeWithArcs = () => {
  const [arcsData, setArcsData] = useState<ArcData[]>([]);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Generate random arc data
    const N = 20;
    const newArcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [
        ['#ff0000', '#ffffff', '#0000ff', '#00ff00'][
          Math.round(Math.random() * 3)
        ],
        ['#ff0000', '#ffffff', '#0000ff', '#00ff00'][
          Math.round(Math.random() * 3)
        ],
      ],
    }));
    setArcsData(newArcsData);
  }, []);

  return (
    <div ref={containerRef} className="flex h-[326px] w-[326px] items-center justify-center">
      {isNearViewport ? (
        <Globe
          width={326}
          height={326}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="/globe/earth-night.jpg"
          arcsData={arcsData}
          arcColor={'color'}
          arcStroke={1}
          arcDashLength={() => Math.random()}
          arcDashGap={() => Math.random()}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
          arcCurveResolution={32}
          arcAltitudeAutoScale={0.3}
          showAtmosphere={true}
          atmosphereColor="rgba(63, 201, 255, 0.3)"
          showGraticules={true}
        />
      ) : (
        <div className="h-12 w-12 animate-pulse rounded-full border border-blue-400/30" aria-hidden="true" />
      )}
    </div>
  );
};

export default GlobeWithArcs;
