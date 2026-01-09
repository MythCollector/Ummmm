
document.documentElement.dataset.theme =
  localStorage.getItem("theme") || "light";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const saved = localStorage.getItem("theme");

document.documentElement.dataset.theme =
  saved || (prefersDark ? "dark" : "light");
