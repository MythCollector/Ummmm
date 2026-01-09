export const moduleData = {
  id: "bookmarklets",
  icon: "🔖",
  title: "Bookmarklet Runner",
  desc: "Save JS snippets and run them on any site via bookmarklets.",
  entry: "./js/modules/bookmarklets/index.html"
};

export function mount(container, options = {}) {
  container.innerHTML = "";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.height = "100%";
  container.style.gap = "12px";

  // Load saved snippets
  const key = "coderplaza-bookmarklets";
  let snippets = JSON.parse(localStorage.getItem(key) || "[]");

  // Add new snippet section
  const addSection = document.createElement("div");
  addSection.style.display = "flex";
  addSection.style.flexDirection = "column";
  addSection.style.gap = "6px";

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Snippet Name";
  titleInput.style.padding = "8px";
  titleInput.style.borderRadius = "6px";

  const codeInput = document.createElement("textarea");
  codeInput.placeholder = "Enter JS code here...";
  codeInput.style.height = "80px";
  codeInput.style.padding = "8px";
  codeInput.style.borderRadius = "6px";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Save Snippet 💾";
  addBtn.style.padding = "8px 12px";
  addBtn.style.borderRadius = "6px";

  addSection.append(titleInput, codeInput, addBtn);
  container.appendChild(addSection);

  // List of bookmarklets
  const list = document.createElement("div");
  list.style.display = "flex";
  list.style.flexDirection = "column";
  list.style.gap = "6px";
  list.style.overflowY = "auto";
  list.style.flex = "1";
  container.appendChild(list);

  function saveSnippets() {
    localStorage.setItem(key, JSON.stringify(snippets));
    renderList();
  }

  function renderList() {
    list.innerHTML = "";
    snippets.forEach((s, i) => {
      const snippetDiv = document.createElement("div");
      snippetDiv.style.display = "flex";
      snippetDiv.style.alignItems = "center";
      snippetDiv.style.justifyContent = "space-between";
      snippetDiv.style.background = "var(--card-bg)";
      snippetDiv.style.padding = "6px 8px";
      snippetDiv.style.borderRadius = "6px";

      const link = document.createElement("a");
      link.href = `javascript:${encodeURIComponent(s.code)}`;
      link.textContent = s.title;
      link.title = "Drag to bookmarks or click to run";
      link.style.textDecoration = "none";
      link.style.color = "var(--text)";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.onclick = () => {
        snippets.splice(i, 1);
        saveSnippets();
      };

      snippetDiv.append(link, deleteBtn);
      list.appendChild(snippetDiv);
    });
  }

  addBtn.onclick = () => {
    const title = titleInput.value.trim();
    const code = codeInput.value.trim();
    if (!title || !code) return;
    snippets.push({ title, code });
    saveSnippets();
    titleInput.value = "";
    codeInput.value = "";
  };

  renderList();
}
