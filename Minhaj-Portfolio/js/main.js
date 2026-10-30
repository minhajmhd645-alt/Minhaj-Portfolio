document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#nav-menu');
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    menu?.classList.toggle('show', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
  });
  document.querySelectorAll('#nav-menu a').forEach(link => link.addEventListener('click', () => {
    menu?.classList.remove('show'); toggle?.setAttribute('aria-expanded', 'false'); toggle?.setAttribute('aria-label', 'Open navigation'); document.body.classList.remove('menu-open');
  }));
  document.querySelectorAll('[data-project-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-project-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    renderProjects(button.dataset.projectFilter);
  }));
  document.querySelectorAll('[data-skill-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-skill-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    window.renderSkills(button.dataset.skillFilter);
  }));
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
  const year = document.getElementById('current-year'); if (year) year.textContent = new Date().getFullYear();
  const clock = document.getElementById('sl-time');
  if (clock) {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const updateClock = () => { clock.textContent = `SLST ${formatter.format(new Date())}`; };
    updateClock(); window.setInterval(updateClock, 1000);
  }
  const hero = document.querySelector('.hero');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      hero.style.setProperty('--hero-pointer-x', `${x * -7}px`);
      hero.style.setProperty('--hero-pointer-y', `${y * -7}px`);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { hero.style.removeProperty('--hero-pointer-x'); hero.style.removeProperty('--hero-pointer-y'); }, { passive: true });
  }
});
