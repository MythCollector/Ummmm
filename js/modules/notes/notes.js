export const moduleData = {
  id: "notes",
  icon: "📝",
  title: "Notes",
  desc: "Create, save, and manage multiple notes.",
  entry: "./js/modules/notes/index.html"
};

export function mount(container, options = {}) {
  container.innerHTML = "";

  const notesKey = "coderplaza-multi-notes";
  let notes = JSON.parse(localStorage.getItem(notesKey) || "[]");

  // Layout
  container.style.display = "flex";
  container.style.height = "100%";
  container.style.gap = "12px";

  // Sidebar
  const sidebar = document.createElement("div");
  sidebar.style.width = "200px";
  sidebar.style.borderRadius = "8px";
  sidebar.style.padding = "8px";
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.overflowY = "auto";

  const noteList = document.createElement("div");
  sidebar.appendChild(noteList);

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ New Note";
  addBtn.style.marginTop = "8px";
  addBtn.style.padding = "6px 10px";
  addBtn.style.borderRadius = "6px";
  addBtn.style.border = "none";
  addBtn.style.cursor = "pointer";
  addBtn.style.boxShadow = "var(--shadow)";
  sidebar.appendChild(addBtn);

  // Editor
  const editor = document.createElement("textarea");
  editor.style.flex = "1";
  editor.style.width = "100%";
  editor.style.padding = "12px";
  editor.style.borderRadius = "8px";
  editor.style.border = "1px solid var(--card-bg)";
  editor.style.resize = "none";

  container.appendChild(sidebar);
  container.appendChild(editor);

  let currentNoteId = null;

  function saveNotes() {
    localStorage.setItem(notesKey, JSON.stringify(notes));
  }

  function renderNoteList() {
    noteList.innerHTML = "";
    notes.forEach((note, index) => {
      const noteBtn = document.createElement("button");
      noteBtn.textContent = note.title || `Note ${index + 1}`;
      noteBtn.style.marginBottom = "4px";
      noteBtn.style.textAlign = "left";
      noteBtn.style.padding = "6px 8px";
      noteBtn.style.borderRadius = "6px";
      noteBtn.style.border = "none";
      noteBtn.style.cursor = "pointer";
      noteBtn.style.display = "flex";
      noteBtn.style.justifyContent = "space-between";
      noteBtn.style.alignItems = "center";
      noteBtn.style.boxShadow = "var(--shadow)";

      noteBtn.onclick = () => loadNote(index);

      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "❌";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        notes.splice(index, 1);
        saveNotes();
        renderNoteList();
        editor.value = "";
      };

      noteBtn.appendChild(deleteBtn);
      noteList.appendChild(noteBtn);
    });
  }

  function loadNote(index) {
    currentNoteId = index;
    editor.value = notes[index].content || "";
  }

  addBtn.onclick = () => {
    notes.push({ title: `Note ${notes.length + 1}`, content: "" });
    saveNotes();
    renderNoteList();
  };

  editor.addEventListener("input", () => {
    if (currentNoteId !== null) {
      notes[currentNoteId].content = editor.value;
      saveNotes();
    }
  });

 // Get saved theme or system preference
const savedTheme = localStorage.getItem("coderplaza-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let theme = savedTheme || (prefersDark ? "dark" : "light");

// Apply theme to document
document.documentElement.dataset.theme = theme;

// Make textarea and sidebar match theme
function applyTheme() {
  const root = document.documentElement;
  const bg = getComputedStyle(root).getPropertyValue("--bg");
  const cardBg = getComputedStyle(root).getPropertyValue("--card-bg");
  const textColor = root.dataset.theme === "dark" ? "#ccc" : "#000";

  document.body.style.background = bg;

  const sidebar = document.querySelector(".notes-sidebar");
  if (sidebar) sidebar.style.background = cardBg;

  const textarea = document.querySelector("textarea");
  if (textarea) {
    textarea.style.background = bg;
    textarea.style.color = textColor;
  }
}

// Apply theme initially
applyTheme();

// Listen for changes to coderplaza-theme
window.addEventListener("storage", (e) => {
  if (e.key === "coderplaza-theme") {
    theme = e.newValue;
    document.documentElement.dataset.theme = theme;
    applyTheme();
  }
});




  // Initial render
  renderNoteList();
  if (notes.length > 0) loadNote(0);
  
}
