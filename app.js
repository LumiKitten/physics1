// Fysik Bas A - Shared JavaScript

// ===== Theme Management =====
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    const isLight = document.body.classList.contains("light-mode");
    btn.textContent = isLight ? "🌙" : "☀️";
    btn.title = isLight ? "Byt till mörkt läge" : "Byt till ljust läge";
    btn.classList.toggle("active", isLight);
  }
}

// ===== Focus Mode =====
function toggleFocus() {
  document.body.classList.toggle("focus-mode");
  const isFocus = document.body.classList.contains("focus-mode");
  localStorage.setItem("focusMode", isFocus ? "on" : "off");
  updateFocusButton();
}

function updateFocusButton() {
  const btn = document.querySelector(".focus-toggle");
  if (btn) {
    const isFocus = document.body.classList.contains("focus-mode");
    btn.textContent = isFocus ? "✨" : "🎯";
    btn.title = isFocus ? "Stäng av fokusläge" : "Aktivera fokusläge";
    btn.classList.toggle("active", isFocus);
  }
}

// ===== Dyslexia Font =====
function toggleFont() {
  document.body.classList.toggle("dyslexia-font");
  const isDyslexia = document.body.classList.contains("dyslexia-font");
  localStorage.setItem("dyslexiaFont", isDyslexia ? "on" : "off");
  updateFontButton();
}

function updateFontButton() {
  const btn = document.querySelector(".font-toggle");
  if (btn) {
    const isDyslexia = document.body.classList.contains("dyslexia-font");
    btn.textContent = isDyslexia ? "Dy" : "Aa";
    btn.title = isDyslexia ? "Använd standardtypsnitt" : "Använd OpenDyslexic";
    btn.classList.toggle("active", isDyslexia);
  }
}

// ===== Load Saved Preferences =====
function loadPreferences() {
  // Theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
  updateThemeButton();

  // Focus Mode
  if (localStorage.getItem("focusMode") === "on") {
    document.body.classList.add("focus-mode");
  }
  updateFocusButton();

  // Dyslexia Font
  if (localStorage.getItem("dyslexiaFont") === "on") {
    document.body.classList.add("dyslexia-font");
  }
  updateFontButton();
}

// ===== Progress Bar (Focus Mode Only) =====
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  if (!progressBar) return;

  if (document.body.classList.contains("focus-mode")) {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + "%";
  }
}

// ===== Facit (Answer Key) Toggle =====
function initFacitToggles() {
  document.querySelectorAll(".facit-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const facitContent = button.nextElementSibling;
      if (facitContent && facitContent.classList.contains("facit-content")) {
        facitContent.classList.toggle("show");
        button.textContent = facitContent.classList.contains("show")
          ? "Dölj facit"
          : "Visa facit";
      }
    });
  });
}

// ===== KaTeX Auto-Render =====
function initKaTeX() {
  if (typeof renderMathInElement !== "undefined") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
      strict: false,
    });
  }
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  loadPreferences();
  initFacitToggles();
  initKaTeX();

  // Progress bar on scroll
  window.addEventListener("scroll", updateProgressBar, { passive: true });
  updateProgressBar();
});

// Also try to init KaTeX after it loads
window.addEventListener("load", initKaTeX);
