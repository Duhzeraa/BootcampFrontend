const gameState = {
  elements: {
    cells: document.querySelectorAll(".cell"),
    target: document.querySelector(".target"),
    timeDisplay: document.querySelector("#time-left"),
    scoreDisplay: document.querySelector("#score"),
  },
  data: {
    intervalSpeed: 1000,
    targetId: null,
    score: 0,
    timeLeft: 60,
  },
  timers: {
    gameInterval: null,
    countdownInterval: null,
  },
};

function startCountdown() {
  gameState.data.timeLeft--;
  gameState.elements.timeDisplay.textContent = gameState.data.timeLeft;

  if (gameState.data.timeLeft <= 0) {
    clearInterval(gameState.timers.countdownInterval);
    clearInterval(gameState.timers.gameInterval);
    alert(`Fim de jogo! Sua pontuação foi: ${gameState.data.score}`);
  }
}

function playSound(soundFile) {
  const audio = new Audio(`./src/audios/${soundFile}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function changeTarget() {
  gameState.elements.cells.forEach(cell => {
    cell.classList.remove("target");
  });

  const randomIndex = Math.floor(Math.random() * 9);
  const chosenCell = gameState.elements.cells[randomIndex];
  chosenCell.classList.add("target");
  gameState.data.targetId = chosenCell.id;
}

function setupCellListeners() {
  gameState.elements.cells.forEach(cell => {
    cell.addEventListener("mousedown", () => {
      if (cell.id === gameState.data.targetId) {
        gameState.data.score++;
        gameState.elements.scoreDisplay.textContent = gameState.data.score;
        gameState.data.targetId = null;
        playSound("hit");
      }
    });
  });
}

function initGame() {
  setupCellListeners();
  gameState.timers.gameInterval = setInterval(changeTarget, gameState.data.intervalSpeed);
  gameState.timers.countdownInterval = setInterval(startCountdown, 1000);
}

initGame();
