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

// Detectar preferencia guardada o del sistema
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
} else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark");
}

/* Ajustar icono al cargar */
const isDarkInit = document.body.classList.contains("dark");
if (toggleBtn) {
  toggleBtn.textContent = isDarkInit ? "☀️" : "🌙";
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
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');   // ← clave para el fix
  });

  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });

  // Cerrar al tocar el fondo oscuro
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}
// ANIMACIÓN SCROLL REVEAL - Se activa cada vez que entra en pantalla
document.addEventListener('DOMContentLoaded', () => {
  
  const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añade la clase visible para activar la animación
        entry.target.classList.add('visible');
      } else {
        // Opcional: Quita la clase cuando sale de la pantalla (para que se vuelva a animar al bajar otra vez)
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15,           // Se activa cuando el 15% del elemento es visible
    rootMargin: "-50px 0px -80px 0px"
  });

  elements.forEach(el => {
    observer.observe(el);
  });
});
