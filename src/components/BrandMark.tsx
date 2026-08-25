type Props = {
  inverse?: boolean;
  className?: string;
};

export function BrandMark({ inverse = false, className = '' }: Props) {
  return (
    <img
      src="/favicon.png"
      alt=""
      aria-hidden="true"
      className={`brand-mark-image ${inverse ? 'brand-mark-image-inverse' : ''} ${className}`}
    />
  );
}
