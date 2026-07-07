"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface SoonButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** text shown briefly after click; defaults to "Së shpejti" */
  soonLabel?: string;
  ariaLabel?: string;
}

/**
 * A button for actions that aren't live yet (app download, social, legal).
 * On click it briefly announces "Së shpejti" instead of doing nothing —
 * so there are no dead buttons.
 */
export function SoonButton({ children, className = "", style, soonLabel = "Së shpejti", ariaLabel }: SoonButtonProps) {
  const [soon, setSoon] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`btn ${className}`.trim()}
      style={style}
      onClick={() => {
        setSoon(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setSoon(false), 1600);
      }}
    >
      {soon ? soonLabel : children}
    </button>
  );
}
