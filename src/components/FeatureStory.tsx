import { useEffect, useRef } from 'react';
import { featureChapters } from '../content/landing';
import { PhoneFrame } from './PhoneFrame';

export function FeatureStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root || reduced || window.innerWidth < 900) return undefined;

    let active = true;
    let cleanup: (() => void) | undefined;

    void import('../motion/gsap').then(({ gsap, ScrollTrigger }) => {
      if (!active) return;

      const context = gsap.context(() => {
        const cards = Array.from(root.querySelectorAll<HTMLElement>('.feature-chapter'));
        const triggers: Array<ReturnType<typeof ScrollTrigger.create>> = [];
        const tweens: gsap.core.Tween[] = [];

        cards.slice(0, -1).forEach((card, index) => {
          const visual = card.querySelector<HTMLElement>('.feature-visual');
          const copy = card.querySelector<HTMLElement>('.feature-copy');
          if (!visual || !copy) return;

          triggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 12%',
              end: 'bottom 34%',
              pin: visual,
              pinSpacing: false,
              anticipatePin: 1,
            }),
          );

          tweens.push(
            gsap.fromTo(
              copy,
              { autoAlpha: 0.3, y: 72 },
              {
                autoAlpha: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 72%',
                  end: 'top 34%',
                  scrub: true,
                },
              },
            ),
          );

          tweens.push(
            gsap.to(visual, {
              y: `${-(index + 1) * 3.5}vh`,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: '55% 60%',
                end: 'bottom top',
                scrub: true,
              },
            }),
          );
        });

        cleanup = () => {
          triggers.forEach((trigger) => trigger.kill());
          tweens.forEach((tween) => tween.scrollTrigger?.kill());
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
                  focus={chapter.id}
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
