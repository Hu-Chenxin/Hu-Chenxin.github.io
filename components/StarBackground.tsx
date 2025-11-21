import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let w = 0;
    let h = 0;
    let dpr = 1;

    // State variables
    let angle = 0;
    const ANGLE_SPEED = 0.0065;
    let lastTime = performance.now();
    
    interface Particle {
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      drift: number;
      vx: number;
      vy: number;
    }
    
    let particles: Particle[] = [];
    let lineWidth = 100; // Will be updated in resize

    const initParticles = () => {
      particles = [];
      const particleCountBase = 90;
      // Screen area based density calculation
      // Using logic from the snippet
      const density = Math.min(260, Math.floor((w * h) / 22000)); 
      const count = Math.max(40, Math.floor(particleCountBase * (density / 90)));
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.6) + 0.6,
          baseAlpha: 0.08 + Math.random() * 0.18,
          drift: (Math.random() - 0.5) * 0.2,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      
      // Set actual canvas size in pixels
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      
      // Fix visual size via CSS
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Normalize coordinate system
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Update line width based on new size
      lineWidth = Math.min(220, Math.max(80, Math.min(w, h) * 0.18));

      initParticles();
    };

    // Initial resize
    resize();
    window.addEventListener('resize', resize);

    const update = (dt: number) => {
      const t = dt / 16.666;
      angle += ANGLE_SPEED * t;
      
      const now = performance.now();

      for (const p of particles) {
        p.x += p.vx * t * 1.8;
        p.y += p.vy * t * 1.8;
        // Sine wave drift
        p.x += Math.sin((p.y + now * 0.0002) * 0.0001) * p.drift;
        
        // Wrap around with buffer
        const buffer = 20;
        if (p.x < -buffer) p.x = w + buffer;
        if (p.x > w + buffer) p.x = -buffer;
        if (p.y < -buffer) p.y = h + buffer;
        if (p.y > h + buffer) p.y = -buffer;
      }
    };

    const draw = () => {
      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(4,6,16,0.6)');
      g.addColorStop(1, 'rgba(2,3,8,0.75)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Draw dim base stars
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(180,200,255, ${p.baseAlpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scan line vectors
      const cx = w / 2;
      const cy = h / 2;
      const vx = Math.cos(angle);
      const vy = Math.sin(angle);

      // Sweep gradient
      // The gradient is defined across the screen based on the rotation
      const sweepGrad = ctx.createLinearGradient(cx - vx * w, cy - vy * h, cx + vx * w, cy + vy * h);
      sweepGrad.addColorStop(0.0, 'rgba(0,0,0,0)');
      sweepGrad.addColorStop(0.45, 'rgba(127,124,255,0.03)');
      sweepGrad.addColorStop(0.5, 'rgba(0,224,255,0.08)');
      sweepGrad.addColorStop(0.55, 'rgba(127,124,255,0.06)');
      sweepGrad.addColorStop(1.0, 'rgba(0,0,0,0)');

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Highlight particles near scan line
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        // Perpendicular distance to scan line
        const perp = Math.abs((-vy) * dx + (vx) * dy);
        const distCenter = Math.hypot(dx, dy);

        const inBand = Math.max(0, 1 - (perp / lineWidth));
        const nearCenter = Math.max(0, 1 - (distCenter / Math.max(w, h)));
        
        // Intensity calculation
        const intensity = Math.pow(inBand, 1.8) * (0.7 + 0.3 * nearCenter);

        if (intensity > 0.01) {
          ctx.beginPath();
          const a = Math.min(0.9, p.baseAlpha * 6 * intensity);
          
          // Color: Neon Cyan/Blue/Violet
          const rColor = Math.floor(110 + 145 * intensity);
          const gColor = Math.floor(140 + 90 * intensity);
          const bColor = 255;
          
          ctx.fillStyle = `rgba(${rColor}, ${gColor}, ${bColor}, ${a})`;
          
          // Glow effect
          ctx.shadowBlur = 8 + 18 * intensity;
          ctx.shadowColor = `rgba(100,160,255,${Math.min(0.85, a)})`;
          
          // Dynamic size
          ctx.arc(p.x, p.y, p.r + 1.6 * intensity * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Vignette / Center Glow
      const cg = ctx.createRadialGradient(cx, cy, Math.min(w,h)*0.05, cx, cy, Math.max(w,h));
      cg.addColorStop(0, 'rgba(40,30,55,0.00)');
      cg.addColorStop(0.6, 'rgba(10,8,20,0.12)');
      cg.addColorStop(1, 'rgba(2,2,6,0.7)');
      ctx.fillStyle = cg;
      ctx.fillRect(0,0,w,h);
    };

    const tick = (now: number) => {
      const dt = Math.min(40, now - lastTime);
      lastTime = now;
      update(dt);
      draw();
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      // Fallback background color in case canvas fails to load momentarily
      style={{ background: '#020617' }} 
    />
  );
};

export default StarBackground;