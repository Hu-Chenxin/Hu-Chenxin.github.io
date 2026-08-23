import { useEffect } from 'react';

/**
 * 进入视口时给元素加上 .in，实现纸墨风的轻微上浮淡入。
 * 只对首屏渲染即存在的静态区块使用；筛选后动态出现的卡片不参与，避免停留在隐藏态。
 */
export function useReveal(selector: string): void {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}
