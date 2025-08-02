let currentPlayer = "X"; // Player is X, AI is O
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

document.addEventListener("DOMContentLoaded", function () {
  // Auto switch from welcome to game screen after 2 seconds
  setTimeout(() => {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
  }, 2000);

  // Add click listeners to each cell
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(cell, index));
  });

  // Restart button click (used in all end screens)
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", restartGame);
  });
});

function makeMove(cell, index) {
  if (board[index] === "" && currentPlayer === "X" && !gameOver) {
    cell.textContent = "X";
    board[index] = "X";

    if (checkWinner("X")) {
      gameOver = true;
      setTimeout(() => {
        document.getElementById("game-screen").style.display = "none";
        document.getElementById("winner-screen").style.display = "flex";
      }, 1000);
      return;
    } else if (isDraw()) {
      gameOver = true;
      document.getElementById("turn-msg").textContent = "It's a Draw!";
      showRestartButton();
      return;
    }

    currentPlayer = "O";
    showRandomAITurnMessage();
    setTimeout(aiMove, 1000);
  }
}

function aiMove() {
  let move = getRandomSmartMove();
  if (move !== undefined) {
    board[move] = "O";
    document.querySelectorAll(".cell")[move].textContent = "O";
  }

  if (checkWinner("O")) {
    gameOver = true;
    setTimeout(() => {
      document.getElementById("game-screen").style.display = "none";
      document.getElementById("loser-screen").style.display = "flex";
    }, 1000);
    return;
  } else if (isDraw()) {
    gameOver = true;
    document.getElementById("turn-msg").textContent = "It's a Draw!";
    showRestartButton();
    return;
  }

  currentPlayer = "X";
  document.getElementById("turn-msg").textContent = "Your Turn";
}

function getRandomSmartMove() {
  const emptyCells = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  if (Math.random() < 0.6) {
    for (let i of emptyCells) {
      board[i] = "O";
      if (checkWinner("O")) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }

    for (let i of emptyCells) {
      board[i] = "X";
      if (checkWinner("X")) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function isDraw() {
  return board.every(cell => cell !== "");
}

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === player)
  );
}

function showRandomAITurnMessage() {
  const messages = [
    "Hmm... let me think 🤔",
    "Nice move! My turn 😎",
    "Wait... I'm planning my strategy 💡",
    "Interesting... Here's my move 🤖",
    "Okay, now it’s my turn 🔍"
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("turn-msg").textContent = randomMsg;
}

function showRestartButton() {
  document.getElementById("restart-btn").style.display = "block";
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";

  document.getElementById("turn-msg").textContent = "Your Turn";
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
  });

  document.getElementById("restart-btn").style.display = "none";

  // Reset all screens
  document.getElementById("winner-screen").style.display = "none";
  document.getElementById("loser-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
}