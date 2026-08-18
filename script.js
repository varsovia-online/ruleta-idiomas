const languages = [
  "Portugués",
  "Inglés",
  "Francés",
  "Italiano",
  "Chino",
  "Ruso",
  "Árabe",
  "Alemán"
];

const colors = [
  "#ed1111", // (Portugués)
  "#f98704", // (Inglés)
  "#e8da13", // (Francés)
  "#9bef0a", // (Italiano)
  "#05e6f7", // (Chino)
  "#4facfd", // (Ruso)
  "#870bf3", // (Árabe)
  "#ea11d1" // (Alemán)
];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;

let angle = 0;

function drawWheel() {
  const arc = (2 * Math.PI) / languages.length;

  for (let i = 0; i < languages.length; i++) {
    const start = i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, start, start + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(start + arc / 2);
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(languages[i], radius / 2, 5);
    ctx.restore();
  }
}

function spinWheel() {
  const spinTime = Math.random() * 3000 + 2000;
  const start = performance.now();

  const finalAngle = (Math.random() * 4 + 6) * Math.PI;

  function animate(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / spinTime, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    angle = easeOut * finalAngle;
    drawRotatedWheel(angle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      showResult();
    }
  }

  requestAnimationFrame(animate);
}

function drawRotatedWheel(rotation) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(rotation);
  ctx.translate(-radius, -radius);
  drawWheel();
  ctx.restore();
}

function showResult() {
  const arc = (2 * Math.PI) / languages.length;

  const adjustedAngle = (angle + Math.PI / 2) % (2 * Math.PI);

  const index = Math.floor((languages.length - adjustedAngle / arc)) % languages.length;

  document.getElementById("result").textContent =
    "Idioma seleccionado: " + languages[index];
}

drawWheel();
