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

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const root = document.documentElement;
  const isLight = root.getAttribute('data-theme') === 'light';
  root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
  document.getElementById('themeToggle').textContent = isLight ? '🌙' : '☀️';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Projects data & render
const projects = [
  {
    title: 'Project One',
    description: 'A concise description of what this project does and why it matters.',
    tags: ['TypeScript', 'React', 'Vite'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'Project Two',
    description: 'Highlights: performance, accessibility, clean APIs, and great UX.',
    tags: ['Node.js', 'Express', 'REST'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'Project Three',
    description: 'Details: problem, solution, and the outcome or metrics.',
    tags: ['Next.js', 'Tailwind', 'SSR'],
    demo: '#',
    repo: '#',
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
      <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="links">
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Live ↗</a>` : ''}
        ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noreferrer">Code ↗</a>` : ''}
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
  note.textContent = 'Opening your email app…';
  window.location.href = href;
});
