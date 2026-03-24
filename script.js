// ==========================
// ANIMACIONES SCROLL
// ==========================
const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

elements.forEach(el => observer.observe(el));


// ==========================
// FORMULARIO (solo si existe)
// ==========================
const form = document.getElementById("contactForm");

if (form) {
  const btn = document.getElementById("submitBtn");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    document.querySelectorAll(".input-group").forEach(g => g.classList.remove("input-error"));

    if (!nombre.value) {
      nombre.parentElement.classList.add("input-error");
      valid = false;
    }

    if (!email.value.includes("@")) {
      email.parentElement.classList.add("input-error");
      valid = false;
    }

    if (!mensaje.value) {
      mensaje.parentElement.classList.add("input-error");
      valid = false;
    }

    if (!valid) return;

    btn.classList.add("loading");

    setTimeout(() => {
      btn.classList.remove("loading");
      form.reset();
      document.querySelector(".success-msg").style.display = "block";
    }, 1500);
  });
}


// ==========================
// IDIOMA
// ==========================
document.querySelectorAll('.lang-option').forEach(link => {
  link.addEventListener('click', function () {
    const lang = this.getAttribute('href').includes('/en') ? 'en' : 'es';
    localStorage.setItem('lang', lang);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang');

  if (lang === 'en' && !window.location.pathname.startsWith('/en')) {
    window.location.href = '/en/';
  }

  if (lang === 'es' && window.location.pathname.startsWith('/en')) {
    window.location.href = '/';
  }
});
// ==========================
// DARK MODE
// ==========================
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}

// Detectar preferencia guardada o del sistema
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
} else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark");
}

// Toggle manual
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Cambiar icono
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
});
