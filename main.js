// Hero slideshow
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const bars = [...document.querySelectorAll('.hero-progress i')];
  let i = 0;
  const show = n => {
    slides.forEach((s, k) => s.classList.toggle('is-active', k === n));
    bars.forEach((b, k) => { b.classList.remove('on'); void b.offsetWidth; if (k === n) b.classList.add('on'); });
  };
  show(0);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => { i = (i + 1) % slides.length; show(i); }, 6000);
  }
})();

// Scroll reveal
(() => {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

document.getElementById('yr').textContent = new Date().getFullYear();