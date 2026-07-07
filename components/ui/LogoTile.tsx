import { ContainImg } from "./ContainImg";

interface LogoTileProps {
  src: string;
  alt: string;
  size: number;
  pad?: number;
  /** drop the tile chrome (border/bg) — e.g. when sitting on a coloured surface */
  bare?: boolean;
  radius?: number;
  className?: string;
}

/** A clean white tile holding an undistorted supermarket logo. */
export function LogoTile({ src, alt, size, pad = 4, bare = false, radius, className = "" }: LogoTileProps) {
  return (
    <span
      className={`relative block overflow-hidden ${bare ? "" : "border border-[#E7EBE4] bg-white"} ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius ?? 12,
      }}
    >
      <ContainImg src={src} alt={alt} pad={pad} sizes={`${size}px`} />
    </span>
  );
}
