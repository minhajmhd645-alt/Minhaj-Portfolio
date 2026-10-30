document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-workspace-video');
  const motionButton = document.querySelector('.motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let motionOptIn = !reducedMotion.matches;
  let heroVisible = true;
  hero?.classList.add('motion-active');

  const updateVideo = () => {
    if (!video) return;
    if (document.hidden || !heroVisible || userPaused || (reducedMotion.matches && !motionOptIn)) {
      video.pause();
      return;
    }
    const play = video.play();
    if (play?.catch) play.catch(() => {});
  };
  const syncControl = () => {
    if (!motionButton) return;
    const paused = userPaused || (reducedMotion.matches && !motionOptIn);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
    motionButton.innerHTML = `<i data-lucide="${paused ? 'play' : 'pause'}"></i><span>${paused ? 'PLAY MOTION' : 'PAUSE MOTION'}</span>`;
    if (window.lucide) window.lucide.createIcons({ root: motionButton });
    hero?.classList.toggle('motion-paused', paused);
  };
  motionButton?.addEventListener('click', () => {
    const paused = userPaused || (reducedMotion.matches && !motionOptIn);
    if (paused) { userPaused = false; motionOptIn = true; }
    else userPaused = true;
    syncControl();
    updateVideo();
  });
  video?.addEventListener('error', () => hero?.classList.add('video-unavailable'));
  document.addEventListener('visibilitychange', updateVideo);
  reducedMotion.addEventListener?.('change', () => { syncControl(); updateVideo(); });
  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; hero.classList.toggle('motion-active', heroVisible); updateVideo(); }, { threshold: 0.05 }).observe(hero);
  }
  syncControl();
  updateVideo();

  const atmosphere = document.querySelector('.hero-atmosphere');
  const earth = document.querySelector('.earth-canvas');
  if (!atmosphere || !earth) return;
  const particleCtx = atmosphere.getContext('2d', { alpha: true });
  const earthCtx = earth.getContext('2d', { alpha: true });
  const count = window.matchMedia('(max-width: 767px)').matches ? 26 : 46;
  const motes = Array.from({ length: count }, (_, i) => ({
    x: ((i * 83 + 31) % 997) / 997, y: ((i * 157 + 19) % 991) / 991,
    r: .55 + ((i * 13) % 11) / 9, phase: (i * 1.71) % (Math.PI * 2), speed: .16 + ((i * 7) % 10) / 65
  }));
  const cities = Array.from({ length: 300 }, (_, i) => {
    const angle = i * 2.399963229728653;
    const radius = Math.sqrt((i + .5) / 300) * .91;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, size: .35 + ((i * 17) % 10) / 10 };
  });
  let pw = 0, ph = 0, ew = 0, eh = 0, frame = 0, pointerX = 0, pointerY = 0, active = true;
  const resizeCanvas = (canvas, ctx) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return [rect.width, rect.height];
  };
  const resize = () => {
    [pw, ph] = resizeCanvas(atmosphere, particleCtx);
    [ew, eh] = resizeCanvas(earth, earthCtx);
    draw(0);
  };
  const drawParticles = time => {
    particleCtx.clearRect(0, 0, pw, ph);
    motes.forEach((m, i) => {
      const drift = reducedMotion.matches ? 0 : time * .001 * m.speed;
      const x = m.x * pw + Math.sin(drift + m.phase) * 10 + pointerX * 8;
      const y = ((m.y * ph - drift * 13) % ph + ph) % ph + pointerY * 5;
      const alpha = .13 + (Math.sin((reducedMotion.matches ? 0 : time * .0012) + m.phase) + 1) * .13;
      particleCtx.beginPath(); particleCtx.arc(x, y, m.r, 0, Math.PI * 2);
      particleCtx.fillStyle = i % 4 === 0 ? `rgba(154,190,255,${alpha})` : `rgba(205,190,255,${alpha})`;
      particleCtx.shadowBlur = 9; particleCtx.shadowColor = 'rgba(130,116,255,.5)'; particleCtx.fill();
    });
  };
  const drawEarth = time => {
    const ctx = earthCtx, w = ew, h = eh;
    ctx.clearRect(0, 0, w, h);
    const cx = w * .5, cy = h * .5, r = Math.min(w, h) * .405;
    const glow = ctx.createRadialGradient(cx, cy - r * .8, r * .15, cx, cy, r * 1.2);
    glow.addColorStop(0, 'rgba(20,55,108,.04)'); glow.addColorStop(.68, 'rgba(25,70,130,.14)'); glow.addColorStop(.91, 'rgba(62,153,255,.38)'); glow.addColorStop(.97, 'rgba(113,202,255,.74)'); glow.addColorStop(1, 'rgba(80,110,255,0)');
    ctx.beginPath(); ctx.arc(cx, cy, r * 1.16, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
    const ocean = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    ocean.addColorStop(0, '#071327'); ocean.addColorStop(.5, '#0b2241'); ocean.addColorStop(1, '#030b1d');
    ctx.fillStyle = ocean; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    const continents = ctx.createRadialGradient(cx - r * .28, cy - r * .2, r * .08, cx - r * .1, cy - r * .12, r * .85);
    continents.addColorStop(0, 'rgba(54,111,154,.28)'); continents.addColorStop(1, 'rgba(13,38,72,0)');
    ctx.fillStyle = continents; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.strokeStyle = 'rgba(110,178,255,.2)'; ctx.lineWidth = .8;
    for (const factor of [-.65, -.32, 0, .32, .65]) {
      const width = r * Math.sqrt(1 - factor * factor);
      ctx.beginPath(); ctx.ellipse(cx, cy + factor * r, r, width * .22, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, cy, width, r, 0, 0, Math.PI * 2); ctx.stroke();
    }
    cities.forEach((p, i) => {
      const x = cx + p.x * r, y = cy + p.y * r;
      if (Math.hypot(x - cx, y - cy) > r * .9) return;
      const pulse = reducedMotion.matches ? .55 : .32 + .35 * (Math.sin(time * .0015 + i * .61) + 1) / 2;
      ctx.beginPath(); ctx.arc(x, y, p.size * .7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(166,207,255,${pulse})`; ctx.fill();
    });
    const shadow = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    shadow.addColorStop(0, 'rgba(0,0,0,.4)'); shadow.addColorStop(.52, 'rgba(0,0,0,0)'); shadow.addColorStop(1, 'rgba(0,0,0,.2)');
    ctx.fillStyle = shadow; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.restore();

    ctx.save(); ctx.globalCompositeOperation = 'screen';
    const seconds = reducedMotion.matches ? 0 : time * .001;
    for (let j = 0; j < 4; j++) {
      const y = cy + r * (.06 + j * .025);
      const orbitW = r * (1.04 + j * .09), orbitH = r * (.23 + j * .02);
      const start = Math.PI * (1.12 + j * .012) + seconds * (.18 + j * .025);
      const end = Math.PI * (1.88 + j * .012) + seconds * (.18 + j * .025);
      ctx.beginPath(); ctx.ellipse(cx, y, orbitW, orbitH, -.1, start, end);
      ctx.strokeStyle = j % 2 ? 'rgba(156,120,255,.5)' : 'rgba(91,190,255,.68)';
      ctx.lineWidth = j === 0 ? 2 : 1.2; ctx.shadowBlur = 15; ctx.shadowColor = '#72aaff'; ctx.stroke();
      for (let k = 0; k < 2; k++) {
        const t = ((seconds * (.12 + j * .025) + k * .5 + j * .17) % 1 + 1) % 1;
        const angle = start + (end - start) * t;
        const x = cx + Math.cos(angle) * orbitW * Math.cos(-.1) - Math.sin(angle) * orbitH * Math.sin(-.1);
        const yy = y + Math.cos(angle) * orbitW * Math.sin(-.1) + Math.sin(angle) * orbitH * Math.cos(-.1);
        const radius = k === 0 ? 2.2 : 1.3;
        ctx.beginPath(); ctx.arc(x, yy, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(185,224,255,.98)'; ctx.shadowBlur = 17; ctx.shadowColor = '#6dbaff'; ctx.fill();
      }
    }
    ctx.restore();
  };
  const draw = time => { drawParticles(time); drawEarth(time); };
  const tick = time => {
    draw(time);
    if (active && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick);
  };
  const start = () => {
    cancelAnimationFrame(frame);
    draw(performance.now());
    if (active && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(tick);
  };
  hero?.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - .5;
    pointerY = (event.clientY - rect.top) / rect.height - .5;
  }, { passive: true });
  hero?.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; }, { passive: true });
  window.addEventListener('resize', () => { resize(); start(); }, { passive: true });
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener?.('change', start);
  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(([entry]) => { active = entry.isIntersecting; start(); }, { threshold: 0.02 }).observe(hero);
  }
  resize(); start();
});
