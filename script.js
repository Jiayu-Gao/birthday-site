const countdownElement = document.getElementById("countdown");
const cards = document.querySelectorAll(".card");

// 日期设置
const birthday = new Date(2026, 5, 21);
const today = new Date(2026, 5, 15); // 测试用，之后改回 new Date()
const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

// 倒计时
const timeDifference = birthday - currentDate;
const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

if (daysLeft > 1) {
  countdownElement.textContent = `${daysLeft} days left until your birthday 🎂`;
} else if (daysLeft === 1) {
  countdownElement.textContent = `1 day left until your birthday 🎉`;
} else if (daysLeft === 0) {
  countdownElement.textContent = `Happy Birthday! 🎂💖`;
} else {
  countdownElement.textContent = `The birthday has already arrived 🎈`;
}

// 解锁逻辑
const unlockStartDate = new Date(2026, 5, 12);
const oneDay = 1000 * 60 * 60 * 24;

const diffDays = Math.floor((currentDate - unlockStartDate) / oneDay);
const passedDays = diffDays + 1;


cards.forEach((card) => {
  card.addEventListener("click", function (event) {
    if (card.classList.contains("locked")) {
      return;
    }

    event.preventDefault();

    card.classList.add("opening");

setTimeout(() => {
  window.location.href = card.getAttribute("href");
}, 600);  });
});
