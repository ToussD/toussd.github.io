/* ============================================================
   HOLISTIC DEVELOPMENT · le studio
   Courbes de niveau en fond + révélation au scroll.
   Vanilla JS, zéro dépendance. (script.js gère l'année et l'email.)
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------- Révélation au scroll -------- */
  const revealables = document.querySelectorAll("[data-reveal]");
  if (revealables.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealables.forEach((el) => io.observe(el));
    }
  }

  /* -------- Courbes de niveau : une carte topo qui respire -------- */
  const canvas = document.getElementById("topo");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const LINES = 18;
  const STEP = 9;          // pas d'échantillonnage horizontal, en pixels canvas
  let w, h, dpr, t = 0, raf = null;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    const spacing = h / LINES;

    for (let i = 0; i < LINES; i++) {
      const base = (i + 0.5) * spacing;
      const major = i % 4 === 0;   // une courbe maîtresse toutes les quatre

      ctx.beginPath();
      for (let x = 0; x <= w; x += STEP) {
        const k = x / w;
        const y =
          base +
          Math.sin(k * 2.3 + t * 0.22 + i * 0.22) * (h * 0.045) +
          Math.sin(k * 6.1 + t * 0.55 + i * 0.5) * (h * 0.026) +
          Math.sin(k * 11.7 - t * 0.34 + i * 0.9) * (h * 0.011);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = major ? "rgba(23, 97, 74, 0.16)" : "rgba(23, 97, 74, 0.075)";
      ctx.lineWidth = (major ? 1.5 : 1) * dpr;
      ctx.stroke();
    }
  };

  const loop = () => {
    t += 0.0045;
    frame();
    raf = requestAnimationFrame(loop);
  };

  resize();
  frame();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); frame(); }, 180);
  });

  if (!reduceMotion) {
    loop();

    // on met en pause quand l'onglet n'est pas visible (batterie / CPU)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      } else if (!raf) {
        loop();
      }
    });
  }
})();
