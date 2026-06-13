// ===== 获取元素 =====
const memoryStack = document.getElementById("memoryStack");
const envelope = document.getElementById("envelope");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

const sendBox = document.getElementById("sendBox");
const sendBtn = document.getElementById("sendBtn");
const userText = document.getElementById("userText");
const sentNote = document.getElementById("sentNote");

let opened = false;


// ===== 打开信封 =====
envelope.addEventListener("click", () => {
  if (opened) return;

  opened = true;

  envelope.classList.add("open");

  setTimeout(() => {
    card1.classList.add("show1");
    card2.classList.add("show2");
  }, 300);

  setTimeout(() => {
    sendBox.classList.remove("hidden");
  }, 900);
});


// ===== 打字机效果 =====
function typeText(el, speed = 40) {
  const text = el.dataset.text;
  el.textContent = "";

  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}


// ===== 翻面 + 写字 =====
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {

    card.classList.toggle("flip");

    const msg = card.querySelector(".message");

    if (card.classList.contains("flip") && !msg.classList.contains("done")) {
      msg.classList.add("done");
      typeText(msg);
    }

  });
});


// ===== 发送：生成新明信片 =====
sendBtn.addEventListener("click", () => {

  const text = userText.value.trim();

  if (!text) {
    userText.placeholder = "write something first :)";
    return;
  }

  // 创建新卡片
  const newCard = document.createElement("div");
  newCard.className = "flying-card";

  newCard.innerHTML = `
    <div class="mini-card">
      <div class="mini-front"></div>
      <div class="mini-back">
        <p>${text}</p>
      </div>
    </div>
  `;

  document.body.appendChild(newCard);

  // 飞走动画
  setTimeout(() => {
    newCard.classList.add("fly-away");
  }, 50);

  // 提示文字
  setTimeout(() => {
    sentNote.classList.add("show");
  }, 1700);

  setTimeout(() => {
    sentNote.classList.remove("show");
  }, 3500);
const memoryCard = document.createElement("div");
memoryCard.className = "memory-card";
memoryCard.textContent = text;

memoryStack.appendChild(memoryCard);
  userText.value = "";

});
function goHome() {
  window.location.href = "../house.html";
}