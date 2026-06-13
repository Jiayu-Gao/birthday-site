const houseItems = document.querySelectorAll(".house-item");

// 获取中国时间（北京时间 UTC+8）
const now = new Date();

const chinaTime = new Date(
  now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" })
);

const currentDate = new Date(
  chinaTime.getFullYear(),
  chinaTime.getMonth(),
  chinaTime.getDate()
);// 解锁开始日期：2026年6月12日（中国时间）
const unlockStartDate = new Date(2026, 5, 12);
const oneDay = 1000 * 60 * 60 * 24;

const diffDays = Math.floor((currentDate - unlockStartDate) / oneDay);
const passedDays = diffDays + 1;

houseItems.forEach((item) => {
  const itemDay = Number(item.dataset.day);

  if (itemDay > passedDays) {
    item.classList.add("locked-house-item");
    item.removeAttribute("href");
    item.textContent = "🔒";
  }
});

const houseContainer = document.querySelector(".house-container");

let currentX = 0;
let currentY = 0;

houseContainer.addEventListener("mousemove", (event) => {
  const rect = houseContainer.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const targetY = ((x - centerX) / centerX) * 10;
  const targetX = -((y - centerY) / centerY) * 10;

  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  houseContainer.style.transform = `
    rotateX(${currentX}deg)
    rotateY(${currentY}deg)
  `;
});

houseContainer.addEventListener("mouseleave", () => {
  houseContainer.style.transform = "rotateX(0deg) rotateY(0deg)";
});

const bgm = document.getElementById("bgm");

if (localStorage.getItem("musicPlaying") === "true") {
  const savedTime = localStorage.getItem("musicTime");

  if (savedTime) {
    bgm.currentTime = Number(savedTime);
  }

  bgm.play();
}