import AOS from 'aos';
import 'aos/dist/aos.css';

export function initAOS() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: prefersReduced, // fully disable, not just shorten
  });
}