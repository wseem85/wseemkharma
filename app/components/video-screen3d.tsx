// components/VideoScreen3D.tsx
'use client';
import { useRef, useEffect, useState } from 'react';

const VideoScreen3D = ({ defaultVideo }: { defaultVideo: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleOtherVideoPlaying = (event: Event) => {
      const otherVideo = (event as CustomEvent<string>).detail;
      if (otherVideo !== defaultVideo) {
        video.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('portfolio-video-play', handleOtherVideoPlaying);

    // Cleanup
    return () => {
      if (video) {
        video.pause();
      }
      document.removeEventListener('portfolio-video-play', handleOtherVideoPlaying);
    };
  }, [defaultVideo]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      document.dispatchEvent(new CustomEvent('portfolio-video-play', { detail: defaultVideo }));
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative flex h-64 w-full items-center justify-center bg-transparent xs:h-72 sm:h-80 md:h-96 lg:my-auto">
      <video
        key={defaultVideo}
        ref={videoRef}
        src={defaultVideo}
        className="max-h-full max-w-full object-contain"
        loop
        muted
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause project preview' : 'Play project preview'}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-xl backdrop-blur transition hover:scale-110 hover:border-red-ground hover:bg-red-ground/80"
      >
        {isPlaying ? (
          <span className="flex gap-1"><span className="h-5 w-1.5 rounded-sm bg-white" /><span className="h-5 w-1.5 rounded-sm bg-white" /></span>
        ) : (
          <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
        )}
      </button>
    </div>
  );
};

export { VideoScreen3D };
