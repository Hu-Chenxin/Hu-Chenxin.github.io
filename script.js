/* 夜空扫描粒子 + 扫描线效果
   目标：低 CPU、视觉酷、可定制（粒子数量/扫描速度/线宽）
   在 GitHub Pages 上直接可用（无外部库）
*/

(() => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d', { alpha: true });

  let DPR = Math.max(1, window.devicePixelRatio || 1);
  let w = 0, h = 0;

  function resize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // 粒子配置（可调）
  const PARTICLE_COUNT_BASE = 90; // 基准数，视屏幕大小而定
  let particles = [];

  function makeParticles() {
    particles = [];
    const density = Math.min(260, Math.floor((w * h) / 22000)); // 屏幕越大，粒子更多
    const count = Math.max(40, Math.floor(PARTICLE_COUNT_BASE * (density / 90)));
    for (let i = 0; i < count; i++) {
      const p = {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.6) + 0.6,
        baseAlpha: 0.08 + Math.random() * 0.18,
        drift: (Math.random() - 0.5) * 0.2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
      };
      particles.push(p);
    }
  }
  makeParticles();
  window.addEventListener('resize', () => {
    makeParticles();
  });

  // 扫描线参数
  let angle = 0; // 弧度，扫描线方向
  const ANGLE_SPEED = 0.0065; // 转速（可调）
  const LINE_WIDTH = Math.min(220, Math.max(80, Math.min(w, h) * 0.18)); // 扫描线“宽度”(像素)

  // 主循环
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(40, now - last);
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(tick);
  }

  function update(dt) {
    const t = dt / 16.666;
    // 角度缓慢旋转
    angle += ANGLE_SPEED * t;
    // 粒子轻微移动
    for (const p of particles) {
      p.x += p.vx * t * 1.8;
      p.y += p.vy * t * 1.8;
      p.x += Math.sin((p.y + now * 0.0002) * 0.0001) * p.drift;
      // 边界循环
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
    }
  }

  function draw() {
    // 清屏（透明淡渐变）
    ctx.clearRect(0, 0, w, h);

    // 背景暗色雾层（微微渐变）
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(4,6,16,0.6)');
    g.addColorStop(1, 'rgba(2,3,8,0.75)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // 画星点（弱）
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(180,200,255, ${p.baseAlpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 计算扫描线相关向量（过中心的直线）
    const cx = w / 2;
    const cy = h / 2;
    const vx = Math.cos(angle);
    const vy = Math.sin(angle);

    // 扫描颜色渐变（中心近扫描区更亮）
    const sweepGrad = ctx.createLinearGradient(cx - vx * w, cy - vy * h, cx + vx * w, cy + vy * h);
    sweepGrad.addColorStop(0.0, 'rgba(0,0,0,0)');
    sweepGrad.addColorStop(0.45, 'rgba(127,124,255,0.03)');
    sweepGrad.addColorStop(0.5, 'rgba(0,224,255,0.08)');
    sweepGrad.addColorStop(0.55, 'rgba(127,124,255,0.06)');
    sweepGrad.addColorStop(1.0, 'rgba(0,0,0,0)');

    // 放一层轻微的扫描带（整体氛围）
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // 高亮靠近扫描线的粒子（产生“扫描点亮”效果）
    for (const p of particles) {
      // 把点映射到以中心为原点的坐标
      const dx = p.x - cx;
      const dy = p.y - cy;
      // 垂直距离到扫描线（点到直线距离公式）
      const perp = Math.abs((-vy) * dx + (vx) * dy); // 由于向量正交，比例系数省略
      // 投影长度（用于距离中心判断亮度衰减）
      const proj = dx * vx + dy * vy;
      const distCenter = Math.hypot(dx, dy);

      // 亮度权重：靠近扫描线且在可视半径内更亮
      const width = LINE_WIDTH;
      const inBand = Math.max(0, 1 - (perp / width));
      const nearCenter = Math.max(0, 1 - (distCenter / Math.max(w, h)));
      const intensity = Math.pow(inBand, 1.8) * (0.7 + 0.3 * nearCenter);

      if (intensity > 0.01) {
        ctx.beginPath();
        // 颜色偏向青蓝-紫罗兰（带霓虹感）
        const a = Math.min(0.9, p.baseAlpha * 6 * intensity);
        ctx.fillStyle = `rgba(${Math.floor(110 + 145 * intensity)}, ${Math.floor(140 + 90 * intensity)}, ${Math.floor(255)}, ${a})`;
        // 画一个稍大的光晕
        ctx.shadowBlur = 8 + 18 * intensity;
        ctx.shadowColor = `rgba(100,160,255,${Math.min(0.85, a)})`;
        ctx.arc(p.x, p.y, p.r + 1.6 * intensity * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // 轻微中心光晕（制造深邃感）
    const cg = ctx.createRadialGradient(cx, cy, Math.min(w,h)*0.05, cx, cy, Math.max(w,h));
    cg.addColorStop(0, 'rgba(40,30,55,0.00)');
    cg.addColorStop(0.6, 'rgba(10,8,20,0.12)');
    cg.addColorStop(1, 'rgba(2,2,6,0.7)');
    ctx.fillStyle = cg;
    ctx.fillRect(0,0,w,h);
  }

  // 启动动画
  requestAnimationFrame(tick);
})();
