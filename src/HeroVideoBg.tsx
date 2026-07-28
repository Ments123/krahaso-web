import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  className?: string;
  reducedMotion?: boolean;
};

export default function HeroVideoBg({
  src,
  className = '',
  reducedMotion = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!reducedMotion || !window.matchMedia('(min-width: 640px)').matches) return;

    void videoRef.current?.play().catch(() => undefined);
  }, [reducedMotion]);

  return (
    <div className={`hero-video-wrap ${className}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video h-full w-full object-cover"
        src={src}
        poster="/hero-bridge.webp"
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
    </div>
  );
}
