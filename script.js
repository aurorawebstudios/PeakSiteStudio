// ANIMACIONES SCROLL
const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

elements.forEach(el => observer.observe(el));

// FORM PRO
const form = document.getElementById("contactForm");
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
const elements = document.querySelectorAll('.fade-up, .fade-left');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
});

elements.forEach(el => observer.observe(el));
// Guardar idioma al hacer click
document.querySelectorAll('.lang-option').forEach(link => {
  link.addEventListener('click', function () {
    const lang = this.getAttribute('href').includes('/en') ? 'en' : 'es';
    localStorage.setItem('lang', lang);
  });
});

// Redirección automática según idioma guardado
window.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang');

  if (lang === 'en' && !window.location.pathname.startsWith('/en')) {
    window.location.href = '/en/';
  }

  if (lang === 'es' && window.location.pathname.startsWith('/en')) {
    window.location.href = '/';
  }
});
