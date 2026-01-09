const root = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
const thumb = toggleBtn.querySelector(".toggle-thumb");

// read saved theme or system preference
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = savedTheme || (prefersDark ? "dark" : "light");
root.dataset.theme = theme;
thumb.textContent = theme === "dark" ? "☀️" : "🌙";

// toggle on click
toggleBtn.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  thumb.textContent = theme === "dark" ? "☀️" : "🌙";

  // Save for other modules or new tabs
  localStorage.setItem("coderplaza-theme", theme); // ✅ use `theme` instead of `next`
});
