import { SiApple, SiGoogleplay } from 'react-icons/si';
import { preserveUtm, trackEvent } from '../lib/analytics';

type Props = {
  placement: 'hero' | 'nav' | 'download' | 'sticky' | 'footer';
  inverse?: boolean;
  compact?: boolean;
  onNavigate?: () => void;
};

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.krahaso.app';
export const APP_STORE_URL =
  'https://apps.apple.com/us/app/krahaso/id6806572228';

export function AppAcquisitionCta({
  placement,
  inverse = false,
  compact = false,
  onNavigate,
}: Props) {
  const label = (store: 'play' | 'apple') => {
    if (placement === 'footer' || compact) {
      return store === 'play' ? 'Google Play' : 'App Store';
    }

    return store === 'play' ? 'Shkarko në Google Play' : 'Shkarko në App Store';
  };

  return (
    <div className={`acquisition-links ${compact ? 'acquisition-links-compact' : ''}`}>
      <a
        href={preserveUtm(PLAY_STORE_URL)}
        target="_blank"
        rel="noopener noreferrer"
        data-acquisition-placement={placement}
        className={`acquisition-link acquisition-link-primary acquisition-link-${placement} ${inverse ? 'acquisition-link-inverse' : ''}`}
        onClick={() => {
          trackEvent('play_store_click', { placement });
          if (placement === 'hero') trackEvent('hero_store_click', { store: 'play-store' });
          if (placement === 'sticky') trackEvent('sticky_store_click', { store: 'play-store' });
          onNavigate?.();
        }}
      >
        <SiGoogleplay aria-hidden="true" />
        <span>{label('play')}</span>
      </a>
      <a
        href={preserveUtm(APP_STORE_URL)}
        target="_blank"
        rel="noopener noreferrer"
        data-acquisition-placement={placement}
        data-acquisition-store="app-store"
        className={`acquisition-link acquisition-link-secondary acquisition-link-${placement} ${inverse ? 'acquisition-link-inverse-secondary' : ''}`}
        onClick={() => {
          trackEvent('app_store_click', { placement });
          if (placement === 'hero') trackEvent('hero_store_click', { store: 'app-store' });
          if (placement === 'sticky') trackEvent('sticky_store_click', { store: 'app-store' });
          onNavigate?.();
        }}
      >
        <SiApple aria-hidden="true" />
        <span>{label('apple')}</span>
      </a>
    </div>
  );
}
