import { useEffect, useRef } from 'react';
import { universeTiles } from '../content/landing';
import { getUniverseState, type UniverseMode } from '../motion/progress';
import { PhoneFrame } from './PhoneFrame';

export function VisualUniverse() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const gallery = galleryRef.current;
    const phone = phoneRef.current;
    const copy = copyRef.current;
    const overlay = overlayRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!root || !stage || !gallery || !phone || !copy || !overlay || reduced) {
      return undefined;
    }

    let active = true;
    let cleanup: (() => void) | undefined;

    void import('../motion/gsap')
      .then(({ gsap, ScrollTrigger }) => {
        if (!active) return;

        const tiles = gallery.querySelectorAll<HTMLElement>('.universe-tile-media');
        const media = gsap.matchMedia();
        const render = (mode: UniverseMode, progress: number) => {
          const state = getUniverseState(progress, mode);
          const exitStart = mode === 'mobile' ? 0.78 : 0.82;
          const exitProgress = Math.max(0, Math.min(1, (progress - exitStart) / (1 - exitStart)));

          gsap.set(gallery, {
            scale: state.galleryScale,
            yPercent: -18 * exitProgress,
          });
          gsap.set(tiles, { scale: state.mediaScale });
          gsap.set(phone, {
            autoAlpha: state.phoneOpacity,
            scale: state.phoneScale,
            yPercent: -18 * exitProgress,
          });
          gsap.set(copy, { autoAlpha: state.copyOpacity });
          gsap.set(overlay, { autoAlpha: exitProgress });
        };

        const context = gsap.context(() => {
          root.classList.add('motion-ready');

          media.add('(min-width: 900px)', () => {
            render('desktop', 0);
            const trigger = ScrollTrigger.create({
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              pin: stage,
              pinSpacing: false,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: ({ progress }) => render('desktop', progress),
            });
            return () => trigger.kill();
          });

          media.add('(max-width: 899px)', () => {
            render('mobile', 0);
            const trigger = ScrollTrigger.create({
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              invalidateOnRefresh: true,
              onUpdate: ({ progress }) => render('mobile', progress),
            });
            return () => trigger.kill();
          });
        }, root);

        cleanup = () => {
          media.revert();
          context.revert();
          root.classList.remove('motion-ready');
          gsap.set([gallery, ...tiles, phone, copy, overlay], { clearProps: 'all' });
        };

        ScrollTrigger.refresh();
      })
      .catch(() => undefined);

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <section id="universi" ref={rootRef} className="visual-universe" aria-labelledby="universe-title">
      <div ref={stageRef} className="universe-stage">
        <div ref={galleryRef} className="universe-gallery" aria-hidden="true">
          {universeTiles.map((tile, index) => (
            <div className={`universe-tile universe-tile-${index + 1}`} key={tile.src}>
              <div className={`universe-tile-media universe-tile-${tile.kind}`}>
                <img src={tile.src} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>

        <div ref={phoneRef} className="universe-phone">
          <p className="eyebrow universe-kicker">Një pamje. Më shumë qartësi.</p>
          <PhoneFrame screen="homeFeed" />
        </div>

        <div ref={copyRef} className="universe-copy">
          <p className="eyebrow">Në xhepin tënd</p>
          <h2 id="universe-title">Nga rafti te zgjedhja.</h2>
        </div>
        <div ref={overlayRef} className="universe-exit-overlay" aria-hidden="true" />
      </div>
    </section>
  );
}
