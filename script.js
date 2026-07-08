/* ============================================================
   HOLISTIC DEVELOPMENT — script principal
   Vanilla JS, zéro dépendance.
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------- Année du footer -------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Effet de frappe dans le terminal -------- */
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const commands = [
      "python train.py --probleme votre_cas",
      "git commit -m 'ça compile ET ça marche'",
      "./deploy.sh --et-ca-tient-en-prod",
      "make coffee && think",
    ];

    if (reduceMotion) {
      typedEl.textContent = commands[0];
    } else {
      let ci = 0, chi = 0, deleting = false;
      const tick = () => {
        const current = commands[ci];
        typedEl.textContent = current.slice(0, chi);
        if (!deleting) {
          if (chi < current.length) { chi++; setTimeout(tick, 55 + Math.random() * 45); }
          else { deleting = true; setTimeout(tick, 1600); }
        } else {
          if (chi > 0) { chi--; setTimeout(tick, 28); }
          else { deleting = false; ci = (ci + 1) % commands.length; setTimeout(tick, 350); }
        }
      };
      setTimeout(tick, 900);
    }
  }

  /* -------- Réseau de neurones discret en fond -------- */
  const canvas = document.getElementById("bg");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, nodes = [], raf = null;
    const DENSITY = 0.00007;   // noeuds par pixel
    const MAX_NODES = 90;
    const LINK_DIST = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.min(MAX_NODES, Math.floor(w * h * DENSITY / dpr));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: (Math.random() * 1.4 + 0.6),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // liens
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(95, 242, 192, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // noeuds
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(95, 242, 192, 0.35)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 180);
    });

    // on met en pause quand l'onglet n'est pas visible (batterie / CPU)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf), raf = null; }
      else if (!raf) draw();
    });
  }

  /* -------- Petit clin d'œil dans la console -------- */
  const style = "color:#5ff2c0;font-family:monospace;font-size:12px";
  console.log(
    "%c" +
    "  _  _  ___  _    ___ ___ _____ ___ ___ \n" +
    " | || |/ _ \\| |  |_ _/ __|_   _|_ _/ __|\n" +
    " | __ | (_) | |__ | |\\__ \\ | |  | | (__ \n" +
    " |_||_|\\___/|____|___|___/ |_| |___\\___|\n" +
    " HOLISTIC DEVELOPMENT — tu inspectes le code ? on va bien s'entendre.",
    style
  );
  console.log("%c// tu cherches un dev IA ? cat specialite.md → ML · DL · sur mesure", "color:#6b7688;font-family:monospace");
})();
