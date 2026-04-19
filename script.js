const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const revealNodes = document.querySelectorAll(".reveal");
const parallaxNodes = document.querySelectorAll("[data-parallax]");
const tiltCards = document.querySelectorAll(".tilt");
const counters = document.querySelectorAll("[data-counter]");
const footerYear = document.getElementById("year");

const testimonials = [
  {
    quote:
      '"Namiraa consistently connects technical execution with creative thinking, which made our team faster and more aligned."',
    author: "Team Lead, Digital Upgrowth",
  },
  {
    quote:
      '"She handled website iterations quickly and responded to feedback with clear, practical improvements."',
    author: "Project Manager, MadQuick",
  },
  {
    quote:
      '"Her learning agility and ownership stood out from day one of the internship."',
    author: "Mentor, 366 DigitX",
  },
];

const quoteEl = document.getElementById("testimonial-quote");
const authorEl = document.getElementById("testimonial-author");

function setInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  }
}

function toggleTheme() {
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

function setupRevealStagger() {
  const groups = document.querySelectorAll(
    ".projects-grid, .timeline, .skills-grid, .education-grid, .contact-grid, .hero-cta"
  );

  groups.forEach((group) => {
    const items = group.querySelectorAll(".reveal");
    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 90}ms`);
    });
  });
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupParallax() {
  let latestY = window.scrollY;
  let ticking = false;

  const render = () => {
    parallaxNodes.forEach((node) => {
      const depth = Number(node.dataset.parallax || 0.08);
      node.style.transform = `translate3d(0, ${latestY * depth * -0.13}px, 0)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    latestY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(render);
      ticking = true;
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupTiltCards() {
  tiltCards.forEach((card) => {
    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    };

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 11;
      const rotateX = (0.5 - y / rect.height) * 11;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    });

    card.addEventListener("mouseleave", reset);
  });
}

function animateCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const node = entry.target;
        const target = Number(node.dataset.counter || 0);
        const duration = 1100;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          node.textContent = String(Math.floor(progress * target));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        requestAnimationFrame(step);

        const bar = node.closest(".skill")?.querySelector(".bar span");
        if (bar) {
          bar.style.width = bar.style.getPropertyValue("--value");
        }

        observer.unobserve(node);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((node) => observer.observe(node));
}

function setupCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!dot || !ring || !finePointer) {
    return;
  }

  let x = 0;
  let y = 0;
  let rx = 0;
  let ry = 0;

  const show = () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  };

  const hide = () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  };

  const onMove = (event) => {
    x = event.clientX;
    y = event.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    show();
  };

  const loop = () => {
    rx += (x - rx) * 0.16;
    ry += (y - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };

  const interactive = document.querySelectorAll(
    "a, button, input, textarea, .project-card, .portrait-card img, .about-photo img"
  );

  interactive.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
      if (node.matches("img, .project-card")) {
        document.body.classList.add("cursor-media");
      }
    });

    node.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover", "cursor-media");
    });
  });

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseout", hide);
  loop();
}

function setupSkillsMarquee() {
  const tracks = document.querySelectorAll(".marquee-track");

  tracks.forEach((track) => {
    if (track.dataset.marqueeReady === "true") {
      return;
    }

    track.innerHTML += track.innerHTML;
    track.dataset.marqueeReady = "true";
  });
}

function setupNavHighlight() {
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { threshold: 0.46 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupTestimonials() {
  if (!quoteEl || !authorEl) {
    return;
  }

  let index = 0;
  setInterval(() => {
    index = (index + 1) % testimonials.length;
    quoteEl.style.opacity = "0";
    authorEl.style.opacity = "0";

    setTimeout(() => {
      quoteEl.textContent = testimonials[index].quote;
      authorEl.textContent = testimonials[index].author;
      quoteEl.style.opacity = "1";
      authorEl.style.opacity = "1";
    }, 220);
  }, 4600);
}

function setupParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  let width = 0;
  let height = 0;
  const count = 34;
  const particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.5,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      });
    }
  }

  function drawLinks(point) {
    particles.forEach((target) => {
      const dx = point.x - target.x;
      const dy = point.y - target.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 140) {
        return;
      }

      context.strokeStyle = `rgba(116, 248, 195, ${0.14 - distance / 1200})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(target.x, target.y);
      context.stroke();
    });
  }

  function render() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      context.fillStyle = "rgba(116, 248, 195, 0.34)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fill();

      drawLinks(particle);
    });

    requestAnimationFrame(render);
  }

  resize();
  createParticles();
  render();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

function init() {
  setInitialTheme();
  setupRevealStagger();
  setupRevealObserver();
  setupParallax();
  setupTiltCards();
  animateCounters();
  setupCursor();
  setupSkillsMarquee();
  setupNavHighlight();
  setupTestimonials();
  setupParticles();

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }
}

init();
