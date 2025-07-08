
'use strict';

const ticTacToeGame = (() => {
    let board;
    let curPlayer;

    const initializeGame = () => {
        board = [];
        for (let i = 0; i < 3; i++) 
            board[i] = new Array(3).fill(null)
        curPlayer = 'O';
    }

    const placeMarker = () => {
        let loc = (+prompt("where to put your marker?")) - 1;
        board[Math.floor(loc/3)][loc%3] = curPlayer;
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

    const playGame = () => {
        initializeGame();
        for (let i = 0; i < 9; i++) {
            placeMarker();
            console.log(board);
            if (checkWin()) {
                console.log(`Player ${curPlayer == 'O'? 1 : 2} wins!`);
                return;
            }
            curPlayer = curPlayer === 'O' ? 'X' : 'O';
        }
        console.log("It's a tie!");
    };

    return {playGame}
})();

ticTacToeGame.playGame();