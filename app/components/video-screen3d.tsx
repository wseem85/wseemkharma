// components/VideoScreen3D.tsx
'use client';
import { useRef, useEffect } from 'react';

const VideoScreen3D = ({ defaultVideo }: { defaultVideo: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-play on mount (React handles remount via key prop)
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Video playback failed:', err.message);
        }
      });
    }

    // Cleanup
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [defaultVideo]); // Re-run when video changes (but key prop handles remount)

  return (
    <div className="w-full h-64 xs:h-72 sm:h-80 md:h-96 lg:my-auto flex justify-center items-center bg-transparent">
      {/* Key prop forces remount when video changes - solves all timing issues */}
      <video
        key={defaultVideo} // ← This is the magic fix!
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