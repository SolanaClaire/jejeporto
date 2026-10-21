  // Scale the 1440px design to fit narrower viewports
  const stage = document.getElementById('stage');
  const wrap = document.getElementById('wrap');
  const W = 1440, H = 3505;
  const nav = document.getElementById('nav');
  let scale = 1;
  function fit() {
    scale = Math.min(1, window.innerWidth / W);
    const offset = Math.max(0, (window.innerWidth - W) / 2);
    stage.style.transform = 'scale(' + scale + ')';
    stage.style.left = offset + 'px';
    nav.style.transform = 'scale(' + scale + ')';
    nav.style.left = offset + 'px';
    nav.style.top = (11 * scale) + 'px';
    wrap.style.height = (H * scale) + 'px';
  }
  window.addEventListener('resize', fit); fit();

  // Carousel arrows
  const cards = document.getElementById('cards');
  const step = 293.2 + 18;
  document.getElementById('next').addEventListener('click', () => cards.scrollBy({left: step}));
  document.getElementById('prev').addEventListener('click', () => cards.scrollBy({left: -step}));

  // Drag-to-scroll (mouse). Touch and trackpads already scroll natively.
  let down = false, startX = 0, startLeft = 0, moved = false;
  cards.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = cards.scrollLeft;
    cards.classList.add('dragging'); cards.setPointerCapture(e.pointerId);
  });
  cards.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = (e.clientX - startX) / scale;
    if (Math.abs(dx) > 3) moved = true;
    cards.scrollLeft = startLeft - dx;
  });
  const endDrag = () => { down = false; cards.classList.remove('dragging'); };
  cards.addEventListener('pointerup', endDrag);
  cards.addEventListener('pointercancel', endDrag);
  cards.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);

  // Click animation (ripple + pop) for the pink buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) / scale * 2;
      const dot = document.createElement('span');
      dot.className = 'ripple';
      dot.style.width = dot.style.height = size + 'px';
      dot.style.left = ((e.clientX - r.left) / scale - size / 2) + 'px';
      dot.style.top = ((e.clientY - r.top) / scale - size / 2) + 'px';
      btn.appendChild(dot);
      dot.addEventListener('animationend', () => dot.remove());
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
    });
  });

  // Subtle reveal-in animations (on load for the nav/hero, on scroll for the rest)
  (function () {
    const items = [];
    const add = (sel, opts = {}) => document.querySelectorAll(sel).forEach((el, i) => items.push({ el, i, ...opts }));

    add('.logo', { d: 0.0, y: '-14px' });
    add('.pill', { d: 0.08, y: '-14px' });
    add('#nav .contact', { d: 0.16, y: '-14px' });
    add('#hero h1', { d: 0.1 });
    add('#hero p', { d: 0.22 });
    add('#shapes', { d: 0.1 });
    add('#carousel', { d: 0 });
    add('#cards .card', { step: 0.08, cap: 4, d: 0.15 });
    add('#banner', { d: 0, y: '0px' });
    add('#banner-title', { d: 0.1 });
    add('#banner-text', { d: 0.2 });
    add('#banner-btn', { d: 0.3 });
    add('#yap', { d: 0 });
    add('#tl-line', { cls: 'line', d: 0 });
    // timeline rows: right-side rows slide in from the right, left-side from the left
    [['2467','2518','2537.98','2527', 24],['2734','2792','2811.98','2793', -24],['3004','3063','3082.98','3070', 24]].forEach(([yTop, star, dot, txt, x], r) => {
      const at = top => [...document.querySelectorAll('#stage > *')].filter(e => e.id !== 'tl-line' && e.style.top === top + 'px');
      at(yTop).forEach(e => items.push({ el: e, d: 0.1, x: x + 'px', y: '0px' }));
      at(txt).forEach(e => items.push({ el: e, d: 0.2, x: x + 'px', y: '0px' }));
      at(star).forEach(e => items.push({ el: e, cls: 'zoom', d: 0 }));
      at(dot).forEach(e => items.push({ el: e, cls: 'zoom', d: 0.15 }));
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        el.classList.add('in');
        el.addEventListener('animationend', function done(e) {
          if (e.target !== el) return;
          el.removeEventListener('animationend', done);
          el.classList.remove('reveal', 'in', 'zoom', 'line');   // hand control back to hover/click styles
          el.style.removeProperty('--d'); el.style.removeProperty('--x'); el.style.removeProperty('--y');
        });
      });
    }, { threshold: 0.12 });

    items.forEach(({ el, i, d = 0, step = 0, cap = 0, cls, x, y }) => {
      el.classList.add('reveal');
      if (cls) el.classList.add(cls);
      el.style.setProperty('--d', (d + (step ? Math.min(i, cap) * step : 0)) + 's');
      if (x) el.style.setProperty('--x', x);
      if (y) el.style.setProperty('--y', y);
      io.observe(el);
    });
  })();
