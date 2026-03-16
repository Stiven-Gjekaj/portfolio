// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact dropdown toggle
(function contactDropdown() {
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
  const dropdownMenu = document.querySelector(".nav-dropdown-menu");

  if (!dropdownToggle || !dropdownMenu) return;

  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = dropdownToggle.getAttribute("aria-expanded") === "true";
    dropdownToggle.setAttribute("aria-expanded", !isExpanded);
    dropdownMenu.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !dropdownToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.remove("active");
    }
  });
})();

// Animated background on scroll
(function animatedBackground() {
  const updateScrollProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    document.body.style.setProperty("--scroll-progress", `${progress}%`);
  };

  const updateMousePosition = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty("--mouse-x", `${x}%`);
    document.body.style.setProperty("--mouse-y", `${y}%`);
  };

  // Throttle mouse movement updates for performance
  let mouseTicking = false;
  window.addEventListener("mousemove", (e) => {
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
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  // Initialize
  updateScrollProgress();
})();

// Device detection (adds data-device="mobile" or "desktop" on <html>)
(function deviceFlag() {
  const setFlag = () => {
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      (navigator.maxTouchPoints > 0 && window.innerWidth <= 900);
    document.documentElement.setAttribute(
      "data-device",
      isMobile ? "mobile" : "desktop"
    );
  };
  setFlag();
  window.addEventListener("resize", setFlag, { passive: true });
  window.addEventListener("orientationchange", setFlag, { passive: true });
})();

// Projects data & render
const projects = [
  {
    title: "MiruScript",
    description:
      "A minimalist programming language that compiles to C, featuring clean syntax, recursive functions, and a complete compiler pipeline built from scratch in C11.",
    tags: ["C", "Compiler", "Custom Language", "Open Source"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/MiruScript",
  },
  {
    title: "GoQuorra",
    description:
      "Lightweight, distributed job queue for Go built for reliability, observability, and scale — with Prometheus metrics, PostgreSQL persistence, and gRPC-based workers.",
    tags: ["Go", "PostgreSQL", "gRPC", "Redis", "Docker"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/GoQuorra",
  },
  {
    title: "WorkDelegateN1ko",
    description:
      "AI-powered technical documentation generator that uses Claude AI to automatically produce clear, structured docs from codebases — saving hours of manual writing.",
    tags: ["Python", "Claude AI", "AI", "Documentation", "Automation"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/WorkDelegateN1ko",
  },
  {
    title: "SmartSpend",
    description:
      "Full-stack expense tracker with CSV import, receipt OCR scanning, manual entry, and ML-powered automatic categorization.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "OCR"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/SmartSpend",
  },
  {
    title: "Knot Labs",
    description:
      "A complete social media sandbox platform built for experimentation — featuring ML-powered search, media classification, face recognition, and full-text indexing with FAISS.",
    tags: ["Python", "Machine Learning", "FAISS", "Search", "Full-Stack"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/Knot-Labs",
  },
  {
    title: "Telemetra",
    description:
      "Real-time Twitch analytics platform that ingests live events, detects anomalies, and renders live visualizations across a React frontend and Python backend.",
    tags: ["React", "Python", "Apache", "PostgreSQL", "Real-Time"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/Telemetra",
  },
  {
    title: "InertiaX",
    description:
      "High-fidelity 2D car physics simulator combining advanced physics modeling with real-time graphics — built in C++ with OpenGL and cross-platform CMake support.",
    tags: ["C++", "Simulator", "OpenGL", "Math & Physics", "CMake", "Multi-Platform"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/InertiaX",
  },
  {
    title: "PacketBrawl",
    description:
      "Fast-paced, turn-based LAN multiplayer battler where 2–6 players connect over TCP/IP, choose unique hero classes, and battle in real-time with a terminal UI.",
    tags: ["C#", "Multiplayer", "Game", "TCP/IP", "Terminal UI", ".NET"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/PacketBrawl",
  },
  {
    title: "CardVault",
    description:
      "ID card generation platform with admin approval workflows, PDF generation with QR codes, email notifications, and role-based access control.",
    tags: ["HTML", "JavaScript", "PDF", "QR Codes", "Workflows", "Role-Based Access"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/CardVault",
  },
  {
    title: "background-remover",
    description:
      "In-browser background removal tool powered by MediaPipe Selfie Segmentation. Runs entirely client-side — no uploads, no server, no privacy concerns.",
    tags: ["JavaScript", "MediaPipe", "ML", "Canvas API", "Client-Side"],
    demo: "https://stiven-gjekaj.github.io/background-remover/",
    repo: "https://github.com/Stiven-Gjekaj/background-remover",
  },
  {
    title: "AI Connect 4",
    description:
      "Connect 4 with an unbeatable AI opponent using Minimax + alpha-beta pruning. Features move hints, undo, and adjustable difficulty.",
    tags: ["JavaScript", "Game", "AI", "Minimax", "Alpha-Beta Pruning"],
    demo: "https://stiven-gjekaj.github.io/AI-Connect4/",
    repo: "https://github.com/Stiven-Gjekaj/AI-Connect4",
  },
  {
    title: "RogueBit",
    description:
      "Turn-based roguelike dungeon crawler with procedural level generation, terminal-style graphics via SadConsole, and GoRogue-powered pathfinding.",
    tags: ["C#", ".NET 8", "Game", "Roguelike", "Procedural Generation"],
    demo: "",
    repo: "https://github.com/Stiven-Gjekaj/RogueBit",
  },
  {
    title: "Art Museum",
    description:
      "A sleek single-page viewer powered by The Met Collection API, with modern light/dark gradients, smooth animations, and strong accessibility throughout.",
    tags: ["JavaScript", "API Integration", "Accessibility", "Single-Page App"],
    demo: "https://stiven-gjekaj.github.io/art-museum/",
    repo: "https://github.com/Stiven-Gjekaj/art-museum",
  },
  {
    title: "Invox",
    description:
      "Modern invoice maker built entirely in vanilla JavaScript with no framework dependencies — runs fully in the browser with PDF export.",
    tags: ["JavaScript", "PDF", "Vanilla JS", "Client-Side"],
    demo: "https://stiven-gjekaj.github.io/Invox/",
    repo: "https://github.com/Stiven-Gjekaj/Invox",
  },
];

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((p) => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">${p.tags
        .map((t) => `<span class=\"tag\">${t}</span>`)
        .join("")}</div>
      <div class="links">
        ${
          p.demo
            ? `<a href=\"${p.demo}\" target=\"_blank\" rel=\"noreferrer\">Live &nearrow;</a>`
            : ""
        }
        ${
          p.repo
            ? `<a href=\"${p.repo}\" target=\"_blank\" rel=\"noreferrer\">Code &nearrow;</a>`
            : ""
        }
      </div>
    `;
    grid.appendChild(el);
  });
}

renderProjects();
