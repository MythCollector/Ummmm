export const moduleData = {
  icon: "📝",
  title: "Notes",
  desc: "Quickly jot down ideas and reminders."
};

export function initModule(container, options = {}) {
  // If card → add buttons
  if (!options.fullscreen) {
    const actions = document.createElement("div");
    actions.className = "module-actions";
    actions.style.marginTop = "10px";
    actions.style.display = "flex";
    actions.style.gap = "6px";

    const fullscreenBtn = document.createElement("button");
    fullscreenBtn.textContent = "⛶ Fullscreen";

   

    actions.appendChild(fullscreenBtn);
    actions.appendChild(newTabBtn);
    container.appendChild(actions);

    fullscreenBtn.addEventListener("click", () => {
      openFullscreen(container);
    });

 

    return;
  }

  // Fullscreen container
  openFullscreen(container);
}

// Fullscreen helper
function openFullscreen(container) {
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.background = "var(--bg)";
  container.style.zIndex = 99999;
  container.style.padding = "40px";
  container.style.overflow = "auto";
  container.style.display = "flex";
  container.style.flexDirection = "column";

  // Toolbar
  const toolbar = document.createElement("div");
  toolbar.style.display = "flex";
  toolbar.style.justifyContent = "flex-end";
  toolbar.style.gap = "12px";
  toolbar.style.marginBottom = "12px";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close ❌";
  closeBtn.addEventListener("click", () => container.remove());

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save 💾";
  saveBtn.addEventListener("click", () => {
    const textarea = container.querySelector("textarea");
    if (textarea) localStorage.setItem("coderplaza-notes", textarea.value);
    // Use toast if exists
    const evt = new Event("notesSaved");
    document.dispatchEvent(evt);
  });

  toolbar.appendChild(saveBtn);
  toolbar.appendChild(closeBtn);
  container.appendChild(toolbar);

  // Textarea
  const textarea = document.createElement("textarea");
  textarea.style.width = "100%";
  textarea.style.flex = "1";
  textarea.style.padding = "12px";
  textarea.style.borderRadius = "8px";
  textarea.style.border = "1px solid #ccc";
  textarea.style.background = "var(--bg)";
  textarea.style.color = "var(--text)";
  textarea.style.resize = "none";
  textarea.placeholder = "Write notes here...";
  container.appendChild(textarea);

  // Load saved notes
  const saved = localStorage.getItem("coderplaza-notes");
  if (saved) textarea.value = saved;

  // Append to body if not already
  if (!container.parentElement || container.parentElement !== document.body) {
    document.body.appendChild(container);
  }
}
