const enterBtn = document.getElementById("enterBtn");
const startScreen = document.getElementById("startScreen");
const labScreen = document.getElementById("labScreen");

const boxImg = document.getElementById("boxImg");
const drawBtn = document.getElementById("drawBtn");

const resultCard = document.getElementById("resultCard");
const chocoImg = document.getElementById("chocoImg");
const flavorName = document.getElementById("flavorName");
const cardTitle = document.getElementById("cardTitle");
const bonusList = document.getElementById("bonusList");
const reminderText = document.getElementById("reminderText");
const counter = document.getElementById("counter");

const finalCard = document.getElementById("finalCard");

const chocolates = [
  {
    flavor: "榛子味巧克力",
    img: "choco-1-hazelnut.jpg",
    title: "一颗安静的好运",
    bonus: ["稳定感 +20", "小事顺利率 +18", "被照顾感 +15"],
    reminder: "今天不用太赶，慢一点也没关系。记得好好吃饭。"
  },
  {
    flavor: "草莓味巧克力",
    img: "choco-2-strawberry.jpg",
    title: "一点柔软的红",
    bonus: ["好心情 +22", "被夸概率 +18", "可爱能量 +20"],
    reminder: "如果今天有点累，就先暂停一下。你已经做得很好了。"
  },
  {
    flavor: "海盐味巧克力",
    img: "choco-3-sea-salt.jpg",
    title: "把不开心留给海风",
    bonus: ["坏心情清除 +25", "松弛感 +16", "睡前安心值 +18"],
    reminder: "今天不开心的部分，到这里就可以结束了。剩下的时间留给自己。"
  },
  {
    flavor: "黑巧味巧克力",
    img: "choco-4-dark.jpg",
    title: "给酷酷的人一点甜",
    bonus: ["清醒值 +20", "勇气 +18", "被理解感 +16"],
    reminder: "不用一直表现得很厉害。偶尔想被照顾一下，也完全可以。"
  },
  {
    flavor: "牛奶味巧克力",
    img: "choco-5-milk.jpg",
    title: "今天适合温柔",
    bonus: ["温柔补给 +24", "安心感 +20", "疲惫恢复 +15"],
    reminder: "今晚早点休息。希望你睡前想到的，都是让你安心的事情。"
  },
  {
    flavor: "神秘味巧克力",
    img: "choco-6-mystery.jpg",
    title: "未公开的答案",
    bonus: ["惊喜感 +30", "期待值 +22", "被惦记感 +20"],
    reminder: "有一份现实里的小奖励已经准备好了。先不剧透，但它是认真挑的。"
  }
];

let remainingChocolates = [...chocolates];
let drawnCount = 0;
let boxOpened = false;

enterBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  labScreen.classList.remove("hidden");
});

boxImg.addEventListener("click", () => {
  if (boxOpened) return;

  boxOpened = true;
  boxImg.src = "box-open.png";
  drawBtn.classList.remove("hidden");
});

drawBtn.addEventListener("click", () => {
  if (drawnCount >= chocolates.length) {
    showFinalGift();
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingChocolates.length);
  const selected = remainingChocolates.splice(randomIndex, 1)[0];

  drawnCount++;
  showChocolate(selected);

  counter.textContent = `Unlocked ${drawnCount} / 6`;

  if (drawnCount === chocolates.length) {
    drawBtn.textContent = "View Today’s Final Gift";
  }
});

function showChocolate(choco) {
  finalCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  chocoImg.src = choco.img;
  chocoImg.alt = choco.flavor;

  flavorName.textContent = choco.flavor;
  cardTitle.textContent = choco.title;
  reminderText.textContent = choco.reminder;

  bonusList.innerHTML = "";

  choco.bonus.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    bonusList.appendChild(li);
  });
}

function showFinalGift() {
  resultCard.classList.add("hidden");
  drawBtn.classList.add("hidden");
  finalCard.classList.remove("hidden");
}