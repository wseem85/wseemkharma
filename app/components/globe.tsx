'use client';
import Globe from 'react-globe.gl';
import { useState, useEffect } from 'react';
interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}
const GlobeWithArcs = () => {
  const [arcsData, setArcsData] = useState<ArcData[]>([]);

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
    <Globe
      width={326}
      height={326}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.jpg"
      // Arc layer properties
      arcsData={arcsData}
      arcColor={'color'} // uses the color property
      arcStroke={1} // line width
      arcDashLength={() => Math.random()} // random dash pattern
      arcDashGap={() => Math.random()} // random gap pattern
      arcDashAnimateTime={() => Math.random() * 4000 + 500} // animation duration
      arcCurveResolution={32} // smoothness of arcs
      arcAltitudeAutoScale={0.3} // scaling factor for arc altitude
      // Additional globe options
      showAtmosphere={true}
      atmosphereColor="rgba(63, 201, 255, 0.3)"
      showGraticules={true}
    />
  );
};

export default GlobeWithArcs;
