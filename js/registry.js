document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("modules-grid");
  const reloadBtn = document.getElementById("reload-modules");

 const registry = [
  "./modules/notes/notes.js",
  "./modules/bookmarklets/bookmarklets.js",
  "./modules/BlobeVM/BlobeVM.js",
  "./modules/rythm game/module.js",
];


  async function renderModules() {
    grid.innerHTML = "";

    for (const path of registry) {
      try {
        const mod = await import(path);
        const data = mod.moduleData;

        const card = document.createElement("div");
        card.className = "module-card";
        card.tabIndex = 0;

        card.innerHTML = `
          <div class="module-icon">${data.icon}</div>
          <div class="module-title">${data.title}</div>
          <div class="module-desc">${data.desc}</div>
        `;

        // Clicking the card opens the module in a new tab
        card.addEventListener("click", () => {
          window.open(data.entry, "_blank");
        });

        // Keyboard accessibility (Enter key)
        card.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            window.open(data.entry, "_blank");
          }
        });

        grid.appendChild(card);

      } catch (err) {
        console.error("Failed to load module:", path, err);
      }
    }
  }

  reloadBtn?.addEventListener("click", renderModules);
  renderModules();
});
