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
const toggleBtn = document.getElementById("themeToggle");

// Detectar preferencia guardada o del sistema
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
} else if (
  !savedTheme &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
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

// ====================================
// TODO ESTO ES DE PORTFOLIO.HTML Y CSS
// ====================================

(() => {
  /* =============== REVEAL ON SCROLL =============== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* =============== STATS COUNTER =============== */
  const counters = document.querySelectorAll(".pf-num");
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => countObs.observe(c));

  /* =============== FILTROS =============== */
  const chips = document.querySelectorAll(".pf-chip");
  const cards = document.querySelectorAll(".pf-card");
  const empty = document.getElementById("pfEmpty");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      let visible = 0;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hide", !match);
        if (match) visible++;
      });
      empty.hidden = visible !== 0;
    });
  });

  /* =============== HOVER 3D TILT =============== */
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

/* =============== MODAL =============== */
const modal = document.getElementById("pfModal");
const mCover = document.getElementById("pfModalCover");
const mTitle = document.getElementById("pfModalTitle");
const mDesc = document.getElementById("pfModalDesc");
const mSector = document.getElementById("pfModalSector");
const mClient = document.getElementById("pfModalClient");
const mYear = document.getElementById("pfModalYear");
const mServices = document.getElementById("pfModalServices");
const mResult = document.getElementById("pfModalResult");

const openModal = (card) => {
  const media = card.querySelector(".pf-card-media");
  
  if (media) {
    mCover.style.backgroundImage = media.style.backgroundImage || "linear-gradient(135deg,#0ea5e9,#1e3a8a)";
    mCover.style.backgroundColor = media.style.backgroundColor || "";
  }

  mTitle.textContent = card.dataset.title || "Proyecto";
  mDesc.textContent = card.dataset.desc || "";
  mSector.textContent = card.dataset.sector || "";
  mClient.textContent = card.dataset.client || "";
  mYear.textContent = card.dataset.year || "";
  mServices.textContent = card.dataset.services || "";
  mResult.textContent = card.dataset.result || "";

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("show");
  document.body.style.overflow = "";
};

// Abrir
document.querySelectorAll(".pf-card").forEach(card => {
  card.addEventListener("click", () => openModal(card));
});

// Cerrar
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("pf-modal-close") || 
      e.target.classList.contains("pf-modal-backdrop") || 
      e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
})();
