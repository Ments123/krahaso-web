import Image from "next/image";
import type { CSSProperties } from "react";

interface ContainImgProps {
  src: string;
  alt: string;
  sizes?: string;
  /** inner padding so a packshot/logo doesn't touch the tile edges */
  pad?: number | string;
  priority?: boolean;
  className?: string;
}

/**
 * Fills its (positioned, fixed-size) parent with a contained image.
 * Local assets are optimised by next/image; remote Unsplash photos are
 * served as-is (the deploy environment may not proxy them).
 */
export function ContainImg({ src, alt, sizes = "96px", pad, priority, className }: ContainImgProps) {
  const remote = src.startsWith("http");
  const style: CSSProperties = { objectFit: "contain" };
  if (pad !== undefined) style.padding = typeof pad === "number" ? `${pad}px` : pad;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={remote}
      priority={priority}
      className={className}
      style={style}
    />
  );
}
