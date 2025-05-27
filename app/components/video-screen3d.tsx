// components/VideoScreen3D.tsx
'use client';
import { useRef, useEffect, useState } from 'react';

const VideoScreen3D = ({ defaultVideo }: { defaultVideo: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.error('Video play error:', err));
    }
  }, [defaultVideo]);

  return (
    <div className="w-full h-64 xs:h-72 sm:h-80 md:h-96 lg:my-auto flex justify-center items-center bg-transparent">
      <video
        ref={videoRef}
        src={defaultVideo}
        className="max-w-full max-h-full object-contain"
        loop
        muted
        playsInline
        autoPlay
      />
    </div>
  );
};

export { VideoScreen3D };
