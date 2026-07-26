import { Apple, Bell, Play } from 'lucide-react';
import {
  getAcquisitionLinks,
  launchConfig,
  type AcquisitionKind,
} from '../config/launch';
import { detectPlatform } from '../lib/platform';
import { preserveUtm, trackEvent, type AnalyticsEventName } from '../lib/analytics';

type Props = {
  placement: 'hero' | 'nav' | 'download' | 'sticky';
  inverse?: boolean;
  compact?: boolean;
  onNavigate?: () => void;
};

const eventForKind: Record<AcquisitionKind, AnalyticsEventName> = {
  'app-store': 'app_store_click',
  'play-store': 'play_store_click',
  waitlist: 'waitlist_click',
};

export function AppAcquisitionCta({
  placement,
  inverse = false,
  compact = false,
  onNavigate,
}: Props) {
  const links = getAcquisitionLinks(launchConfig, detectPlatform());

  if (links.length === 0) {
    return (
      <span
        className={`acquisition-status ${inverse ? 'acquisition-status-inverse' : ''}`}
        role="status"
      >
        Lansimi po përgatitet
      </span>
    );
  }

  return (
    <div className={`acquisition-links ${compact ? 'acquisition-links-compact' : ''}`}>
      {links.map((link, index) => {
        const Icon = link.kind === 'app-store'
          ? Apple
          : link.kind === 'play-store'
            ? Play
            : Bell;
        const primary = index === 0;

        return (
          <a
            key={`${link.kind}-${link.href}`}
            href={preserveUtm(link.href)}
            target="_blank"
            rel="noopener noreferrer"
            className={`acquisition-link ${primary ? 'acquisition-link-primary' : 'acquisition-link-secondary'} ${inverse ? 'acquisition-link-inverse' : ''}`}
            onClick={() => {
              trackEvent(eventForKind[link.kind], { placement });
              if (placement === 'hero') trackEvent('hero_store_click', { store: link.kind });
              if (placement === 'sticky') trackEvent('sticky_store_click', { store: link.kind });
              onNavigate?.();
            }}
          >
            <Icon aria-hidden="true" />
            <span>{compact ? link.compactLabel : link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
