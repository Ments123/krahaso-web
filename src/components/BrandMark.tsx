type Props = {
  inverse?: boolean;
  className?: string;
};

export function BrandMark({ inverse = false, className = '' }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`brand-mark ${inverse ? 'brand-mark-inverse' : ''} ${className}`}
    >
      K
    </span>
  );
}
