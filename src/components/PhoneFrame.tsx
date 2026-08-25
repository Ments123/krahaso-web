import { appScreens, type AppScreenId } from '../content/landing';

type Props = {
  className?: string;
  screen?: AppScreenId;
  priority?: boolean;
  label?: string;
};

export function PhoneFrame({
  className = '',
  screen = 'home',
  priority = false,
  label,
}: Props) {
  const screenshot = appScreens[screen];

  return (
    <figure className={`phone-frame ${className}`.trim()}>
      <div className="phone-hardware" aria-hidden="true">
        <span className="phone-speaker" />
      </div>
      <div className="phone-screen">
        <img
          src={screenshot.src}
          alt={label ?? screenshot.alt}
          width="716"
          height="1536"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </figure>
  );
}
