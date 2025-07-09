// script.js
function navigateTo(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Tic Tac Toe
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let tttPlayer = "X";
let tttActive = true;

function makeMove(cell) {
  const index = [...cell.parentNode.children].indexOf(cell);
  if (tttBoard[index] === "" && tttActive) {
    tttBoard[index] = tttPlayer;
    cell.textContent = tttPlayer;
    if (checkTTT(tttPlayer)) {
      document.getElementById('ttt-status').textContent = `${tttPlayer} wins!`;
      tttActive = false;
    } else if (!tttBoard.includes("")) {
      document.getElementById('ttt-status').textContent = "It's a draw!";
      tttActive = false;
    } else {
      tttPlayer = tttPlayer === "X" ? "O" : "X";
      document.getElementById('ttt-status').textContent = `Player ${tttPlayer}'s turn`;
    }
  }
}
function checkTTT(player) {
  const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return win.some(comb => comb.every(i => tttBoard[i] === player));
}
function resetTTT() {
  tttBoard = ["", "", "", "", "", "", "", "", ""];
  tttPlayer = "X";
  tttActive = true;
  document.querySelectorAll("#game-ttt .cell").forEach(cell => cell.textContent = "");
  document.getElementById('ttt-status').textContent = "Player X's turn";
}

// RPS
function playRPS(player) {
  const ai = ["rock", "paper", "scissors"][Math.floor(Math.random()*3)];
  let result = "Draw!";
  if (
    (player === "rock" && ai === "scissors") ||
    (player === "paper" && ai === "rock") ||
    (player === "scissors" && ai === "paper")
  ) result = "You Win!";
  else if (player !== ai) result = "You Lose!";
  document.getElementById('rps-result').textContent = `AI chose ${ai}. ${result}`;
}
function resetRPS() {
  document.getElementById('rps-result').textContent = "";
}

// Memory
let memoryCards = [], selected = [], attempts = 0;
function resetMemory() {
  memoryCards = [..."AABBCCDDEEFF"].sort(() => 0.5 - Math.random());
  const game = document.getElementById("memory-game");
  game.innerHTML = "";
  memoryCards.forEach(letter => {
    const div = document.createElement("div");
    div.className = "memory-cell";
    div.dataset.letter = letter;
    div.textContent = "";
    div.onclick = () => flipCard(div);
    game.appendChild(div);
  });
  selected = [];
  attempts = 0;
  document.getElementById("memory-attempts").textContent = "Attempts: 0";
}
function flipCard(card) {
  if (selected.length < 2 && card.textContent === "") {
    card.textContent = card.dataset.letter;
    selected.push(card);
    if (selected.length === 2) {
      attempts++;
      document.getElementById("memory-attempts").textContent = `Attempts: ${attempts}`;
      setTimeout(() => {
        if (selected[0].dataset.letter !== selected[1].dataset.letter) {
          selected.forEach(c => c.textContent = "");
        }
        selected = [];
      }, 700);
    }
  }
}
resetMemory();


function togglePlayer() {
  const player = document.getElementById('spotify-frame');
  player.classList.toggle('spotify-hidden');
}
