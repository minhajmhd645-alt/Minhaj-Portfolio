document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [...document.querySelectorAll('.section-motion-canvas')];
  const activeScenes = new Set();
  const pointers = new WeakMap();
  const dimensions = new WeakMap();
  let pageVisible = !document.hidden;

  const draw = (canvas, time = 0) => {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const { width: w, height: h } = dimensions.get(canvas) || { width: canvas.clientWidth, height: canvas.clientHeight };
    if (!w || !h) return;
    const scene = canvas.dataset.motionScene;
    const pointer = pointers.get(canvas) || { x: .5, y: .5 };
    const t = reducedMotion.matches ? 0 : time * .001;
    ctx.clearRect(0, 0, w, h);

    if (scene === 'coding') {
      const columns = Math.max(10, Math.floor(w / 72));
      const glyphs = ['01', '[]', '</>', '=>', '&&', '{ }', '::', '()'];
      ctx.font = '11px ui-monospace, SFMono-Regular, Consolas, monospace';
      for (let col = 0; col < columns; col++) {
        const x = (col + .5) * w / columns;
        const offset = reducedMotion.matches ? 0 : (t * (13 + col % 4 * 2) + col * 47) % (h + 90);
        for (let row = 0; row < 7; row++) {
          const y = (row * 64 + offset) % (h + 50) - 30;
          const alpha = .08 + ((col * 7 + row * 3) % 6) * .018;
          ctx.fillStyle = col % 5 === 0 ? `rgba(133,157,255,${alpha})` : `rgba(180,151,255,${alpha})`;
          ctx.fillText(glyphs[(col + row * 3) % glyphs.length], x, y);
        }
      }
      const scanY = reducedMotion.matches ? h * .54 : (t * 24) % (h + 180) - 90;
      const glow = ctx.createLinearGradient(0, scanY - 35, 0, scanY + 35);
      glow.addColorStop(0, 'rgba(117,95,255,0)'); glow.addColorStop(.5, 'rgba(117,95,255,.10)'); glow.addColorStop(1, 'rgba(117,95,255,0)');
      ctx.fillStyle = glow; ctx.fillRect(0, scanY - 35, w, 70);
      ctx.strokeStyle = 'rgba(130,153,255,.13)'; ctx.lineWidth = 1;
      for (let i = 0; i < 9; i++) {
        const x = (i + .5) * w / 9, y = h * (.18 + (i % 4) * .16);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (pointer.x - .5) * 24, y + (pointer.y - .5) * 16); ctx.stroke();
      }
      return;
    }

    if (scene === 'skills') {
      const labels = ['PROGRAMMING', 'FRONTEND', 'BACKEND', 'ANDROID', 'DATABASES', 'TOOLS', 'FOUNDATIONS'];
      const cx = w * .5, cy = h * .5, rx = Math.min(w * .43, 360), ry = Math.min(h * .36, 102);
      const nodes = labels.map((label, index) => {
        const angle = -Math.PI / 2 + index * Math.PI * 2 / labels.length + (reducedMotion.matches ? 0 : t * .035);
        return { label, x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
      });
      ctx.font = '9px ui-monospace, SFMono-Regular, Consolas, monospace';
      nodes.forEach((node, i) => {
        const distance = Math.hypot(node.x - pointer.x * w, node.y - pointer.y * h);
        const hot = distance < 100;
        const hue = i % 2 ? '170,147,255' : '106,183,255';
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `rgba(${hue},${hot ? .48 : .17})`; ctx.lineWidth = hot ? 1.5 : 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(node.x, node.y, hot ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hue},${hot ? .96 : .62})`; ctx.shadowBlur = hot ? 15 : 7; ctx.shadowColor = `rgb(${hue})`; ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(220,215,239,${hot ? .95 : .66})`;
        ctx.textAlign = node.x > w * .74 ? 'right' : 'left';
        ctx.fillText(node.label, node.x + (node.x > w * .74 ? -8 : 8), node.y - 5);
      });
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = 'rgba(206,183,255,.94)'; ctx.shadowBlur = 18; ctx.shadowColor = '#9472ff'; ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(235,228,255,.82)'; ctx.textAlign = 'center'; ctx.fillText('SOFTWARE PRACTICE', cx, cy + 19); ctx.textAlign = 'start';
      return;
    }

    if (scene === 'network') {
      const nodes = Array.from({ length: 30 }, (_, i) => {
        const angle = i * 2.399963 + (reducedMotion.matches ? 0 : t * .022);
        const ring = .16 + ((i * 7) % 10) / 14;
        const pulse = reducedMotion.matches ? 0 : Math.sin(t * .48 + i) * 3;
        return { x: w * (.5 + Math.cos(angle) * ring) + (pointer.x - .5) * 8, y: h * (.5 + Math.sin(angle) * ring * .67) + (pointer.y - .5) * 8, r: 1.5 + (i % 3) * .35 + pulse * .08 };
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 105) continue;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(144,133,255,${.14 * (1 - distance / 105)})`; ctx.lineWidth = .8; ctx.stroke();
        }
      }
      nodes.forEach((node, i) => {
        ctx.beginPath(); ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? 'rgba(132,199,255,.82)' : 'rgba(184,157,255,.72)'; ctx.shadowBlur = 10; ctx.shadowColor = '#8768ff'; ctx.fill(); ctx.shadowBlur = 0;
      });
    }
  };

  const resizeScene = canvas => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimensions.set(canvas, { width: rect.width, height: rect.height });
  };
  const paintFrame = (canvas, time) => {
    draw(canvas, time);
  };
  const startScene = canvas => {
    if (canvas._motionFrame) cancelAnimationFrame(canvas._motionFrame);
    if (!dimensions.has(canvas)) resizeScene(canvas);
    const tick = time => {
      paintFrame(canvas, time);
      if (activeScenes.has(canvas) && pageVisible && !reducedMotion.matches) canvas._motionFrame = requestAnimationFrame(tick);
      else canvas._motionFrame = 0;
    };
    paintFrame(canvas, performance.now());
    if (activeScenes.has(canvas) && pageVisible && !reducedMotion.matches) canvas._motionFrame = requestAnimationFrame(tick);
  };

  scenes.forEach(canvas => {
    pointers.set(canvas, { x: .5, y: .5 });
    const section = canvas.closest('section');
    section?.addEventListener('pointermove', event => {
      const rect = section.getBoundingClientRect();
      pointers.set(canvas, { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height });
    }, { passive: true });
    if (section) new IntersectionObserver(([entry]) => {
      section.classList.toggle('motion-in-view', entry.isIntersecting);
      if (entry.isIntersecting) activeScenes.add(canvas); else activeScenes.delete(canvas);
      startScene(canvas);
    }, { threshold: .02 }).observe(section);
  });
  document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; scenes.forEach(startScene); });
  reducedMotion.addEventListener?.('change', () => scenes.forEach(startScene));
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(entries => entries.forEach(({ target }) => {
    resizeScene(target);
    if (activeScenes.has(target)) startScene(target);
  })) : null;
  scenes.forEach(canvas => resizeObserver?.observe(canvas));
  window.addEventListener('resize', () => scenes.forEach(canvas => { resizeScene(canvas); if (activeScenes.has(canvas)) startScene(canvas); }), { passive: true });
});
