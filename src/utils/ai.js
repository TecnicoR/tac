// src/utils/ai.js
import { getAvailableMoves, checkWinner } from './gameHelpers';

export function getComputerMove(squares, aiPlayer, difficulty) {
    const availableMoves = getAvailableMoves(squares);
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';

    if (difficulty === 'Easy') {
        // Random move
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    if (difficulty === 'Medium') {
        // Attempt to win or block
        // First, check if AI can win
        for (let index of availableMoves) {
            const newSquares = squares.slice();
            newSquares[index] = aiPlayer;
            if (checkWinner(newSquares) === aiPlayer) {
                return index;
            }
        }
        // Then, block human player
        for (let index of availableMoves) {
            const newSquares = squares.slice();
            newSquares[index] = humanPlayer;
            if (checkWinner(newSquares) === humanPlayer) {
                return index;
            }
        }
        // Otherwise, random move
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    if (difficulty === 'Hard') {
        // Use Minimax algorithm
        return getBestMove(squares, aiPlayer, humanPlayer);
    }

    return null;
}

function getBestMove(squares, aiPlayer, humanPlayer) {
    let bestScore = -Infinity;
    let move;
    for (let index of getAvailableMoves(squares)) {
        const newSquares = squares.slice();
        newSquares[index] = aiPlayer;
        const score = minimax(newSquares, 0, false, aiPlayer, humanPlayer);
        if (score > bestScore) {
            bestScore = score;
            move = index;
        }
    }
    return move;
}

function minimax(squares, depth, isMaximizing, aiPlayer, humanPlayer) {
    const winner = checkWinner(squares);
    if (winner === aiPlayer) return 10 - depth;
    if (winner === humanPlayer) return depth - 10;
    if (!squares.includes(null)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let index of getAvailableMoves(squares)) {
            const newSquares = squares.slice();
            newSquares[index] = aiPlayer;
            const score = minimax(newSquares, depth + 1, false, aiPlayer, humanPlayer);
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let index of getAvailableMoves(squares)) {
            const newSquares = squares.slice();
            newSquares[index] = humanPlayer;
            const score = minimax(newSquares, depth + 1, true, aiPlayer, humanPlayer);
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
}
