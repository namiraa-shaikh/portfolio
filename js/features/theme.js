export function setInitialTheme(rootElement) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    rootElement.setAttribute("data-theme", savedTheme);
  }
}

export function setupThemeToggle(rootElement, toggleButton) {
  if (!toggleButton) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    const current = rootElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";

    rootElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}
