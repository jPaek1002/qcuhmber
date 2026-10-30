document.getElementById("yr").textContent = new Date().getFullYear();

// Animated waveform behind the hero
(() => {
  const canvas = document.getElementById("wave");
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, t = 0;

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const lines = [
    { color: "rgba(124,245,196,0.55)", amp: 60, freq: 0.006, speed: 0.012, y: 0.62 },
    { color: "rgba(167,139,250,0.45)", amp: 90, freq: 0.004, speed: 0.008, y: 0.68 },
    { color: "rgba(236,235,243,0.12)", amp: 40, freq: 0.01, speed: 0.02, y: 0.74 },
  ];

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const l of lines) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const env = Math.sin((x / w) * Math.PI);
        const y = h * l.y
          + Math.sin(x * l.freq + t * l.speed * 60) * l.amp * env
          + Math.sin(x * l.freq * 2.7 - t * l.speed * 40) * l.amp * 0.3 * env;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = l.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    t += 1 / 60;
    if (!still) requestAnimationFrame(draw);
  };

  addEventListener("resize", resize);
  resize();
  draw();
})();

// Fade sections in on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { threshold: 0.12 });
document.querySelectorAll(".section, .card, .timeline li").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});
