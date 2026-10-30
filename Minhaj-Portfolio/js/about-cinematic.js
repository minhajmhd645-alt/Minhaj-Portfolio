document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#about');
  const canvas = section?.querySelector('.about-cinema-canvas');
  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const particles = Array.from({ length: 38 }, (_, i) => ({
    x: ((i * 127 + 19) % 997) / 997,
    y: ((i * 211 + 73) % 991) / 991,
    radius: .7 + (i % 4) * .42,
    speed: .09 + (i % 6) * .018,
    phase: i * 1.618
  }));

  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = false;
  let pageVisible = !document.hidden;
  let pointer = { x: .5, y: .5 };

  const roundedRect = (context, x, y, w, h, r) => {
    context.beginPath();
    context.roundRect(x, y, w, h, r);
  };

  const monitor = (x, y, w, h, time, variant = 0) => {
    const inset = Math.max(5, Math.min(w, h) * .035);
    const header = Math.max(10, h * .095);
    const drift = reducedMotion.matches ? 0 : time * (.008 + variant * .002);

    ctx.save();
    ctx.shadowBlur = 28;
    ctx.shadowColor = variant ? 'rgba(87,151,255,.25)' : 'rgba(151,91,255,.28)';
    roundedRect(ctx, x, y, w, h, 9);
    ctx.fillStyle = 'rgba(11,13,31,.96)';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(188,192,255,.45)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const sx = x + inset;
    const sy = y + inset;
    const sw = w - inset * 2;
    const sh = h - inset * 2;
    roundedRect(ctx, sx, sy, sw, sh, 5);
    ctx.save();
    ctx.clip();
    const screen = ctx.createLinearGradient(sx, sy, sx + sw, sy + sh);
    screen.addColorStop(0, '#0a1329');
    screen.addColorStop(.58, '#10142d');
    screen.addColorStop(1, '#15102c');
    ctx.fillStyle = screen;
    ctx.fillRect(sx, sy, sw, sh);

    ctx.fillStyle = 'rgba(192,199,255,.08)';
    ctx.fillRect(sx, sy, sw, header);
    for (let dot = 0; dot < 3; dot++) {
      ctx.beginPath();
      ctx.arc(sx + 8 + dot * 7, sy + header * .5, 1.65, 0, Math.PI * 2);
      ctx.fillStyle = ['#ff8fa0', '#ffd18c', '#8ee6c0'][dot];
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(199,204,235,.5)';
    ctx.fillRect(sx + sw * .35, sy + header * .42, sw * .28, Math.max(1, header * .12));

    const gutter = Math.max(13, sw * .105);
    ctx.fillStyle = 'rgba(6,10,23,.66)';
    ctx.fillRect(sx, sy + header, gutter, sh - header);
    const rowHeight = Math.max(5, Math.min(10, h * .048));
    const available = sh - header - 8;
    const rows = Math.max(4, Math.floor(available / rowHeight));
    const scroll = reducedMotion.matches ? 0 : (drift % rowHeight);
    for (let row = 0; row <= rows; row++) {
      const lineY = sy + header + 8 + row * rowHeight - scroll;
      if (lineY < sy + header || lineY > sy + sh - 3) continue;
      const indent = ((row + variant * 3) % 4) * Math.max(4, sw * .035);
      const lineX = sx + gutter + 7 + indent;
      const maxWidth = Math.max(3, sx + sw - lineX - 8);
      const length = maxWidth * (.25 + ((row * 17 + variant * 11) % 61) / 100);
      const hue = (row + variant) % 5;
      const color = ['rgba(127,179,255,.8)', 'rgba(199,151,255,.78)', 'rgba(118,217,207,.72)', 'rgba(230,194,143,.65)', 'rgba(185,192,224,.62)'][hue];
      ctx.fillStyle = 'rgba(158,169,205,.22)';
      ctx.fillRect(sx + 5, lineY, 4, 1.4);
      ctx.fillStyle = color;
      ctx.fillRect(lineX, lineY, length, Math.max(1.2, rowHeight * .18));
      if (maxWidth > 54 && row % 3 !== 1) {
        ctx.fillStyle = 'rgba(175,183,219,.3)';
        ctx.fillRect(lineX + length + 4, lineY, Math.min(maxWidth - length - 4, maxWidth * .17), Math.max(1, rowHeight * .12));
      }
    }

    const beamY = reducedMotion.matches ? sy + sh * .62 : sy + header + ((time * .035 + variant * 22) % Math.max(1, sh - header));
    const beam = ctx.createLinearGradient(0, beamY - 14, 0, beamY + 14);
    beam.addColorStop(0, 'rgba(114,160,255,0)');
    beam.addColorStop(.5, 'rgba(120,145,255,.12)');
    beam.addColorStop(1, 'rgba(114,160,255,0)');
    ctx.fillStyle = beam;
    ctx.fillRect(sx, beamY - 14, sw, 28);

    const cursorOn = reducedMotion.matches || Math.sin(time * .006 + variant) > -.15;
    if (cursorOn) {
      const cursorX = sx + gutter + 8 + ((time * .017) % Math.max(12, sw * .48));
      const cursorY = sy + sh - 8;
      ctx.fillStyle = 'rgba(172,205,255,.9)';
      ctx.fillRect(cursorX, cursorY, 4, 1.8);
    }
    ctx.restore();

    const stemY = y + h;
    ctx.strokeStyle = 'rgba(166,173,226,.26)';
    ctx.lineWidth = Math.max(1, w * .006);
    ctx.beginPath();
    ctx.moveTo(x + w * .5, stemY);
    ctx.lineTo(x + w * .5, stemY + h * .14);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x + w * .5, stemY + h * .15, w * .18, h * .035, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(105,119,184,.23)';
    ctx.fill();
    ctx.restore();
  };

  const draw = time => {
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const small = width < 640;
    const motionX = reducedMotion.matches ? 0 : (pointer.x - .5) * 7;
    const motionY = reducedMotion.matches ? 0 : (pointer.y - .5) * 5;

    const ambient = ctx.createRadialGradient(width * .76, height * .45, 0, width * .76, height * .45, width * .58);
    ambient.addColorStop(0, 'rgba(58,101,213,.20)');
    ambient.addColorStop(.54, 'rgba(115,57,195,.10)');
    ambient.addColorStop(1, 'rgba(24,19,70,0)');
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, width, height);

    const primary = small
      ? { x: width * .2 + motionX, y: height * .1 + motionY, w: width * .83, h: height * .34 }
      : { x: width * .52 + motionX, y: height * .1 + motionY, w: width * .52, h: height * .53 };
    const secondary = small
      ? { x: width * .58 - motionX * .4, y: height * .015, w: width * .41, h: height * .18 }
      : { x: width * .72 - motionX * .4, y: height * .015, w: width * .34, h: height * .27 };
    monitor(secondary.x, secondary.y, secondary.w, secondary.h, time, 1);
    monitor(primary.x, primary.y, primary.w, primary.h, time, 0);

    const deskY = small ? height * .54 : height * .77;
    const deskW = small ? width * .67 : width * .43;
    const deskX = small ? width * .31 : width * .55;
    const deskH = Math.max(22, height * (small ? .07 : .075));
    const deskGlow = ctx.createLinearGradient(deskX, deskY, deskX + deskW, deskY + deskH);
    deskGlow.addColorStop(0, 'rgba(29,42,79,.52)');
    deskGlow.addColorStop(.5, 'rgba(54,46,103,.45)');
    deskGlow.addColorStop(1, 'rgba(26,50,86,.24)');
    ctx.fillStyle = deskGlow;
    ctx.beginPath();
    ctx.moveTo(deskX, deskY);
    ctx.lineTo(deskX + deskW, deskY - height * .022);
    ctx.lineTo(deskX + deskW * .96, deskY + deskH);
    ctx.lineTo(deskX + deskW * .04, deskY + deskH);
    ctx.closePath();
    ctx.fill();

    const keyCount = small ? 13 : 22;
    const keyWidth = deskW / (keyCount + 2);
    for (let i = 0; i < keyCount; i++) {
      const x = deskX + keyWidth * (.8 + i);
      const y = deskY + deskH * (.25 + ((i * 7) % 3) * .1);
      const light = .09 + (Math.sin(time * .0015 + i * .7) + 1) * .055;
      ctx.fillStyle = `rgba(141,172,255,${reducedMotion.matches ? .13 : light})`;
      ctx.fillRect(x, y, keyWidth * .58, Math.max(1.2, deskH * .075));
    }

    const seconds = reducedMotion.matches ? 0 : time * .001;
    particles.forEach((particle, i) => {
      const x = particle.x * width + Math.sin(seconds * particle.speed + particle.phase) * 9 + motionX;
      const y = ((particle.y * height - seconds * (8 + i % 4 * 2)) % height + height) % height + motionY;
      const pulse = reducedMotion.matches ? .35 : .18 + (Math.sin(seconds * 1.8 + particle.phase) + 1) * .13;
      ctx.beginPath();
      ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = i % 4 ? `rgba(180,181,255,${pulse})` : `rgba(115,199,255,${pulse})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = i % 4 ? 'rgba(137,106,255,.6)' : 'rgba(94,189,255,.65)';
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    const lightX = width * (.75 + Math.sin(seconds * .36) * .08);
    const light = ctx.createRadialGradient(lightX, height * .67, 0, lightX, height * .67, width * .21);
    light.addColorStop(0, 'rgba(115,100,255,.11)');
    light.addColorStop(1, 'rgba(115,100,255,0)');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, width, height);
  };

  const resize = () => {
    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (visible) draw(performance.now());
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
  const start = () => {
    stop();
    if (!visible || !pageVisible) return;
    const tick = time => {
      draw(time);
      if (!reducedMotion.matches && visible && pageVisible) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    draw(performance.now());
    if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
  };

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        section.classList.toggle('about-scene-active', visible);
        if (visible) { resize(); start(); } else stop();
      }, { threshold: .04 })
    : null;
  if (observer) observer.observe(section);
  else { visible = true; resize(); start(); }

  section.addEventListener('pointermove', event => {
    const rect = section.getBoundingClientRect();
    pointer = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }, { passive: true });
  section.addEventListener('pointerleave', () => { pointer = { x: .5, y: .5 }; }, { passive: true });
  document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; start(); });
  reducedMotion.addEventListener?.('change', start);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(section);
  window.addEventListener('resize', resize, { passive: true });
});
