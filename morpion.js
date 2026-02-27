/* JEU DU MORPION EN JS */

const newGameButton = document.getElementById("newGameButton");
const resetButton = document.getElementById("resetButton");
const board = document.getElementById("gameBoard");
const gameInfo = document.getElementById("gameInfo");
let cells = [];
let gameActive = true;
const winningCombinations = [
  // lignes gagnantes
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // Colonnes gagnantes
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // Diagonales gagnantes
  [1, 5, 9],
  [3, 5, 7],
];
const player = "X";
const aiPlayer = "O";
let currentPlayer = player;

newGameButton.addEventListener("click", initGame);
resetButton.addEventListener("click", resetGame);

function initGame() {
  cells = [];
  gameActive = true;
  currentPlayer = player;
  console.log("new game");
  board.textContent = "";
  boardSetup();
  clickCell();
}

function boardSetup() {
  for (let i = 1; i < 10; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cells.push(cell);
    board.appendChild(cell);
  }
}

function clickCell() {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      console.log("click", cell.dataset.index);
      if (cell.textContent == "") {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer == player ? aiPlayer : player;
      }
      checkVictory(cells);
    });
  });
}

// fonction pour vérifier les Conditions de victoire
function checkVictory(cells) {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a - 1].textContent &&
      cells[a - 1].textContent === cells[b - 1].textContent &&
      cells[a - 1].textContent === cells[c - 1].textContent
    ) {
      const message = document.createElement("p");
      let winner = currentPlayer == player ? aiPlayer : player;
      console.log("Victoire", winner);
      message.textContent = `Le joueur ${winner} a gagné !`;
      gameInfo.appendChild(message);
      return true;
    }
  }
  if (cells.every((cell) => cell.textContent !== "")) {
    const message = document.createElement("p");
    message.textContent = "Match nul !";
    gameInfo.appendChild(message);
  }
}

// fonction pour réinitialiser le jeu et recommencer une partie
function resetGame() {
  console.log("reset");
  currentPlayer = player;
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  gameActive = false;
  if (gameInfo.lastChild) {
    gameInfo.removeChild(gameInfo.lastChild);
  }
}


/*function aiPlay(){
  if (currentPlayer == aiPlayer) {
    aiPLayer = 
  }

}*/