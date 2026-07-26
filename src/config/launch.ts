import type { Platform } from '../lib/platform';

export type LaunchMode = 'prelaunch' | 'preorder' | 'live';
export type AcquisitionKind = 'waitlist' | 'app-store' | 'play-store';

export type LaunchConfig = {
  mode: LaunchMode;
  rewardsEnabled: boolean;
  appStoreUrl?: string;
  playStoreUrl?: string;
  appStorePreorderUrl?: string;
  playPreregUrl?: string;
  waitlistUrl?: string;
};

export type AcquisitionLink = {
  href: string;
  kind: AcquisitionKind;
  label: string;
  compactLabel: string;
};

const readUrl = (value: string | undefined) => {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

const readMode = (value: string | undefined): LaunchMode => {
  if (value === 'preorder' || value === 'live') return value;
  return 'prelaunch';
};

export function getLaunchConfig(): LaunchConfig {
  return {
    mode: readMode(import.meta.env.VITE_LAUNCH_MODE),
    rewardsEnabled: import.meta.env.VITE_REWARDS_ENABLED === 'true',
    appStoreUrl: readUrl(import.meta.env.VITE_APP_STORE_URL),
    playStoreUrl: readUrl(import.meta.env.VITE_PLAY_STORE_URL),
    appStorePreorderUrl: readUrl(import.meta.env.VITE_APP_STORE_PREORDER_URL),
    playPreregUrl: readUrl(import.meta.env.VITE_PLAY_PREREG_URL),
    waitlistUrl: readUrl(import.meta.env.VITE_WAITLIST_URL),
  };
}

const sortForPlatform = (links: AcquisitionLink[], platform: Platform) => {
  if (platform === 'unknown') return links;
  const preferredKind = platform === 'apple' ? 'app-store' : 'play-store';
  return [...links].sort((left, right) => {
    if (left.kind === preferredKind) return -1;
    if (right.kind === preferredKind) return 1;
    return 0;
  });
};

export function getAcquisitionLinks(
  config: LaunchConfig,
  platform: Platform,
): AcquisitionLink[] {
  if (config.mode === 'prelaunch') {
    return config.waitlistUrl
      ? [{
          href: config.waitlistUrl,
          kind: 'waitlist',
          label: 'Më njofto kur të lansohet',
          compactLabel: 'Njoftohu',
        }]
      : [];
  }

  const links: AcquisitionLink[] = [];
  const appleUrl = config.mode === 'preorder' ? config.appStorePreorderUrl : config.appStoreUrl;
  const playUrl = config.mode === 'preorder' ? config.playPreregUrl : config.playStoreUrl;

  if (appleUrl) {
    links.push({
      href: appleUrl,
      kind: 'app-store',
      label: config.mode === 'preorder' ? 'Porosite në App Store' : 'App Store',
      compactLabel: config.mode === 'preorder' ? 'Regjistrohu' : 'Shkarko',
    });
  }

  if (playUrl) {
    links.push({
      href: playUrl,
      kind: 'play-store',
      label: config.mode === 'preorder' ? 'Regjistrohu në Google Play' : 'Google Play',
      compactLabel: config.mode === 'preorder' ? 'Regjistrohu' : 'Shkarko',
    });
  }

  return sortForPlatform(links, platform);
}

export const launchConfig = getLaunchConfig();
