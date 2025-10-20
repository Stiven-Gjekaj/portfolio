// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact dropdown toggle
(function contactDropdown() {
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');

  if (!dropdownToggle || !dropdownMenu) return;

  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
    dropdownToggle.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.classList.remove('active');
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
  {
    title: "Telemetra",
    description:
      'A real-time Twitch analytics platform that processes live events, detects anomalies, and provides visualizations.',
    tags: ['React','Python','Apache','PostgreSQL'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/Telemetra',
  },
  {
    title: "MiruScript",
    description:
      'A minimalist programming language that compiles to C, featuring clean syntax, and a compiler pipeline built from scratch in C11.',
    tags: ['C','Compiler','Custom Language','Open Source'],
    demo: '',
    repo: 'https://github.com/Stiven-Gjekaj/MiruScript',
  }
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
