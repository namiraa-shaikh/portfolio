import {
  animateCounters,
  setupCursor,
  setupNavHighlight,
  setupParallax,
  setupParticles,
  setupRevealObserver,
  setupRevealStagger,
  setupSkillsMarquee,
  setupTestimonials,
  setupTiltCards,
} from "./features/effects.js";
import { setInitialTheme, setupThemeToggle } from "./features/theme.js";

function buildAppContext() {
  return {
    root: document.documentElement,
    themeToggle: document.getElementById("theme-toggle"),
    revealNodes: document.querySelectorAll(".reveal"),
    parallaxNodes: document.querySelectorAll("[data-parallax]"),
    tiltCards: document.querySelectorAll(".tilt"),
    counters: document.querySelectorAll("[data-counter]"),
    footerYear: document.getElementById("year"),
    quoteElement: document.getElementById("testimonial-quote"),
    authorElement: document.getElementById("testimonial-author"),
  };
}

function init() {
  const context = buildAppContext();

  setInitialTheme(context.root);
  setupRevealStagger();
  setupRevealObserver(context.revealNodes);
  setupParallax(context.parallaxNodes);
  setupTiltCards(context.tiltCards);
  animateCounters(context.counters);
  setupCursor();
  setupSkillsMarquee();
  setupNavHighlight();
  setupTestimonials(context.quoteElement, context.authorElement);
  setupParticles();
  setupThemeToggle(context.root, context.themeToggle);

  if (context.footerYear) {
    context.footerYear.textContent = String(new Date().getFullYear());
  }
}

init();
