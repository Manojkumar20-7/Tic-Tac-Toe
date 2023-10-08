const board = document.getElementById("board");
const cells = [];
let currentPlayer = "X";
let gameActive = true;
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.cell = i;
    board.appendChild(cell);
    cells.push(cell);
    cell.addEventListener("click", handleCellClick);
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.cell;

    if (!gameActive || cells[cellIndex].textContent !== "") return;

    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].style.color = currentPlayer === "X" ? "#007bff" : "#f00";

    if (checkWin()) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
    } else if (checkDraw()) {
        gameActive = false;
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
        const [a,b,c] = pattern;
        return (
            cells[a].textContent !== "" &&cells[a].textContent === cells[b].textContent &&cells[a].textContent === cells[c].textContent
        );
    });
}

function checkDraw() {
    return cells.every((cell) => cell.textContent !== "");
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.color = "";
    });
    currentPlayer = "X";
    gameActive = true;
    message.textContent = "Player X's turn";
}
message.textContent = "Player X's turn";
