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
    btn.textContent = label;
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
    title: 'AI Connect 4',
    description: 'Connect 4 with Minimax + alpha-beta; hints, undo, difficulty.',
    tags: ['JavaScript', 'Game', 'AI', 'Minimax'],
    demo: 'https://stiven-gjekaj.github.io/AI-Connect4/',
    repo: 'https://github.com/Stiven-Gjekaj/AI-Connect4',
  },
  {
    title: 'Nation Incremental',
    description: 'A browser-based incremental game. Grow your nation and progress over time.',
    tags: ['JavaScript', 'Game'],
    demo: 'https://stiven-gjekaj.github.io/nation-incremental/',
    repo: 'https://github.com/stiven-gjekaj/nation-incremental',
  },
  {
    title: 'Background Remover',
    description: 'Client-side background remover using MediaPipe; fast and private.',
    tags: ['JavaScript', 'HTML/CSS', 'MediaPipe'],
    demo: 'https://stiven-gjekaj.github.io/background-remover/',
    repo: 'https://github.com/stiven-gjekaj/background-remover',
  },
  {
    title: 'Artwork Museum',
    description: 'Sleek, accessible gallery powered by The Met Collection API.',
    tags: ['JavaScript', 'API', 'The Met'],
    demo: 'https://stiven-gjekaj.github.io/art-museum/',
    repo: 'https://github.com/stiven-gjekaj/art-museum',
  },
  {
    title: 'Race Blitz',
    description: 'Race-Blitz: lightweight racing sim manager.',
    tags: ['JavaScript', 'Game', 'Simulation'],
    demo: 'https://stiven-gjekaj.github.io/Race-Blitz/',
    repo: 'https://github.com/stiven-gjekaj/Race-Blitz',
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

// Contact form (front-end only)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  if (!name || !email || !message) {
    note.textContent = 'Please fill out all fields.';
    return;
  }

  // Open the user's email client with a prefilled message
  const to = 'stivenagostingjekaj@gmail.com';
  const subject = `Portfolio contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Opening your email app...';
  window.location.href = href;
});

