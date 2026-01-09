document.addEventListener("DOMContentLoaded", () => {
  const modulesGrid = document.getElementById("modules-grid");
  const reloadBtn = document.getElementById("reload-modules");

  const modulesRegistry = [
    "./modules/notes.js",
    "./modules/pomodoro.js"
  ];

  function showNotification(message, duration = 2000, icon = "✅") {
    const container = document.getElementById("notification-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => container.removeChild(toast), 250);
    }, duration);
  }

  async function renderModules() {
    modulesGrid.innerHTML = "";

    for (const file of modulesRegistry) {
      try {
        const mod = await import(file);
        const data = mod.moduleData;

        const card = document.createElement("div");
        card.className = "module-card";
        card.innerHTML = `
          <div class="module-icon">${data.icon}</div>
          <div class="module-title">${data.title}</div>
          <div class="module-desc">${data.desc}</div>
          <div class="module-actions">
            <button class="open-fullscreen">⛶ Fullscreen</button>
           
          </div>
        `;
        modulesGrid.appendChild(card);

        // Fullscreen button
        card.querySelector(".open-fullscreen").addEventListener("click", () => {
          const overlay = document.createElement("div");
          overlay.className = "module-fullscreen-overlay";
          overlay.style.position = "fixed";
          overlay.style.top = 0;
          overlay.style.left = 0;
          overlay.style.width = "100vw";
          overlay.style.height = "100vh";
          overlay.style.background = "var(--bg)";
          overlay.style.zIndex = 99999;
          overlay.style.padding = "40px";
          overlay.style.overflow = "auto";

          // Toolbar
          const toolbar = document.createElement("div");
          toolbar.className = "toolbar";

          

          overlay.appendChild(toolbar);

          // Insert module content
          if (mod.initModule) mod.initModule(overlay, { fullscreen: true });

          document.body.appendChild(overlay);
        });

  

        // Initialize module normally (if it wants default card behavior)
        if (mod.initModule) mod.initModule(card);

      } catch (err) {
        console.error("Error loading module:", file, err);
      }
    }

    showNotification("All modules loaded");
  }

  renderModules();

  reloadBtn.addEventListener("click", renderModules);
});
