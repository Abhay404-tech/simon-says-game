let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;

const colors = ["red", "yellow", "green", "purple"];

document.addEventListener("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    let userColor = colors.find(c => this.classList.contains(c));
    userSequence.push(userColor);
    flashButton(userColor);
    checkAnswer(userSequence.length - 1);
  });
});

function nextSequence() {
  userSequence = [];
  level++;
  document.querySelector("#level-title").innerText = "Level " + level;
  document.querySelector("#score").innerText = "Score: " + (level - 1);
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = colors[randomIndex];
  gameSequence.push(randomColor);
  flashButton(randomColor);
}

function flashButton(color) {
  let button = document.querySelector("." + color);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 300);
}

function checkAnswer(currentLevel) {
  if (gameSequence[currentLevel] === userSequence[currentLevel]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    document.querySelector("#level-title").innerText = "Game Over! Press any key to restart.";
    startOver();
  }
}

function startOver() {
  level = 0;
  gameSequence = [];
  started = false;
  document.querySelector("#score").innerText = "Score: 0";
}
