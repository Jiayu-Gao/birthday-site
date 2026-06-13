const planet = document.getElementById("openGiftBtn");
const intro = document.getElementById("planetIntro");
const gift = document.getElementById("giftSection");

function createPlanetBurst() {
  const rect = planet.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = ["#fff4a8", "#c9f2b8", "#ffd6df", "#f5c878", "#dff7cc"];

  for (let i = 0; i < 22; i++) {
    const particle = document.createElement("span");
    particle.className = "planet-particle";

    const angle = (Math.PI * 2 * i) / 22;
    const distance = 90 + Math.random() * 95;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.animationDelay = `${Math.random() * 0.08}s`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

planet.addEventListener("click", () => {
  createPlanetBurst();

  intro.classList.add("disappear");

  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 550);

  setTimeout(() => {
    intro.style.display = "none";
    gift.classList.add("show");
  }, 900);
});