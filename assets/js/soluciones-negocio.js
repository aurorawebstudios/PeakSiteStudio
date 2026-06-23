(function () {
  "use strict";

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("visible"));
  }

  // Card tilt 3D
  const cards = document.querySelectorAll(".sol-card");
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  if (!isCoarse) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -6;
        const ry = ((x / rect.width) - 0.5) * 6;
        card.style.transform = `translateY(-8px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  // Contador animado
  const stats = document.querySelectorAll(".sol-stat strong");
  const animateNumber = (el) => {
    const text = el.textContent.trim();
    const match = text.match(/([\d.]+)/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const prefix = text.substring(0, match.index);
    const suffix = text.substring(match.index + match[1].length);
    const duration = 1400;
    const start = performance.now();
    const isDecimal = match[1].includes(".");
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = text;
    }
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          statObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach((s) => statObs.observe(s));
  }

  // Menú móvil
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("closeMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileBtn && mobileMenu) mobileBtn.addEventListener("click", () => mobileMenu.classList.add("open"));
  if (closeBtn && mobileMenu) closeBtn.addEventListener("click", () => mobileMenu.classList.remove("open"));

  // Theme toggle
  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    
    // Aquí añadimos la actualización de los emojis ☀️/🌙
    const icon = isDark ? "☀️" : "🌙";
    const btnDesktop = document.getElementById("themeToggle");
    const btnMobile = document.getElementById("mobileThemeToggle");
    if (btnDesktop) btnDesktop.textContent = icon;
    if (btnMobile) btnMobile.textContent = icon;

    try { localStorage.setItem("theme", theme); } catch (e) {}
  };

  let saved = "light";
  try { saved = localStorage.getItem("theme") || "light"; } catch (e) {}
  applyTheme(saved);

  ["themeToggle", "mobileThemeToggle"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", () => {
      const next = document.body.classList.contains("dark") ? "light" : "dark";
      applyTheme(next);
    });
  }); 
})(); 