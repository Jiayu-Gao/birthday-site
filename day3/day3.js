const text = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const choices = document.getElementById("choices");
const drawer = document.getElementById("drawer");
const lip = document.getElementById("lip");
const makeupArea = document.getElementById("makeupArea");
const mouthWrap = document.getElementById("mouthWrap");
const paintCanvas = document.getElementById("paintCanvas");
const final = document.getElementById("final");

const ctx = paintCanvas.getContext("2d");

const intro = [
  "Hey…",
  "Did you drink enough water today?",
  "Did you rest well?",
  "Be honest with me."
];

let introIndex = 0;
let canPaint = false;
let lipActive = false;
let paint = 0;
let lastPaintTime = 0;
let finalShown = false;

function resizeCanvas() {
  const rect = paintCanvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  paintCanvas.width = rect.width * ratio;
  paintCanvas.height = rect.height * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

nextBtn.addEventListener("click", () => {
  introIndex++;

  if (introIndex < intro.length) {
    text.innerText = intro[introIndex];
  } else {
    nextBtn.classList.add("hide");
    choices.classList.add("show");
  }
});

choices.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  choices.classList.remove("show");

  if (btn.dataset.choice === "no") {
    text.innerHTML = "That’s okay.<br>You don’t always have to be strong.";
  } else {
    text.innerHTML = "I’m glad you took care of yourself.<br>I still prepared a little softness for you.";
  }

  setTimeout(() => {
    text.innerText = "I left something for you.";
    drawer.classList.add("show");
  }, 1800);
});

drawer.addEventListener("click", () => {
  if (!drawer.classList.contains("show")) return;
  if (drawer.classList.contains("opened")) return;

  drawer.classList.add("opened");

  setTimeout(() => {
    lip.classList.add("show");
    makeupArea.classList.add("show");
    canPaint = true;
    resizeCanvas();

    text.innerHTML = "Don’t forget to take care of yourself.<br>Even just a little bit.";
  }, 700);
});

lip.addEventListener("click", (e) => {
  if (!lip.classList.contains("show")) return;

  lipActive = !lipActive;
  lip.classList.toggle("active", lipActive);

  e.stopPropagation();
});

document.addEventListener("mousemove", (e) => {
  if (!lipActive) return;

  lip.style.left = `${e.clientX}px`;
  lip.style.top = `${e.clientY}px`;
  lip.style.transform = "translate(-50%, -18%) rotate(-12deg)";

  checkMouth(e.clientX, e.clientY);
});

mouthWrap.addEventListener("click", (e) => {
  if (!canPaint) return;

  paintAt(e.clientX, e.clientY, 7);
  sparkle(e.clientX, e.clientY);
});

function checkMouth(x, y) {
  if (!canPaint) return;

  const rect = paintCanvas.getBoundingClientRect();

  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
    return;
  }

  const now = Date.now();
  if (now - lastPaintTime < 70) return;

  lastPaintTime = now;

  paintAt(x, y, 1.8);
  sparkle(x, y);
}

function paintAt(x, y, amount) {
  if (paint >= 100) return;

  const rect = paintCanvas.getBoundingClientRect();
  const localX = x - rect.left;
  const localY = y - rect.top;

  if (
    localX < 0 ||
    localX > rect.width ||
    localY < 0 ||
    localY > rect.height
  ) {
    return;
  }

  paint += amount;

  const gradient = ctx.createRadialGradient(
    localX,
    localY,
    1,
    localX,
    localY,
    34
  );

  gradient.addColorStop(0, "rgba(255, 95, 145, 0.32)");
  gradient.addColorStop(0.42, "rgba(255, 135, 170, 0.22)");
  gradient.addColorStop(0.78, "rgba(255, 190, 205, 0.1)");
  gradient.addColorStop(1, "rgba(255, 220, 230, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  /* 刷头更大：更容易铺满整张嘴唇 */
  ctx.ellipse(localX, localY, 34, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  if (paint >= 35 && paint < 43) {
    text.innerText = "A little color looks good on you :)";
  }

  if (paint >= 100 && !finalShown) {
    finalShown = true;

    setTimeout(() => {
      final.classList.add("show");
    }, 1600);
  }
}

function sparkle(x, y) {
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.style.left = `${x + Math.random() * 54 - 27}px`;
    s.style.top = `${y + Math.random() * 54 - 27}px`;
    document.body.appendChild(s);

    setTimeout(() => {
      s.remove();
    }, 850);
  }
}