document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const collect = root => {
    const items = root?.matches?.('.reveal') ? [root] : [];
    return [...items, ...(root || document).querySelectorAll('.reveal')];
  };
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
    window.refreshReveals = root => collect(root || document).forEach(element => element.classList.add('is-visible'));
    return;
  }
  document.documentElement.classList.add('motion-ready');

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    let heroRevealIndex = 0;
    window.refreshReveals = (root = document) => {
      collect(root).forEach(element => {
        if (element.dataset.revealBound) return;
        element.dataset.revealBound = 'true';
        const delay = element.closest('.hero') ? heroRevealIndex++ * .075 : 0;
        gsap.fromTo(element, { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1, y: 0, duration: .72, delay,
          ease: 'power2.out', clearProps: 'transform',
          scrollTrigger: { trigger: element, start: 'top 91%', once: true },
          onComplete: () => element.classList.add('is-visible')
        });
      });
      ScrollTrigger.refresh();
    };
    window.refreshReveals();
    return;
  }

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
  window.refreshReveals = (root = document) => collect(root).forEach(element => {
    if (element.classList.contains('is-visible') || element.dataset.revealBound) return;
    element.dataset.revealBound = 'true';
    observer.observe(element);
  });
  window.refreshReveals();
});
