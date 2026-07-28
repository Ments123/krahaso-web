type Props = {
  src: string;
  className?: string;
};

export default function HeroVideoBg({ src, className = '' }: Props) {
  return (
    <div className={`hero-video-wrap ${className}`} aria-hidden="true">
      <video
        className="hero-video h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
    </div>
  );
}
