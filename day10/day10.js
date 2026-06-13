const opening = document.getElementById("opening");
const openLetter = document.getElementById("openLetter");
const letterPage = document.getElementById("letterPage");
const finalPage = document.getElementById("finalPage");
const letterContent = document.getElementById("letterContent");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNum = document.getElementById("pageNum");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let currentPage = 0;
let musicPlaying = false;

const pages = [
`亲爱的萌萌：

你好啊！

很抱歉，我已经很久没有像现在这样写下一大段文字了。担心写得不够好，也担心有些心意没能表达清楚，但想来想去，还是觉得要写出来，因为我相信你一定能读懂这些文字背后的真心。`,

`二十年前我们降落在这个世界上，这件事如今想来仍觉神奇。

无数个具体的画面，以及那些一起懵懵懂懂成长的瞬间，仍如昨日般鲜明。

时光流逝得如此之快，快得让人恍惚。怎么一眨眼，我们就从两个小朋友长成了如今的模样。`,

`我们两个就像是彼此的坐标，互相印证着对方走了多远。

这两年发生了很多事，我们也发生了很多改变。某些我们曾经珍视的东西，如今看来已经没那么重要；某些我们曾经不能理解的事物，现在已经能够包容。

我们厌恶某些为了适应环境而做出的改变，但我有时也觉得，成长并不一定是一个贬义词，即使它确实包含着某种必须的牺牲。

但幸运的是，我们在这条路上永远有彼此相伴。相信这两个女孩会勇敢地走上新的道路，开辟自己的黄金时代。`,

`前段时间你跟我说，我们之间的感情就像吃饭喝水一样，是再寻常不过的事情。

我觉得你说的很对，因为在彼此的生命里，我们早就已经分不开了，融进了我们的生活和人生的记忆之中，没办法被剥离出来，所以变成一件平常的事情——是那种细水长流的东西。

和你在一起，或者只是想到你的时候，都会让我感到幸福，而我人生里很多最幸福的时刻，也是和你一起度过的。`,

`坦白讲，我是一个敏感的人，不怎么容易把自己的真心交付出去，因为总觉得那样会让自己变得脆弱。

但在你这里，向你敞开心扉是一件理所当然的事情，我们之间从来没有什么脆弱和敏感的区分，因为我知道，我们会稳稳地接住彼此。

写到这里的时候我已经在哭了，但我很开心。`,

`我很高兴多年来看着你的成长。

你是一个勇敢聪明的女孩，这一点从小到大都没有变过，只是现在的你，把这份清醒和坚定放到了更大的舞台上。

每次听到你的消息都会感到高兴，虽然没能到现场，但我的心早就为你欢呼。`,

`其实到现在我也不知道“爱”到底是什么，也不知道该怎么去定义它。

但如果要我说出对一个非亲属之人所能给出的诠释，大概就是你了。

我从来都不是一个喜欢轻易说“永远”的人，也不太相信这世界上有什么是真正永恒的。

但我想认真地说出来：

我们要做一辈子的好朋友。`,

`对于未来，我们都有一些迷茫和不安，但不变的是，我希望你的未来一切都好，希望你拥有一段美好的人生，因为你的未来一定有无限的可能。

我真心为你祈祷，愿好运一直围绕着你，愿你能舒展羽翼，飞向万里云霄，愿你永远自由。

我不知道未来会怎样，但我相信我们永远会是彼此最坚实的依靠。`,

`Shall I compare thee to a summer’s day?

你出生在夏天，就像我心里夏天的样子——美好，可爱。

如果说一年四季里我们之间最多美好的事情都发生在哪个季节，那一定是夏天，是漫长的暑假，是吹着风聊天的夜晚，是那些好像永远都不会结束的日子。

那时候我们什么也不做，只是坐在那里聊天，就能消磨掉整整一个夜晚。

我怀念那些日子，也明白以后这样的时光或许会渐渐减少，但我心中始终会为你留一处空间——欢迎你随时来打扰我。`,

`写到这里我又哭了。

谢谢你，我最珍视的朋友。谢谢你出现在我的生命里，谢谢你这样降临人间，谢谢你陪我一起长大，谢谢你让我拥有这样一段珍贵到无法替代的友谊。

我们永远是最好的萌点组合。

二十岁生日快乐，我最亲爱的女孩。

<div class="signature">你最好的朋友<br>点点</div>`
];

function renderPage() {
  letterContent.style.animation = "none";
  void letterContent.offsetWidth;
  letterContent.style.animation = "fadeText 0.8s ease both";

  letterContent.innerHTML = pages[currentPage];
  letterContent.scrollTop = 0;

  pageNum.textContent = `${currentPage + 1} / ${pages.length}`;

  prevBtn.style.visibility = currentPage === 0 ? "hidden" : "visible";
  nextBtn.textContent = currentPage === pages.length - 1 ? "看最后的小礼物" : "继续";
}

function showFinalPage() {
  letterPage.classList.add("hidden");
  finalPage.classList.remove("hidden");

  bgMusic.pause();

  const birthdayMusic = document.getElementById("birthdayMusic");
  birthdayMusic.currentTime = 0;
  birthdayMusic.volume = 0.45;
  birthdayMusic.play();
}
openLetter.addEventListener("click", () => {
  opening.classList.add("hidden");
  letterPage.classList.remove("hidden");

  bgMusic.volume = 0.18;

  bgMusic.play().then(() => {
    musicPlaying = true;
    musicBtn.textContent = "♪ Music On";
  }).catch(() => {
    musicPlaying = false;
    musicBtn.textContent = "♪ Music Off";
  });

  renderPage();
});

nextBtn.addEventListener("click", () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    renderPage();
  } else {
    showFinalPage();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.textContent = "♪ Music Off";
  } else {
    bgMusic.play();
    musicPlaying = true;
    musicBtn.textContent = "♪ Music On";
  }
});