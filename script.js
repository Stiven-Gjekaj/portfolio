// Theme handling
(function themeInit() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    if (saved === 'light') root.setAttribute('data-theme', 'light');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }
})();

function updateThemeButtons() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const label = isLight ? '🌙' : '☀️';
  document.querySelectorAll('#themeToggle').forEach((btn) => {
    btn.textContent = isLight ? '🌙' : '🌞';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  });
}

function setTheme(next) {
  const root = document.documentElement;
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeButtons();
}

// Initialize toggles
(() => {
  updateThemeButtons();
  document.querySelectorAll('#themeToggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  });
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
(function mobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });

  // Close menu when clicking a nav link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
    }
  });
})();

// Animated background on scroll
(function animatedBackground() {
  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    document.body.style.setProperty('--scroll-progress', `${progress}%`);
  };

  const updateMousePosition = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
  };

  // Throttle mouse movement updates for performance
  let mouseTicking = false;
  window.addEventListener('mousemove', (e) => {
    if (!mouseTicking) {
      window.requestAnimationFrame(() => {
        updateMousePosition(e);
        mouseTicking = false;
      });
      mouseTicking = true;
    }
  });

  // Update scroll progress
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Initialize
  updateScrollProgress();
})();

// Floating theme toggle enhancements (drag + persist)
(function enhanceThemeToggle() {
  const btn = document.querySelector('#themeToggle.floating-toggle');
  if (!btn) return;

  // Ensure correct icon initially
  updateThemeButtons();

  // Restore saved position
  try {
    const saved = JSON.parse(localStorage.getItem('themeTogglePos') || 'null');
    if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
      btn.style.left = saved.left + 'px';
      btn.style.top = saved.top + 'px';
      btn.style.bottom = 'auto';
      btn.style.right = 'auto';
    }
  } catch {}

  // Pointer-based dragging (works for mouse and touch)
  let dragging = false;
  let startX = 0, startY = 0, startLeft = 0, startTop = 0;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  btn.addEventListener('pointerdown', (e) => {
    dragging = true;
    btn.setPointerCapture?.(e.pointerId);
    const r = btn.getBoundingClientRect();
    startX = e.clientX; startY = e.clientY;
    startLeft = r.left; startTop = r.top;
    e.preventDefault();
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const nl = clamp(startLeft + dx, 6, window.innerWidth - btn.offsetWidth - 6);
    const nt = clamp(startTop + dy, 6, window.innerHeight - btn.offsetHeight - 6);
    btn.style.left = nl + 'px';
    btn.style.top = nt + 'px';
    btn.style.bottom = 'auto';
    btn.style.right = 'auto';
  });
  window.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    btn.releasePointerCapture?.(e.pointerId);
    const r = btn.getBoundingClientRect();
    localStorage.setItem('themeTogglePos', JSON.stringify({ left: r.left, top: r.top }));
  });
})();

// Device detection (adds data-device="mobile" or "desktop" on <html>)
(function deviceFlag() {
  const setFlag = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || (navigator.maxTouchPoints > 0 && window.innerWidth <= 900);
    document.documentElement.setAttribute('data-device', isMobile ? 'mobile' : 'desktop');
  };
  setFlag();
  window.addEventListener('resize', setFlag, { passive: true });
  window.addEventListener('orientationchange', setFlag, { passive: true });
})();

// Projects data & render
const projects = [
  {
    title: 'SmartSpend',
    description:
      'Full-stack expense tracking with CSV import, receipt OCR scanning, and ML-powered categorization.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/SmartSpend',
  },
  {
    title: 'Knot Labs',
    description: 'Modular social media sandbox with media classification, face recognition, and full-text search.',
    tags: ['Python', 'Machine Learning', 'FAISS', 'Search'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/Knot-Labs',
  },
  {
    title: 'GoQuorra',
    description: 'Lightweight, distributed job queue for Go with reliability, observability, and Prometheus metrics.',
    tags: ['Go', 'PostgreSQL', 'gRPC', 'Redis', 'Docker'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/GoQuorra',
  },
  {
    title: 'RogueBit',
    description: 'Turn-based roguelike dungeon crawler with procedural generation and terminal-style graphics.',
    tags: ['C#', '.NET 8', 'Game', 'Roguelike'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/RogueBit',
  },
  {
    title: 'AI Connect 4',
    description: 'Connect 4 with Minimax + alpha-beta pruning; hints, undo, and adjustable difficulty.',
    tags: ['JavaScript', 'Game', 'AI', 'Minimax'],
    demo: 'https://stiven-gjekaj.github.io/AI-Connect4/',
    repo: 'https://github.com/Stiven-Gjekaj/AI-Connect4',
  },
  {
    title: 'Wattpad4You',
    description:
      'CLI tool that downloads public Wattpad stories and compiles them into polished PDFs with bundled fonts.',
    tags: ['Python', 'CLI', 'PDF'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/Wattpad4You',
  },
];

function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach((p) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags.map((t) => `<span class=\"tag\">${t}</span>`).join('')}</div>
      <div class="links">
        ${p.demo ? `<a href=\"${p.demo}\" target=\"_blank\" rel=\"noreferrer\">Live &nearrow;</a>` : ''}
        ${p.repo ? `<a href=\"${p.repo}\" target=\"_blank\" rel=\"noreferrer\">Code &nearrow;</a>` : ''}
      </div>
    `;
    grid.appendChild(el);
  });
}

renderProjects();
