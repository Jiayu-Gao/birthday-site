const canvas = document.getElementById("scratchCanvas");
const cardWrap = document.querySelector(".card-wrap");
const hint = document.querySelector(".hint");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let revealed = false;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawScratchLayer();
}

function drawScratchLayer() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#d8d8d8");
  gradient.addColorStop(0.45, "#f5f5f5");
  gradient.addColorStop(1, "#b9b9b9");

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  ctx.fillStyle = "rgba(120, 120, 120, 0.45)";
  ctx.font = "18px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SCRATCH HERE", width / 2, height / 2);
}

function getPointerPosition(e) {
  const rect = canvas.getBoundingClientRect();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function scratch(e) {
  if (!isDrawing) return;

  e.preventDefault();

  const { x, y } = getPointerPosition(e);

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();

  checkRevealProgress();
}

function checkRevealProgress() {
  if (revealed) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let transparentPixels = 0;

  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 0) {
      transparentPixels++;
    }
  }

  const totalPixels = imageData.data.length / 4;
  const percent = transparentPixels / totalPixels;

  if (percent > 0.45) {
    revealed = true;
    canvas.style.transition = "opacity 0.8s ease";
    canvas.style.opacity = "0";
    cardWrap.classList.add("revealed");
    hint.textContent = "Mystery unlocked ♡";

    setTimeout(() => {
      canvas.style.display = "none";
    }, 800);
  }
}

canvas.addEventListener("mousedown", () => {
  isDrawing = true;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  scratch(e);
});

canvas.addEventListener("touchmove", scratch);

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", resizeCanvas);