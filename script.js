// Game variables
let score = 0;
let waterLevel = 0;
let gameActive = false;

// DOM elements
const scoreDisplay = document.getElementById("score");
const fill = document.getElementById("fill");
const factBox = document.getElementById("fact-box");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const gameContainer = document.querySelector(".game-container");
const obstacle = document.getElementById("obstacle");

// Water facts
const facts = [
  "Clean water keeps children healthy and in school.",
  "Every $1 invested in water returns $4 in productivity.",
  "Access to clean water saves hours every day for millions.",
  "Women spend 200 million hours daily collecting water worldwide.",
  "Safe water can reduce waterborne diseases by 50%."
];

// Start game
function startGame() {
  gameActive = true;
  score = 0;
  waterLevel = 0;
  fill.style.height = "0%";
  scoreDisplay.textContent = "Score: 0";
  factBox.textContent = "Fact: ";
  gameContainer.classList.remove("flash");
  obstacle.classList.remove("show");
}

// Pump function
function pump() {
  if (!gameActive) return;
  if (waterLevel >= 100) return;

  const hitObstacle = Math.random() < 0.2;

  if (hitObstacle) {
    score = Math.max(0, score - 1);
    factBox.textContent = "🚫 Oh no! Dirty water slowed you down!";
    gameContainer.classList.add("flash");
    obstacle.classList.add("show");

    setTimeout(() => {
      gameContainer.classList.remove("flash");
      obstacle.classList.remove("show");
    }, 800);
  } else {
    score++;
    waterLevel += 10;
    if (waterLevel > 100) waterLevel = 100;
    fill.style.height = `${waterLevel}%`;
  }

  scoreDisplay.textContent = `Score: ${score}`;

  // Win condition
  if (waterLevel >= 100) {
    gameActive = false;
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factBox.textContent = `🎉 You filled the tube! ${randomFact}`;
    launchConfetti();
  }
}

// Confetti effect
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFC907', '#2E9DF7', '#4FCB53', '#FF902A']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFC907', '#2E9DF7', '#4FCB53', '#FF902A']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Event listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    pump();
  }
});
document.addEventListener("touchstart", (e) => {
  e.preventDefault();
  pump();
});
