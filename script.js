
'use strict';

const ticTacToeGame = (() => {
    let board;
    let curPlayer;
    let curRound = 1;

    const container = document.querySelector(".container");
    const gameEnd = document.querySelector(".game-end")
    const gameEndEvent = new Event("gameEnd");

    const placeMarker = (loc) => {
        let row = Math.floor(loc/3);
        let col = loc%3;
        let originalMarker = board[row][col];
        board[row][col] ??= curPlayer;
        return originalMarker;
    };

    const checkWin = () => {
        const checkWinRow = () => {
            for (let i = 0; i < 3; i++) {
                if (board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2])
                    return true;
            }
            return false;
        };
    
        const checkWinCol = () => {
            for (let i = 0; i < 3; i++) {
                if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
                    return true;
            }
            return false;
        };
    
        const checkWinDiag = () => {
            return (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
                   (board[0][2] && board[0][2] == board[1][1] && board[1][1] == board[2][0]);
        };

        return checkWinRow() || checkWinCol() || checkWinDiag();
    };

    const initializeGame = () => {
        board = [];
        for (let i = 0; i < 3; i++) 
            board[i] = new Array(3).fill(null)
        curPlayer = 'O';
        gameEnd.classList.add('hidden');
    }

    const handleClick = (event) => {
        if (Number.isInteger(+(event.target.id)) && event.target.id !== "") {
            if (placeMarker(+event.target.id - 1)) return;
            event.target.textContent = curPlayer;
            if (checkWin()) {
                gameEnd.textContent = `Player ${curPlayer == 'O'? 1 : 2} wins!`
                container.dispatchEvent(gameEndEvent);
                return;
            }
            if (curRound == 9) {
                gameEnd.textContent = "It's a tie!";
                container.dispatchEvent(gameEndEvent);
            }
            curRound++;
            curPlayer = curPlayer === 'O' ? 'X' : 'O';
        }
    }

    const playGame = () => {

        initializeGame();

        container.addEventListener('click', handleClick);

        container.addEventListener('gameEnd', () => {
            container.removeEventListener('click', handleClick);
            gameEnd.classList.remove('hidden');
        });

    }

    return {playGame}
})();

ticTacToeGame.playGame();