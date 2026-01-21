export const moduleData = {
  id: "blobevm",
  icon: "🖥️",
  title: "BlobVM",
  desc: "Run your offline virtual machine.",
  entry: "https://miniature-fortnight-5gjwwxqjj77g3p65p-3000.app.github.dev/" // <- full URL with port
};


export function mount(container) {
  container.innerHTML = "";
  const card = document.createElement("div");
  card.className = "module-card";
  card.innerHTML = `
    <div class="module-icon">${moduleData.icon}</div>
    <div class="module-title">${moduleData.title}</div>
    <div class="module-desc">${moduleData.desc}</div>
  `;
  container.appendChild(card);

  card.addEventListener("click", () => {
    window.open(moduleData.entry, "_blank");
  });
}
