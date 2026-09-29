// Scroll "bloom" reveal.
// [data-bloom="open"]  — opens outward from a small circle while scaling up (images, quote).
// [data-bloom="rise"]  — rises and settles (text blocks, cards).
// Elements that share a row are staggered left to right. Content stays visible
// without JS or when the visitor prefers reduced motion.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var EASE = 'cubic-bezier(0.16,0.84,0.28,1)';
  var STAGGER_MS = 130;

  function setup() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-bloom]'));
    if (!nodes.length) return;

    var rows = new Map();
    nodes.forEach(function (el) {
      var mode = el.getAttribute('data-bloom');
      var row = Math.round((el.getBoundingClientRect().top + window.scrollY) / 40);
      var idx = rows.get(row) || 0;
      rows.set(row, idx + 1);
      var delay = idx * STAGGER_MS + 'ms';

      el.style.willChange = 'transform, opacity, clip-path';
      el.style.transition =
        'transform 1150ms ' + EASE + ' ' + delay +
        ', opacity 900ms ease ' + delay +
        ', clip-path 1250ms ' + EASE + ' ' + delay;
      el.style.opacity = '0';
      if (mode === 'open') {
        el.style.transform = 'scale(0.9)';
        el.style.clipPath = 'circle(26% at 50% 62%)';
      } else {
        el.style.transform = 'translateY(26px) scale(0.97)';
      }
    });

    var io;
    function reveal(el) {
      if (el.dataset.bloomDone) return;
      el.dataset.bloomDone = '1';
      el.style.opacity = '1';
      el.style.transform = 'none';
      if (el.getAttribute('data-bloom') === 'open') el.style.clipPath = 'circle(90% at 50% 50%)';
      io.unobserve(el);
      setTimeout(function () {
        el.style.clipPath = '';
        el.style.willChange = '';
      }, 1600);
    }

    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Also reveal anything already scrolled past (e.g. after a jump link or reload mid-page).
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) reveal(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
