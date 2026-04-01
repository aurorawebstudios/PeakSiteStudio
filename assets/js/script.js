// ==========================
// ANIMACIONES SCROLL
// ==========================
const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

elements.forEach((el) => observer.observe(el));

// ==========================
// FORMULARIO (solo si existe)
// ==========================
const form = document.getElementById("contactForm");

if (form) {
  const btn = document.getElementById("submitBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    document
      .querySelectorAll(".input-group")
      .forEach((g) => g.classList.remove("input-error"));

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
document.querySelectorAll(".lang-option").forEach((link) => {
  link.addEventListener("click", function () {
    const lang = this.getAttribute("href").includes("/en") ? "en" : "es";
    localStorage.setItem("lang", lang);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang");

  if (lang === "en" && !window.location.pathname.startsWith("/en")) {
    window.location.href = "/en/";
  }

  if (lang === "es" && window.location.pathname.startsWith("/en")) {
    window.location.href = "/";
  }
});
// ==========================
// DARK MODE
// ==========================
// ==========================
// DARK MODE - SIEMPRE EMPIEZA EN LIGHT
// ==========================

const toggleBtn = document.getElementById("themeToggle");

// FORZAR MODO LIGHT al cargar (incluso en incógnito)
document.body.classList.remove("dark");
document.body.classList.add("light");
localStorage.setItem("theme", "light");

// Ajustar icono inicial (Luna = modo claro)
if (toggleBtn) {
  toggleBtn.textContent = "🌙";
}

// Toggle manual (el usuario sí puede cambiar a dark si quiere)
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    document.body.classList.toggle("light", !isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Cambiar icono
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}

// Toggle manual
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Cambiar icono
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}
// MENÚ MÓVIL PARCIAL
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open"); // ← clave para el fix
  });

  closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });

  // Cerrar al tocar el fondo oscuro
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}
// ANIMACIÓN SCROLL REVEAL - SOLO UNA VEZ (definitivo)
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // ← Esta línea es clave: una vez que aparece, ya no lo observamos más
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Se activa cuando el 15% es visible
      rootMargin: "0px 0px -60px 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
});

// ==========================
// HEADER SCROLL EFFECT (DEL OTRO SCRIPT)
// ==========================
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });
}