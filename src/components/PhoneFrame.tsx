import type { FeatureId } from '../content/landing';

type Props = {
  className?: string;
  focus?: FeatureId;
  priority?: boolean;
  label?: string;
};

export function PhoneFrame({
  className = '',
  focus,
  priority = false,
  label = 'Pamje reale nga aplikacioni Krahaso',
}: Props) {
  return (
    <figure className={`phone-frame ${className}`.trim()}>
      <div className="phone-hardware" aria-hidden="true">
        <span className="phone-speaker" />
      </div>
      <div className="phone-screen">
        <img
          src="/app/krahaso-home.webp"
          alt={label}
          width="716"
          height="1536"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        {focus ? <span className={`screen-focus screen-focus-${focus}`} aria-hidden="true" /> : null}
      </div>
    </figure>
  );
}
