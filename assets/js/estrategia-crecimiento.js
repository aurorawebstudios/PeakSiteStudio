/* Reveal on scroll + parallax suave en orbs */
(function () {
  const reveals = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 80);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));

  /* Parallax muy ligero en el hero */
  const hero = document.querySelector(".ec-hero");
  const orbs = document.querySelectorAll(".ec-hero .orb");
  if (hero && orbs.length) {
    hero.addEventListener("mousemove", (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 20;
      const y = (e.clientY / h - 0.5) * 20;
      orbs.forEach((orb, i) => {
        const f = i === 0 ? 1 : -1;
        orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    });
  }

  /* Tilt 3D en cards de servicios */
  document.querySelectorAll(".ec-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${(-py * 4).toFixed(
        2
      )}deg) rotateY(${(px * 4).toFixed(2)}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();