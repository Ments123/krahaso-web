import type { CSSProperties } from "react";

/** The Krahaso logo: a green rounded square containing a white "K". */
export function BrandMark({ size = 34 }: { size?: number }) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: size * 0.29,
    fontSize: size * 0.59,
  };
  return (
    <span
      aria-hidden="true"
      className="grid place-items-center bg-brand text-white font-display font-extrabold"
      style={style}
    >
      K
    </span>
  );
}
