import { useEffect, useRef } from 'react';
import { featureChapters } from '../content/landing';
import { PhoneFrame } from './PhoneFrame';

export function FeatureStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || reduced) return undefined;

    let active = true;
    let cleanup: (() => void) | undefined;

    void import('../motion/gsap')
      .then(({ gsap, ScrollTrigger }) => {
        if (!active) return;

        const cards = Array.from(root.querySelectorAll<HTMLElement>('.feature-chapter'));
        const media = gsap.matchMedia();
        const context = gsap.context(() => {
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

        cleanup = () => {
          media.revert();
          context.revert();
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
