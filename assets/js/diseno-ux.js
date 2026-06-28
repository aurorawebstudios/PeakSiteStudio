// =========================================================
// DISEÑO Y UX — Peak Site Studio
// Theme toggle + reveal on scroll + contadores + iconos
// =========================================================
(function () {
  // ---------------------------------------------------------
  // 1) THEME TOGGLE (claro / oscuro)
  // ---------------------------------------------------------
  const body = document.body;
  const desktopBtn = document.getElementById("themeToggle");
  const mobileBtn = document.getElementById("mobileThemeToggle");

  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.add("light");
      body.classList.remove("dark");
    }
    const icon = theme === "dark" ? "☀️" : "🌙";
    if (desktopBtn) desktopBtn.textContent = icon;
    if (mobileBtn) mobileBtn.textContent = icon;
  };

  // Tema inicial: localStorage > preferencia del sistema > claro
  const saved = localStorage.getItem("psk-theme");
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  const toggleTheme = () => {
    const next = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("psk-theme", next);
  };

  if (desktopBtn) desktopBtn.addEventListener("click", toggleTheme);
  if (mobileBtn) mobileBtn.addEventListener("click", toggleTheme);

  // ---------------------------------------------------------
  // 2) MENÚ MÓVIL (abrir / cerrar)
  // ---------------------------------------------------------
  const openBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (openBtn && mobileMenu) openBtn.addEventListener("click", () => mobileMenu.classList.add("open"));
  if (closeBtn && mobileMenu) closeBtn.addEventListener("click", () => mobileMenu.classList.remove("open"));

  // ---------------------------------------------------------
  // 3) ICONOS LUCIDE
  // ---------------------------------------------------------
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  // ---------------------------------------------------------
  // 4) REVEAL ON SCROLL
  // ---------------------------------------------------------
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), i * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---------------------------------------------------------
  // 5) CONTADORES ANIMADOS
  // ---------------------------------------------------------
  const counters = document.querySelectorAll(".dux-stat-num");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count || "0", 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            co.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => co.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  // ---------------------------------------------------------
  // 6) TILT SUTIL EN LAS TARJETAS
  // ---------------------------------------------------------
  const cards = document.querySelectorAll(".dux-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

  // ---------------------------------------------------------
  // 7) ESTO ES DE # DISCIPLINAS
  // ---------------------------------------------------------

  document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Limpia el hash de la URL sin recargar ni saltar
      history.replaceState(null, '', location.pathname + location.search);
    }
  });
});
