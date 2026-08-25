import { useEffect, useRef } from 'react';
import { universeTiles } from '../content/landing';
import { getUniverseState } from '../motion/progress';
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

    if (!root || !stage || !gallery || !phone || !copy || !overlay || reduced || window.innerWidth < 900) {
      return undefined;
    }

    let active = true;
    let cleanup: (() => void) | undefined;

    void import('../motion/gsap').then(({ gsap, ScrollTrigger }) => {
      if (!active) return;

      const media = gallery.querySelectorAll<HTMLElement>('.universe-tile-media');
      const context = gsap.context(() => {
        const initial = getUniverseState(0);
        gsap.set(gallery, { scale: initial.galleryScale });
        gsap.set(media, { scale: initial.mediaScale });
        gsap.set(phone, { autoAlpha: initial.phoneOpacity, scale: initial.phoneScale });
        gsap.set(copy, { autoAlpha: initial.copyOpacity });

        const mainTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          pin: stage,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const state = getUniverseState(progress);
            gsap.set(gallery, { scale: state.galleryScale });
            gsap.set(media, { scale: state.mediaScale });
            gsap.set(phone, {
              autoAlpha: state.phoneOpacity,
              scale: state.phoneScale,
            });
            gsap.set(copy, { autoAlpha: state.copyOpacity });
          },
        });

        const exitTween = gsap.to([gallery, phone], {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: '82% bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        const shadeTween = gsap.to(overlay, {
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: '86% bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        cleanup = () => {
          mainTrigger.kill();
          exitTween.scrollTrigger?.kill();
          shadeTween.scrollTrigger?.kill();
          context.revert();
        };
      }, root);

      ScrollTrigger.refresh();
    });

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
          <PhoneFrame label="Ballina reale e aplikacionit Krahaso" />
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
