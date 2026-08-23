import React, { useEffect, useRef } from 'react';
import Floppy from './Floppy';
import { PROFILE } from '../resume';

const ORBS = [
  { cls: 'orb-1', depth: 14 },
  { cls: 'orb-2', depth: -10 },
  { cls: 'orb-3', depth: 18 },
  { cls: 'orb-4', depth: -14 },
  { cls: 'orb-5', depth: 10 },
  { cls: 'orb-6', depth: -18 },
];

const Hero: React.FC = () => {
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduceMotion) return;

    const orbs = Array.from(wall.querySelectorAll('.orbs .orb')) as HTMLElement[];

    const onMove = (e: MouseEvent) => {
      const rect = wall.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      orbs.forEach(orb => {
        const depth = parseFloat(orb.dataset.depth ?? '10');
        orb.style.translate = `${x * depth}px ${y * depth}px`;
      });
    };

    const onLeave = () => orbs.forEach(orb => (orb.style.translate = ''));

    wall.addEventListener('mousemove', onMove);
    wall.addEventListener('mouseleave', onLeave);
    return () => {
      wall.removeEventListener('mousemove', onMove);
      wall.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow">{PROFILE.eyebrow}</p>
          <h1 className="hero-script">{PROFILE.script}</h1>
          <p className="hero-sub-en">{PROFILE.subEn}</p>
          <p className="hero-name-cn">
            {PROFILE.nameCn} <span>{PROFILE.nameSuffix}</span>
          </p>
          <p className="hero-desc">{PROFILE.desc}</p>
        </div>

        <div className="hero-visual">
          <div className="portfolio-wall" ref={wallRef} aria-label="PORTFOLIO">
            <Floppy className="floppy-big" />
            <div className="letters" aria-hidden="true">
              {'PORTFOLIO'.split('').map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </div>
            <div className="orbs" aria-hidden="true">
              {ORBS.map(orb => (
                <span key={orb.cls} className={`orb ${orb.cls}`} data-depth={orb.depth} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">scroll</div>
    </section>
  );
};

export default Hero;
