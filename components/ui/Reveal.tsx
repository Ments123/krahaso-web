"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** id passthrough for anchor targets */
  id?: string;
}

/**
 * Fades + slides its contents into view once, when scrolled near.
 * Also flips the `data-in` attribute that drives child `.barfill` bars.
 * Falls back to visible if IntersectionObserver is unavailable.
 */
export function Reveal({ as: Tag = "div", className = "", style, children, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      data-in={shown ? "1" : "0"}
      style={style}
    >
      {children}
    </Tag>
  );
}
