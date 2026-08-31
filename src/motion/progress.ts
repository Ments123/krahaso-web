export type UniverseState = {
  galleryScale: number;
  mediaScale: number;
  phoneOpacity: number;
  phoneScale: number;
  copyOpacity: number;
};

export type UniverseMode = 'desktop' | 'mobile';

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const map = (value: number, start: number, end: number, from: number, to: number) => {
  const progress = clamp((value - start) / (end - start));
  return from + (to - from) * progress;
};

export function getUniverseState(
  rawProgress: number,
  mode: UniverseMode = 'desktop',
): UniverseState {
  const progress = clamp(rawProgress);

  if (mode === 'mobile') {
    return {
      galleryScale: map(progress, 0, 0.6, 0.86, 0.52),
      mediaScale: map(progress, 0, 0.6, 1.08, 0.96),
      phoneOpacity: map(progress, 0.24, 0.56, 0, 1),
      phoneScale: map(progress, 0.24, 0.56, 0.92, 1),
      copyOpacity: map(progress, 0.16, 0.44, 1, 0),
    };
  }

  return {
    galleryScale: map(progress, 0, 0.68, 1, 0.52),
    mediaScale: map(progress, 0, 0.68, 1.18, 1),
    phoneOpacity: map(progress, 0.25, 0.56, 0, 1),
    phoneScale: map(progress, 0.25, 0.56, 0.92, 1),
    copyOpacity: map(progress, 0.18, 0.46, 1, 0),
  };
}
