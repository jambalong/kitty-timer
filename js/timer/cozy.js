/* ============================================
   KittyTimer — Cozy Decorations JS
   Purely additive — no existing code touched
   ============================================ */

(function () {
  "use strict";

  /* ── Helpers ── */
  function el(tag, cls) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }
  function svgEl(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  /* ── 1. Cat ears on top of the card ── */
  function buildEars() {
    const wrap = el("div");
    wrap.id = "deco-ears";
    wrap.innerHTML = '<div class="cat-ear"></div><div class="cat-ear"></div>';
    document.body.appendChild(wrap);
  }

  /* ── 2. Hanging ribbon tag ── */
  function buildTag() {
    const wrap = el("div");
    wrap.id = "deco-tag";
    wrap.innerHTML =
      '<div class="tag-string"></div>' +
      '<div class="tag-label">Made with ♡</div>';
    document.body.appendChild(wrap);
  }

  /* ── 3. Byline ── */
  function buildByline() {
    const b = el("div");
    b.id = "deco-byline";
    b.textContent = "✦ for you ✦";
    document.body.appendChild(b);
  }

  /* ── 4. Corner SVG decorations ── */
  function buildCorners() {
    // Draws a corner cluster of paw + stars using inline SVG
    const corners = ["tl", "tr", "bl", "br"];
    corners.forEach(function (id) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = "deco-corner-" + id;
      svg.setAttribute("viewBox", "0 0 200 200");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      // Paw print group (simple circles)
      const pawColor = "rgba(166,227,161,0.55)";
      const starColor = "rgba(249,226,175,0.65)";
      const heartColor = "rgba(243,139,168,0.50)";

      // Big pad
      const pad = svgEl("circle");
      pad.setAttribute("cx", "38"); pad.setAttribute("cy", "75");
      pad.setAttribute("r", "18"); pad.setAttribute("fill", pawColor);
      svg.appendChild(pad);

      // Toe beans
      [[18, 46], [36, 40], [54, 40], [68, 50]].forEach(function (pos) {
        const toe = svgEl("circle");
        toe.setAttribute("cx", pos[0]); toe.setAttribute("cy", pos[1]);
        toe.setAttribute("r", "9"); toe.setAttribute("fill", pawColor);
        svg.appendChild(toe);
      });

      // Stars
      const starPositions = [[100, 30], [140, 60], [80, 15], [160, 110]];
      starPositions.forEach(function (pos, i) {
        const t = svgEl("text");
        t.setAttribute("x", pos[0]); t.setAttribute("y", pos[1]);
        t.setAttribute("font-size", i % 2 === 0 ? "20" : "14");
        t.setAttribute("fill", starColor);
        t.setAttribute("text-anchor", "middle");
        t.textContent = "✦";
        svg.appendChild(t);
      });

      // Heart
      const heart = svgEl("text");
      heart.setAttribute("x", "155"); heart.setAttribute("y", "40");
      heart.setAttribute("font-size", "22");
      heart.setAttribute("fill", heartColor);
      heart.setAttribute("text-anchor", "middle");
      heart.textContent = "♡";
      svg.appendChild(heart);

      // Small dot cluster
      [[120, 90], [135, 78], [148, 92]].forEach(function (pos) {
        const dot = svgEl("circle");
        dot.setAttribute("cx", pos[0]); dot.setAttribute("cy", pos[1]);
        dot.setAttribute("r", "4"); dot.setAttribute("fill", "rgba(203,166,247,0.45)");
        svg.appendChild(dot);
      });

      document.body.appendChild(svg);
    });
  }

  /* ── 5. Floating ambient particles ── */
  function buildFloaters() {
    const wrap = el("div");
    wrap.id = "decorations";
    document.body.appendChild(wrap);

    const types = [
      { cls: "deco-paw",  emoji: "🐾" },
      { cls: "deco-star", emoji: "✦" },
      { cls: "deco-heart",emoji: "♡" },
      { cls: "deco-fish", emoji: "🐟" },
      { cls: "deco-moon", emoji: "☾" },
      { cls: "deco-yarn", emoji: "🧶" },
    ];

    for (let i = 1; i <= 10; i++) {
      const type = types[i % types.length];
      const d = el("div", "deco " + type.cls + " float-item-" + i);
      d.style.animationName = "decoFloat";
      // Override inline so CSS class handles position
      if (type.emoji && !type.cls.includes("star") && !type.cls.includes("heart") && !type.cls.includes("moon")) {
        d.textContent = type.emoji;
        d.style.fontSize = (10 + (i % 5) * 3) + "px";
      }
      wrap.appendChild(d);
    }
  }

  /* ── 6. Sparkles that pop around the card on hover ── */
  function buildSparkles() {
    const wrap = el("div");
    wrap.id = "deco-shelf";
    document.body.appendChild(wrap);

    for (let i = 0; i < 6; i++) {
      const s = el("div", "sparkle");
      const angle = (i / 6) * Math.PI * 2;
      const r = 200 + (i % 3) * 30;
      s.style.left = (197 + Math.cos(angle) * r) + "px";
      s.style.top  = (172 + Math.sin(angle) * r) + "px";
      s.style.animationDelay = (i * 0.4) + "s";
      s.style.animationDuration = (2 + i * 0.3) + "s";
      if (i % 3 === 1) s.style.setProperty("color", "#cba6f7");
      if (i % 3 === 2) s.style.setProperty("color", "#f38ba8");
      wrap.appendChild(s);
    }
  }

  /* ── 7. Static paw prints scattered on background ── */
  function buildStaticPaws() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "deco-paws";
    svg.setAttribute("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight);
    svg.style.width  = "100%";
    svg.style.height = "100%";

    // 12 scattered paw prints (each: big pad + 4 toes)
    const positions = [
      [80,  100, 0.18], [250, 60,  0.12], [700, 150, 0.15],
      [900, 80,  0.10], [150, 500, 0.13], [500, 420, 0.16],
      [820, 480, 0.11], [60,  680, 0.14], [350, 700, 0.09],
      [680, 650, 0.17], [950, 600, 0.12], [450, 200, 0.08],
    ];

    positions.forEach(function (pos) {
      const x = pos[0], y = pos[1], a = pos[2];
      const g = svgEl("g");
      g.setAttribute("opacity", a);
      g.setAttribute("transform", "translate(" + x + "," + y + ") rotate(" + (Math.random() * 40 - 20) + ")");

      // pad
      const pad = svgEl("ellipse");
      pad.setAttribute("cx", "0"); pad.setAttribute("cy", "8");
      pad.setAttribute("rx", "10"); pad.setAttribute("ry", "8");
      pad.setAttribute("fill", "#4c4f69");
      g.appendChild(pad);

      // toes
      [[-9,-6],[-3,-12],[4,-12],[10,-6]].forEach(function (t) {
        const toe = svgEl("circle");
        toe.setAttribute("cx", t[0]); toe.setAttribute("cy", t[1]);
        toe.setAttribute("r", "5"); toe.setAttribute("fill", "#4c4f69");
        g.appendChild(toe);
      });

      svg.appendChild(g);
    });

    document.body.appendChild(svg);
  }

  /* ── Init ── */
  function init() {
    buildEars();
    buildTag();
    buildByline();
    buildCorners();
    buildFloaters();
    buildSparkles();
    // skip static paws (emoji fallback is fine; SVG coords may overflow small screens)
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
