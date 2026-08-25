import { SiGoogleplay } from 'react-icons/si';
import { preserveUtm, trackEvent } from '../lib/analytics';

type Props = {
  placement: 'hero' | 'nav' | 'download' | 'sticky';
  inverse?: boolean;
  compact?: boolean;
  onNavigate?: () => void;
};

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.krahaso.app';

export function AppAcquisitionCta({
  placement,
  inverse = false,
  compact = false,
  onNavigate,
}: Props) {
  return (
    <div className={`acquisition-links ${compact ? 'acquisition-links-compact' : ''}`}>
      <a
        href={preserveUtm(PLAY_STORE_URL)}
        target="_blank"
        rel="noopener noreferrer"
        className={`acquisition-link acquisition-link-primary ${inverse ? 'acquisition-link-inverse' : ''}`}
        onClick={() => {
          trackEvent('play_store_click', { placement });
          if (placement === 'hero') trackEvent('hero_store_click', { store: 'play-store' });
          if (placement === 'sticky') trackEvent('sticky_store_click', { store: 'play-store' });
          onNavigate?.();
        }}
      >
        <SiGoogleplay aria-hidden="true" />
        <span>{compact ? 'Shkarko' : 'Shkarko në Google Play'}</span>
      </a>
    </div>
  );
}
