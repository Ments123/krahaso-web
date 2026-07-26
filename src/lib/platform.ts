export type Platform = 'apple' | 'android' | 'unknown';

export function detectPlatform(userAgent?: string): Platform {
  const ua = userAgent ?? (typeof navigator === 'undefined' ? '' : navigator.userAgent);

  if (/android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'apple';

  if (
    typeof navigator !== 'undefined'
    && navigator.platform === 'MacIntel'
    && navigator.maxTouchPoints > 1
  ) {
    return 'apple';
  }

  return 'unknown';
}
