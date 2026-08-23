import React, { useEffect, useRef, useState } from 'react';
import Floppy from './Floppy';

/** 读盘开机动画：进度走满或点击任意处后淡出 */
const BootScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHiding(true);
      return;
    }

    timer.current = window.setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 16 + 7;
        if (next >= 100) {
          if (timer.current) window.clearInterval(timer.current);
          window.setTimeout(() => setHiding(true), 320);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!hiding) return;
    const t = window.setTimeout(() => setGone(true), 750);
    return () => window.clearTimeout(t);
  }, [hiding]);

  if (gone) return null;

  const skip = () => {
    if (timer.current) window.clearInterval(timer.current);
    setHiding(true);
  };

  return (
    <div className={`boot-screen${hiding ? ' hidden' : ''}`} aria-hidden="true" onClick={skip}>
      <div className="boot-box">
        <Floppy className="floppy-boot" />
        <p className="boot-line">
          READING <span className="boot-file">portfolio.dat</span>
        </p>
        <div className="boot-bar">
          <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="boot-tip">click anywhere to skip</p>
      </div>
    </div>
  );
};

export default BootScreen;
