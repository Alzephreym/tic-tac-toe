document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const rematchButton = document.querySelector(".rematch");
    const notification = document.querySelector(".notification");
    const notificationText = document.querySelector(".notification h3");
    const player1Score = document.querySelector(".player1 .score");
    const player2Score = document.querySelector(".player2 .score");
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "Joueur 1";
    let gameActive = true;

    let player1Victories = 0;
    let player2Victories = 0;

    const icons = {
        X: '<ion-icon name="close-outline"></ion-icon>',
        O: '<ion-icon name="ellipse-outline"></ion-icon>'
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                if (currentPlayer === "Joueur 1") {
                    player1Victories++;
                    notificationText.textContent = `Le joueur 1 a gagné`;
                } else {
                    player2Victories++;
                    notificationText.textContent = `Le joueur 2 a gagné`;
                }
                notification.style.display = "block";
                updateScore();
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            notificationText.textContent = "Match nul !";
            notification.style.display = "block";
        }
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer === "Joueur 1" ? "X" : "O";
        e.target.innerHTML = icons[board[index]];
        checkWinner();
        currentPlayer = currentPlayer === "Joueur 1" ? "Joueur 2" : "Joueur 1";

        if (gameActive) {
            statusText.textContent = `Au tour du ${currentPlayer}`;
        }
    };

    const resetGame = () => {
        board.fill("");
        cells.forEach(cell => cell.innerHTML = "");
        gameActive = true;
        currentPlayer = "Joueur 1";
        statusText.textContent = "Au tour du joueur 1";
        notification.style.display = "none";
    };

    const rematch = () => {
        resetGame();
    };

    const updateScore = () => {
        player1Score.textContent = "l".repeat(player1Victories);
        player2Score.textContent = "l".repeat(player2Victories);
    };

    rematchButton.addEventListener("click", rematch);
    cells.forEach(cell => cell.addEventListener("click", handleClick));
});
