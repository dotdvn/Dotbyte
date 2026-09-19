import { useEffect } from 'react';

// Animate only when visible; keep content readable when motion is disabled.
export function useStudioMotion(paused: boolean) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.studio-page');
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let observer: IntersectionObserver | undefined;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.section-index, .studio-heading, .service-card, .project-matcher, .benefit-grid article, .plan-card, .studio-philosophy, .contact-grid > div, .contact-form'));
    const configure = () => {
      observer?.disconnect();
      items.forEach(item => item.classList.remove('reveal-ready', 'reveal-in'));
      if (paused || preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('reveal-in');
          observer?.unobserve(entry.target);
        });
      }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
      items.forEach(item => {
        const siblings = Array.from(item.parentElement?.children || []);
        item.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(item), 3) * 75}ms`);
        item.classList.add('reveal-ready');
        observer?.observe(item);
      });
    };
    configure();
    preference.addEventListener('change', configure);
    let scrollFrame = 0, pointerFrame = 0;
    const progress = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty('--reading-progress', String(height > 0 ? window.scrollY / height : 0));
      });
    };
    const reset = (card: HTMLElement | null) => {
      card?.style.removeProperty('--tilt-x'); card?.style.removeProperty('--tilt-y');
      card?.style.removeProperty('--spot-x'); card?.style.removeProperty('--spot-y');
    };
    const hero = root.querySelector<HTMLElement>('.studio-hero');
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('motion-offscreen', !entry.isIntersecting));
    }, { rootMargin: '100px' });
    if (hero) visibility.observe(hero);
    let active: HTMLElement | null = null;
    const move = (event: PointerEvent) => {
      if (paused || preference.matches || !finePointer.matches) return;
      const inHero = (event.target as Element).closest('.studio-hero');
      if (inHero && hero) {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`);
        hero.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`);
      }
      const target = (event.target as Element).closest<HTMLElement>('.service-card, .plan-card');
      if (active !== target) { reset(active); active = target; }
      cancelAnimationFrame(pointerFrame);
      if (!target) return;
      pointerFrame = requestAnimationFrame(() => {
        const bounds = target.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        target.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
        target.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
        target.style.setProperty('--spot-x', `${x * 100}%`);
        target.style.setProperty('--spot-y', `${y * 100}%`);
      });
    };
    const leave = () => { cancelAnimationFrame(pointerFrame); reset(active); active = null; };
    const focus = (event: FocusEvent) => {
      const item = (event.target as Element).closest('.reveal-ready');
      item?.classList.add('reveal-in');
    };
    const rippleTimers = new Set<ReturnType<typeof setTimeout>>();
    const rippleNodes = new Set<HTMLElement>();
    const ripple = (event: MouseEvent) => {
      if (paused || preference.matches) return;
      const button = (event.target as Element).closest<HTMLElement>('.studio-button, .hero-mode-list button, .circuit-controls button');
      if (!button) return;
      const bounds = button.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.className = 'click-ripple';
      dot.setAttribute('aria-hidden', 'true');
      dot.style.left = `${event.detail ? event.clientX - bounds.left : bounds.width / 2}px`;
      dot.style.top = `${event.detail ? event.clientY - bounds.top : bounds.height / 2}px`;
      button.append(dot); rippleNodes.add(dot);
      const timer = setTimeout(() => {dot.remove(); rippleNodes.delete(dot); rippleTimers.delete(timer);}, 650);
      rippleTimers.add(timer);
    };
    root.addEventListener('click', ripple);
    window.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress);
    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerleave', leave);
    root.addEventListener('focusin', focus);
    progress();
    return () => {
      observer?.disconnect();
      visibility.disconnect();
      hero?.classList.remove('motion-offscreen');
      root.removeEventListener('click', ripple);
      rippleTimers.forEach(clearTimeout);
      rippleNodes.forEach(node => node.remove());
      preference.removeEventListener('change', configure);
      window.removeEventListener('scroll', progress);
      window.removeEventListener('resize', progress);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
      root.removeEventListener('focusin', focus);
      cancelAnimationFrame(scrollFrame); leave();
      items.forEach(item => item.classList.remove('reveal-ready', 'reveal-in'));
    };
  }, [paused]);
}
