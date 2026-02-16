const messages = [
  "You’re safe here.",
  "It’s okay to pause.",
  "I’m still smiling.",
  "I’m glad you came back.",
  "Take your time, no rush."
];

function comfortClick() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("message").innerText = message;

  // subtle background color flash
  document.body.style.background = "#ffe6b3";
  setTimeout(() => {
    document.body.style.background = "#fff1d6";
  }, 300);
}
