// =================================================================
// 🚀 ANIMACIÓN SCROLL REVEAL - SOLO UNA VEZ (Definitivo y Optimizado)
// =================================================================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Deja de observar el elemento una vez que ya es visible
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Se activa cuando el 15% es visible
      rootMargin: "0px 0px -60px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
});

// =================================================================
// 📩 FORMULARIO DE CONTACTO (Conexión directa con EmailJS)
// =================================================================
const form = document.getElementById("contactForm");

if (form) {
  const btn = document.getElementById("submitBtn");
  const successMsg = document.querySelector(".success-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Formulario enviado, iniciando validación...");

    let valid = true;
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    // Limpiar errores previos
    document
      .querySelectorAll(".input-group")
      .forEach((g) => g.classList.remove("input-error"));

    // Validaciones de campos
    if (!nombre || !nombre.value.trim()) {
      if(nombre) nombre.parentElement.classList.add("input-error");
      valid = false;
    }

    if (!email || !email.value.includes("@")) {
      if(email) email.parentElement.classList.add("input-error");
      valid = false;
    }

    if (!mensaje || !mensaje.value.trim()) {
      if(mensaje) mensaje.parentElement.classList.add("input-error");
      valid = false;
    }

    if (!valid) {
      console.log("Fallo en las validaciones de los campos.");
      return;
    }

    // Activar estado visual de carga
    btn.classList.add("loading");
    btn.disabled = true;

    // Mapeamos los datos unificados para tu plantilla (Atendiendo a image_8d2c24.png)
    const templateParams = {
      nombre: nombre.value,   // Para tu diseño en español
      email: email.value,    // Para el cuerpo y el Reply To
      mensaje: mensaje.value,  // Para los detalles del proyecto
      name: nombre.value,     // Por si acaso para el From Name
      title: "Formulario de Contacto" // Para evitar que el Subject {{title}} llegue vacío
    };

    console.log("Llamando a EmailJS con los parámetros:", templateParams);

    // Envío del formulario
    emailjs.send("service_rg18143", "template_phy0b3d", templateParams)
      .then((response) => {
        console.log("¡ÉXITO de EmailJS!", response.status, response.text);
        if (successMsg) successMsg.style.display = "block";
        form.reset();
      })
      .catch((error) => {
        console.error("ERROR CRÍTICO de EmailJS:", error);
        alert("Hubo un problema al procesar el envío. Por favor, inténtalo de nuevo.");
      })
      .finally(() => {
        btn.classList.remove("loading");
        btn.disabled = false;
      });
  });
}

// =================================================================
// 🌐 SISTEMA DE IDIOMAS (Localstorage)
// =================================================================
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

// =================================================================
// 🌗 CONFIGURACIÓN DARK MODE
// =================================================================
const toggleBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.body.classList.add("dark");
}

/* Ajustar icono al cargar */
if (toggleBtn) {
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  
  // Evento click manual
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}

// =================================================================
// 📱 MENÚ MÓVIL (Sidebar)
// =================================================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
  });

  const hideMenu = () => {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  closeMenuBtn.addEventListener("click", hideMenu);

  // Cerrar al tocar el fondo oscuro exterior
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) hideMenu();
  });
}

// =================================================================
// 🌊 HEADER SCROLL EFFECT
// =================================================================
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });
}

// =================================================================
// 📁 COMPONENTES EXCLUSIVOS DE PORTFOLIO.HTML
// =================================================================
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
      if (empty) empty.hidden = visible !== 0;
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

  /* =============== MODAL DETALLES =============== */
  const modal = document.getElementById("pfModal");
  if (!modal) return; // Salvaguarda si no estamos en la página del portafolio

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
    
    if (media && mCover) {
      mCover.style.backgroundImage = media.style.backgroundImage || "linear-gradient(135deg,#0ea5e9,#1e3a8a)";
      mCover.style.backgroundColor = media.style.backgroundColor || "";
    }

    if (mTitle) mTitle.textContent = card.dataset.title || "Proyecto";
    if (mDesc) mDesc.textContent = card.dataset.desc || "";
    if (mSector) mSector.textContent = card.dataset.sector || "";
    if (mClient) mClient.textContent = card.dataset.client || "";
    if (mYear) mYear.textContent = card.dataset.year || "";
    if (mServices) mServices.textContent = card.dataset.services || "";
    if (mResult) mResult.textContent = card.dataset.result || "";

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  // Asignar clics de apertura
  document.querySelectorAll(".pf-card").forEach(card => {
    card.addEventListener("click", () => openModal(card));
  });

  // Cerrar desde backdrop/clics internos
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