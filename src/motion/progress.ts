export type UniverseState = {
  galleryScale: number;
  mediaScale: number;
  phoneOpacity: number;
  phoneScale: number;
  copyOpacity: number;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const map = (value: number, start: number, end: number, from: number, to: number) => {
  const progress = clamp((value - start) / (end - start));
  return from + (to - from) * progress;
};

export function getUniverseState(rawProgress: number): UniverseState {
  const progress = clamp(rawProgress);

  return {
    galleryScale: map(progress, 0, 0.75, 1, 0.5),
    mediaScale: map(progress, 0, 0.75, 1.25, 1),
    phoneOpacity: map(progress, 0.42, 0.75, 0, 1),
    phoneScale: map(progress, 0.42, 0.75, 0.9, 1),
    copyOpacity: map(progress, 0.34, 0.64, 1, 0),
  };
}
