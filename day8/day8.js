const playBtn = document.getElementById("playBtn");
const machineArea = document.getElementById("machineArea");
const finalPage = document.getElementById("finalPage");
const hintText = document.getElementById("hintText");

let attempt = 0;
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) return;

  attempt++;
  isPlaying = true;
  playBtn.disabled = true;

  clearMachineState();

  if (attempt === 1) {
    firstFail();
  } else if (attempt === 2) {
    secondFail();
  } else {
    success();
  }
});

function clearMachineState() {
  machineArea.classList.remove(
    "shake",
    "drop",
    "fail-touch",
    "fail-lift",
    "fail-drop",
    "success-catch",
    "success-lift",
    "success-out"
  );
}

function resetButton(text, hint) {
  playBtn.textContent = text;
  hintText.textContent = hint;
  playBtn.disabled = false;
  isPlaying = false;
}

function firstFail() {
  hintText.textContent = "Here we go...";

  machineArea.classList.add("shake");

  setTimeout(() => {
    machineArea.classList.add("drop");
  }, 600);

  setTimeout(() => {
    machineArea.classList.add("fail-touch");
  }, 1400);

  setTimeout(() => {
    machineArea.classList.remove("drop");
  }, 2100);

  setTimeout(() => {
    clearMachineState();
    resetButton("TRY AGAIN", "Oops... almost!");
  }, 2900);
}

function secondFail() {
  hintText.textContent = "This time maybe...";

  machineArea.classList.add("shake");

  setTimeout(() => {
    machineArea.classList.add("drop");
  }, 600);

  setTimeout(() => {
    machineArea.classList.add("fail-lift");
  }, 1400);

  setTimeout(() => {
    machineArea.classList.remove("drop");
  }, 2100);

  setTimeout(() => {
    machineArea.classList.add("fail-drop");
  }, 2500);

  setTimeout(() => {
    clearMachineState();
    resetButton("LAST TRY", "So close! One more time.");
  }, 3400);
}

function success() {
  hintText.textContent = "Wait... you got it!";

  machineArea.classList.add("shake");

  setTimeout(() => {
    machineArea.classList.add("drop");
  }, 600);

  setTimeout(() => {
    machineArea.classList.add("success-catch");
  }, 1500);

  setTimeout(() => {
    machineArea.classList.remove("drop");
    machineArea.classList.add("success-lift");
  }, 2300);

  setTimeout(() => {
    machineArea.classList.add("success-out");
  }, 3400);

  setTimeout(() => {
    machineArea.style.display = "none";
    finalPage.classList.add("show");
  }, 4300);
}