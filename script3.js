"use strict";

// ===== DOM Selections =====
const nameContainer = document.querySelector(".player-names");
const gameContainer = document.querySelector(".container");
const winnerWindow = document.querySelector(".the-winner");

const inputNamePlayerOne = document.getElementById("PlayerOneName");
const inputNamePlayerTwo = document.getElementById("PlayerTwoName");
const playGame = document.querySelector(".submit-names");

const playerOneName = document.querySelector(".player1-name");
const playerTwoName = document.querySelector(".player2-name");

const playerOne = document.querySelector(".player-1");
const playerTwo = document.querySelector(".player-2");
const currentScorePlayerOne = playerOne.querySelector(".current-score");
const currentScorePlayerTwo = playerTwo.querySelector(".current-score");

const totalScorePlayerOne = playerOne.querySelector(".player-score");
const totalScorePlayerTwo = playerTwo.querySelector(".player-score");

const dice = document.querySelector(".dice");
const rollDiceBtn = document.querySelector(".roll-dice");
const holdBtn = document.querySelector(".hold");
const newGameBtns = document.querySelectorAll(".new-game, .new-game-2");

const winnerName = document.querySelector(".insert-winner");

// ===== Game State =====
let currentScoreP1 = 0;
let currentScoreP2 = 0;
let totalScoreP1 = 0;
let totalScoreP2 = 0;
let activePlayer = 1; // 1 for Player One, 2 for Player Two

// ===== Initial UI Setup =====
function initializeUI() {
  nameContainer.style.transform = "translateY(0)";
  gameContainer.style.transform = "translateY(100%)";
  winnerWindow.style.transform = "translateY(100%)";

  updateScores();
  activePlayer = 1;
  updateActiveUI();
  gameContainer.classList.remove("unclickable");
  dice.setAttribute("src", "");
}

function updateScores() {
  currentScorePlayerOne.textContent = currentScoreP1;
  currentScorePlayerTwo.textContent = currentScoreP2;
  totalScorePlayerOne.textContent = totalScoreP1;
  totalScorePlayerTwo.textContent = totalScoreP2;
}

function updateActiveUI() {
  if (activePlayer === 1) {
    playerOne.classList.remove("unclickable");
    playerTwo.classList.add("unclickable");
  } else {
    playerOne.classList.add("unclickable");
    playerTwo.classList.remove("unclickable");
  }
}

// ===== Game Logic =====
function addToCurrent(roll) {
  if (activePlayer === 1) {
    currentScoreP1 += roll;
    currentScorePlayerOne.textContent = currentScoreP1;
  } else {
    currentScoreP2 += roll;
    currentScorePlayerTwo.textContent = currentScoreP2;
  }
}

function checkForWin() {
  if (totalScoreP1 >= 100 || totalScoreP2 >= 100) {
    gameContainer.classList.add("unclickable");
    winnerWindow.style.transform = "translateY(-200%)";
    winnerName.textContent =
      totalScoreP1 >= 100
        ? playerOneName.textContent
        : playerTwoName.textContent;
    return totalScoreP1 >= 100 ? 1 : 2;
  }
}

function switchPlayer() {
  activePlayer = activePlayer === 1 ? 2 : 1;
  updateActiveUI();
}

function handleRoll() {
  const roll = Math.floor(Math.random() * 6) + 1;
  dice.setAttribute("src", `dice-${roll}.png`);

  if (roll === 1) {
    if (activePlayer === 1) {
      currentScoreP1 = 0;
    } else {
      currentScoreP2 = 0;
    }
    updateScores();
    switchPlayer();
  } else {
    addToCurrent(roll);
  }
}

function handleHold() {
  if (activePlayer === 1) {
    totalScoreP1 += currentScoreP1;
    currentScoreP1 = 0;
  } else {
    totalScoreP2 += currentScoreP2;
    currentScoreP2 = 0;
  }
  updateScores();

  const winner = checkForWin();
  if (winner === 1) {
    playerOne.style.background = "rgba(33, 33, 33, 0.4)";
    playerTwo.classList.add("unclickable");
    playerOne.classList.remove("unclickable");
  } else if (winner === 2) {
    playerTwo.style.background = "rgba(33, 33, 33, 0.4)";
    playerTwo.classList.remove("unclickable");
    playerOne.classList.add("unclickable");
  } else {
    switchPlayer();
  }
}

function resetGame() {
  currentScoreP1 = 0;
  currentScoreP2 = 0;
  totalScoreP1 = 0;
  totalScoreP2 = 0;
  playerOne.style.background = "rgba(255, 255, 255, 0.6)";
  playerTwo.style.background = "rgba(255, 255, 255, 0.6)";
  initializeUI();
}

// ===== Event Listeners =====
playGame.addEventListener("click", () => {
  playerOneName.textContent = inputNamePlayerOne.value.trim() || "Player 1";
  playerTwoName.textContent = inputNamePlayerTwo.value.trim() || "Player 2";
  nameContainer.style.transform = "translateY(-100%)";
  gameContainer.style.transform = "translateY(-100%)";
});

rollDiceBtn.addEventListener("click", handleRoll);
holdBtn.addEventListener("click", handleHold);
newGameBtns.forEach((btn) => btn.addEventListener("click", resetGame));

// ===== Init on Page Load =====
initializeUI();
