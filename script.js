const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const fill = document.getElementById("fill");
const factBox = document.getElementById("fact-box");
const milestoneBox = document.getElementById("milestone");
const modeSelect = document.getElementById("mode");
const gameContainer = document.querySelector(".game-container");

let score = 0;
let gameActive = false;
let goal = 10;
let spawnRate = 1500;

const milestones = [
  { threshold: 5, message: "💪 Halfway there!" },
  { threshold: 10, message: "🎉 You reached the goal!" }
];

const facts = [
  "771 million people lack access to clean water.",
  "Every $40 donated can bring clean water to one person.",
  "Charity: water funds community-owned water projects.",
  "Access to clean water improves health and education."
];

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
  fill.style.height = `${(score / goal) * 100}%`;

  milestones.forEach(m => {
    if (score === m.threshold) {
      milestoneBox.textContent = m.message;
      milestoneBox.classList.add("show");
      setTimeout(() => milestoneBox.classList.remove("show"), 2000);
    }
  });

  if (score >= goal) {
    gameActive = false;
    confetti();
    factBox.textContent = "You made a difference! 🌍";
    startBtn.disabled = false;
  }
}

function showFact() {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  factBox.textContent = `Fact: ${fact}`;
}

function pump() {
  if (!gameActive) return;

  // Random obstacle chance (subtract 1 point)
  const hitObstacle = Math.random() < 0.2;
  if (hitObstacle) {
    score = Math.max(0, score - 1);
    milestoneBox.textContent = "🚫 Dirty water! -1 point";
    milestoneBox.classList.add("show");
    setTimeout(() => milestoneBox.classList.remove("show"), 1500);
  } else {
    score++;
  }

  updateScore();

  // --- NEW DOM ELEMENT FEATURE ---
  const dropEl = document.createElement("div");
  dropEl.textContent = "💦";
  dropEl.style.position = "absolute";
  dropEl.style.left = "50%";
  dropEl.style.bottom = "110px";
  dropEl.style.transform = "translateX(-50%)";
  dropEl.style.fontSize = "1.2rem";
  dropEl.style.opacity = "1";
  dropEl.style.transition = "all 1s ease-out";
  gameContainer.appendChild(dropEl);

  setTimeout(() => {
    dropEl.style.bottom = "180px";
    dropEl.style.opacity = "0";
  }, 50);

  setTimeout(() => dropEl.remove(), 1000);
}

function startGame() {
  score = 0;
  gameActive = true;
  startBtn.disabled = true;
  updateScore();
  showFact();

  milestoneBox.textContent = "Game started! Press the spacebar!";
  milestoneBox.classList.add("show");
  setTimeout(() => milestoneBox.classList.remove("show"), 2000);

  const mode = modeSelect.value;
  if (mode === "easy") spawnRate = 1800;
  else if (mode === "normal") spawnRate = 1200;
  else spawnRate = 800;
}

// Spacebar tapping mechanic
document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
  if (e.code === "Space" && !e.repeat) {
    pump();
  }
});

// Optional: click/tap on container also pumps
gameContainer.addEventListener("click", () => {
  if (!gameActive) return;
  pump();
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
