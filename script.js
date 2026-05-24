// ---------- install tab switcher ----------
document.querySelectorAll('.install-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.target;
    document.querySelectorAll('.install-tab').forEach(t => t.classList.toggle('active', t === tab));
    document.querySelectorAll('.install-block').forEach(b => {
      b.classList.toggle('hidden', b.dataset.id !== id);
    });
  });
});

// ---------- copy buttons ----------
document.querySelectorAll('.copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1500);
    } catch (e) {
      btn.textContent = 'Press Ctrl+C';
    }
  });
});

// ---------- subtle animated graph background ----------
(function bgGraph() {
  const canvas = document.getElementById('bgGraph');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    initNodes();
  }

  function initNodes() {
    const count = Math.max(28, Math.min(58, Math.floor((innerWidth * innerHeight) / 28000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      vy: (Math.random() - 0.5) * 0.18 * dpr,
      r: (1.3 + Math.random() * 1.6) * dpr,
      hue: Math.random() < 0.55 ? 260 : 188 // purple or cyan
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    const linkDist = 160 * dpr;

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.28;
          ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 70%, 65%, ${alpha})`;
          ctx.lineWidth = 0.8 * dpr;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const n of nodes) {
      ctx.fillStyle = `hsla(${n.hue}, 85%, 70%, 0.85)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  step();
})();

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.step, .tool, .feature, .cli-card, .arch-box, .compare-col, .steps-num li').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});
