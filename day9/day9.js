let mixCount = 0;
let whiskDirection = 1;
let chosenCake = "cake-vanilla.jpg";
let selectedDecor = null;
let ovenStarted = false;

const decorations = [
  { src: "d1.jpg", size: 160 },
  { src: "d2.jpg", size: 160 },
  { src: "d3.jpg", size: 140 },
  { src: "d4.jpg", size: 150 },
  { src: "d5.jpg", size: 150 },
  { src: "d6.jpg", size: 170 },
  { src: "d7.jpg", size: 160 },
  { src: "d8.jpg", size: 160 },
  { src: "d9.jpg", size: 210 },
  { src: "d10.jpg", size: 80 },
  { src: "d11.jpg", size: 80 },
  { src: "d12.jpg", size: 80 },
  { src: "d13.jpg", size: 80 }
];

function goScene(id) {
  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

/* Start */
document.getElementById("start-btn").addEventListener("click", () => {
  goScene("scene-mix");
});

/* Mix */
const mixArea = document.getElementById("mix-area");
const whisk = document.getElementById("whisk");
const mixBar = document.getElementById("mix-bar");
const mixText = document.getElementById("mix-text");

mixArea.addEventListener("click", () => {
  if (mixCount >= 12) return;

  mixCount++;

  const angle = whiskDirection === 1 ? 14 : -32;
  whiskDirection *= -1;

  whisk.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  mixBar.style.width = `${(mixCount / 12) * 100}%`;

  if (mixCount < 4) {
    mixText.innerText = "Mixing... tap tap tap ✨";
  } else if (mixCount < 9) {
    mixText.innerText = "Almost there...";
  } else if (mixCount < 12) {
    mixText.innerText = "So smooth now!";
  } else {
    mixText.innerText = "Perfect batter!";
    mixArea.classList.add("done");

    setTimeout(() => {
      goScene("scene-oven");
    }, 1000);
  }
});

/* Oven */
document.getElementById("oven-btn").addEventListener("click", startOven);

function startOven() {
  if (ovenStarted) return;
  ovenStarted = true;

  const text = document.getElementById("oven-text");
  const btn = document.getElementById("oven-btn");

  btn.disabled = true;
  btn.style.opacity = "0.65";
  btn.style.cursor = "default";

  let time = 5;
  text.innerText = `Baking... ${time}`;

  const timer = setInterval(() => {
    time--;

    if (time > 0) {
      text.innerText = `Baking... ${time}`;
    } else {
      clearInterval(timer);
      text.innerText = "Ding! The cake is ready!";

      setTimeout(() => {
        goScene("scene-cream");
      }, 1000);
    }
  }, 1000);
}

/* Cream */
document.querySelectorAll(".cream-tools button").forEach(btn => {
  btn.addEventListener("click", () => {
    chosenCake = btn.dataset.cake;
    document.getElementById("cream-cake").src = chosenCake;
  });
});

document.getElementById("to-decorate-btn").addEventListener("click", () => {
  document.getElementById("decor-cake").src = chosenCake;
  goScene("scene-decorate");
});

/* Decorations */
function buildDecorToolbar() {
  const toolbar = document.getElementById("decor-toolbar");
  toolbar.innerHTML = "";

  decorations.forEach(item => {
    const img = document.createElement("img");
    img.src = item.src;
    img.className = "decor-option";
    img.dataset.src = item.src;
    img.dataset.size = item.size;

    img.addEventListener("click", () => {
      document.querySelectorAll(".decor-option").forEach(option => {
        option.classList.remove("selected");
      });

      img.classList.add("selected");

      selectedDecor = {
        src: item.src,
        size: item.size
      };
    });

    toolbar.appendChild(img);
  });
}

const decorCakeArea = document.getElementById("decor-cake-area");

decorCakeArea.addEventListener("click", e => {
  if (!selectedDecor) return;

  const rect = decorCakeArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const decor = document.createElement("img");
  decor.src = selectedDecor.src;
  decor.className = "placed-decor";
  decor.style.width = `${selectedDecor.size}px`;
  decor.style.left = `${x}px`;
  decor.style.top = `${y}px`;

  decorCakeArea.appendChild(decor);
});

document.getElementById("to-wish-btn").addEventListener("click", () => {
  goScene("scene-wish");
});

/* Finish */
document.getElementById("finish-btn").addEventListener("click", finishGame);

function finishGame() {
  const wish = document.getElementById("wish-input").value.trim();
  const finalWish = document.getElementById("final-wish");

  finalWish.innerText = wish ? `“${wish}”` : "A tiny wish has been sent to the stars ✨";

  copyCakeToFinal();
  goScene("scene-finish");
  startStarFall();
}

function copyCakeToFinal() {
  const decorArea = document.getElementById("decor-cake-area");
  const finalArea = document.getElementById("final-cake-area");

  finalArea.innerHTML = "";

  const copiedCake = decorArea.cloneNode(true);
  copiedCake.removeAttribute("id");
  copiedCake.classList.add("final-copied-cake");

  finalArea.appendChild(copiedCake);
}

function startStarFall() {
  const timer = setInterval(() => {
    const star = document.createElement("div");
    star.className = "star-fall";
    star.innerText = Math.random() > 0.5 ? "✨" : "💫";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = 2.5 + Math.random() * 2 + "s";

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 4500);
  }, 220);

  setTimeout(() => {
    clearInterval(timer);
  }, 5000);
}

buildDecorToolbar();