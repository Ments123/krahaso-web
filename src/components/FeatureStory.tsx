import { useEffect, useRef } from 'react';
import { featureChapters } from '../content/landing';
import { PhoneFrame } from './PhoneFrame';

export function FeatureStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = true;
    let setupVersion = 0;
    let cleanupMotion: (() => void) | undefined;

    const resetFallback = () => {
      root.querySelectorAll<HTMLElement>('.feature-copy, .feature-visual')
        .forEach((element) => element.removeAttribute('style'));
    };

    const teardownMotion = () => {
      setupVersion += 1;
      const cleanup = cleanupMotion;
      cleanupMotion = undefined;
      cleanup?.();
      resetFallback();
    };

    const setupMotion = async () => {
      const version = ++setupVersion;
      if (motionPreference.matches) {
        resetFallback();
        return;
      }

      try {
        const { gsap, ScrollTrigger } = await import('../motion/gsap');
        if (!active || motionPreference.matches || version !== setupVersion) return;

        const cards = Array.from(root.querySelectorAll<HTMLElement>('.feature-chapter'));
        const media = gsap.matchMedia();
        let context: ReturnType<typeof gsap.context> | undefined;
        const cleanupInstance = () => {
          media.revert();
          context?.revert();
          resetFallback();
        };

        try {
          context = gsap.context(() => {
            media.add('(min-width: 900px)', () => {
              const triggers: Array<ReturnType<typeof ScrollTrigger.create>> = [];
              const tweens: gsap.core.Tween[] = [];

              cards.slice(0, -1).forEach((card, index) => {
                const visual = card.querySelector<HTMLElement>('.feature-visual');
                const copy = card.querySelector<HTMLElement>('.feature-copy');
                if (!visual || !copy) return;

                triggers.push(
                  ScrollTrigger.create({
                    trigger: card,
                    start: 'top 16%',
                    end: 'bottom 20%',
                    pin: visual,
                    pinSpacing: false,
                    anticipatePin: 1,
                  }),
                );
                tweens.push(
                  gsap.fromTo(
                    copy,
                    { autoAlpha: 0.38, y: 48 },
                    {
                      autoAlpha: 1,
                      y: 0,
                      ease: 'none',
                      scrollTrigger: {
                        trigger: card,
                        start: 'top 78%',
                        end: 'top 42%',
                        scrub: true,
                      },
                    },
                  ),
                  gsap.to(visual, {
                    y: `${-(index + 1) * 2}vh`,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: card,
                      start: '50% 58%',
                      end: 'bottom top',
                      scrub: true,
                    },
                  }),
                );
              });

              return () => {
                triggers.forEach((trigger) => trigger.kill());
                tweens.forEach((tween) => tween.kill());
              };
            });

            media.add('(max-width: 899px)', () => {
              const tweens = cards.flatMap((card) => {
                const copy = card.querySelector<HTMLElement>('.feature-copy');
                const visual = card.querySelector<HTMLElement>('.feature-visual');
                if (!copy || !visual) return [];

                return [
                  gsap.fromTo(
                    [copy, visual],
                    { autoAlpha: 0.45, y: 36, scale: 0.97 },
                    {
                      autoAlpha: 1,
                      y: 0,
                      scale: 1,
                      ease: 'none',
                      scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        end: 'top 52%',
                        scrub: 0.35,
                      },
                    },
                  ),
                ];
              });

              return () => tweens.forEach((tween) => tween.kill());
            });
          }, root);

          if (!active || motionPreference.matches || version !== setupVersion) {
            cleanupInstance();
            return;
          }

          ScrollTrigger.refresh();
          cleanupMotion = cleanupInstance;
        } catch {
          cleanupInstance();
        }
      } catch {
        resetFallback();
      }
    };

    const handleMotionPreference = () => {
      teardownMotion();
      if (!motionPreference.matches) void setupMotion();
    };

    motionPreference.addEventListener('change', handleMotionPreference);
    void setupMotion();

    return () => {
      active = false;
      motionPreference.removeEventListener('change', handleMotionPreference);
      teardownMotion();
    };
  }, []);

  return (
    <section id="veçorite" ref={rootRef} className="feature-story" aria-labelledby="features-title">
      <div className="story-intro section-shell">
        <p className="eyebrow">Hap pas hapi</p>
        <h2 id="features-title">Bli me më shumë informacion.</h2>
        <p>
          Krahaso të ndihmon ta gjesh produktin, t’i shohësh ofertat dhe të
          kuptosh çfarë të dhënash kemi—para se të vendosësh.
        </p>
      </div>

      <div className="feature-chapters">
        {featureChapters.map((chapter, index) => (
          <article
            className={`feature-chapter feature-chapter-${chapter.id}`}
            key={chapter.id}
          >
            <div className="feature-chapter-inner section-shell">
              <div className="feature-copy">
                <span className="feature-step">{chapter.step}</span>
                <p className="eyebrow">{chapter.eyebrow}</p>
                <h3>{chapter.title}</h3>
                <p className="feature-description">{chapter.description}</p>
              </div>
              <div className="feature-visual">
                <div className="feature-orbit" aria-hidden="true" />
                <PhoneFrame
                  className="feature-phone"
                  screen={chapter.screen}
                  label={`Pamje reale e aplikacionit për veçorinë ${chapter.title}`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
