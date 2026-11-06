/** Tiny, dependency-free JavaScript pointer effect for desktop call-to-action buttons. */
export function setupMagneticButtons() {
  const media = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!media.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const elements = [...document.querySelectorAll('[data-magnetic]')];
  const listeners = elements.map((element) => {
    const move = (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.setProperty('--magnetic-x', `${x * 0.12}px`);
      element.style.setProperty('--magnetic-y', `${y * 0.12}px`);
    };
    const leave = () => {
      element.style.setProperty('--magnetic-x', '0px');
      element.style.setProperty('--magnetic-y', '0px');
    };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); };
  });
  return () => listeners.forEach((remove) => remove());
}
