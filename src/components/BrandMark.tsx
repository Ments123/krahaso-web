type Props = {
  inverse?: boolean;
  className?: string;
};

export function BrandMark({ inverse = false, className = '' }: Props) {
  if (inverse) {
    return (
      <img
        src="/favicon.png"
        alt=""
        aria-hidden="true"
        className={`brand-mark-image ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`brand-mark ${className}`}
    >
      K
    </span>
  );
}
