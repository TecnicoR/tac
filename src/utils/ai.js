import { getAvailableMoves, checkWinner } from './gameHelpers';

export function getComputerMove(squares, aiPlayer, difficulty) {
    const availableMoves = getAvailableMoves(squares);

    if (difficulty === 'Easy') {
        // Random move
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    // Medium and Hard AI logic will be implemented later
    return null;
}
