import React, { useState, useEffect } from 'react';
import Square from './Square';
import { checkWinner, getAvailableMoves } from '../utils/gameHelpers';
import { getComputerMove } from '../utils/ai';

function GameBoard({ gameMode, soundOn }) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isPlayerX, setIsPlayerX] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        // Check for a winner after each move
        const winner = checkWinner(squares);
        if (winner) {
            setWinner(winner);
        } else if (!squares.includes(null)) {
            setWinner('Draw');
        } else if (gameMode === 'single' && !isPlayerX) {
            // Computer's turn
            handleComputerMove();
        }
    }, [squares, isPlayerX, gameMode]);

    const handleClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isPlayerX ? 'X' : 'O';
        setSquares(newSquares);
        setIsPlayerX(!isPlayerX);

        // Play sound effect if enabled
        if (soundOn) {
            // Play move sound
        }
    };

    const handleComputerMove = () => {
        const index = getComputerMove(squares, 'O', 'Easy'); // 'Easy' can be dynamic based on selected difficulty
        if (index !== null) {
            setTimeout(() => {
                handleClick(index);
            }, 500); // Delay for realism
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsPlayerX(true);
        setWinner(null);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            {winner && (
                <div className="mb-4">
                    {winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`}
                    <button className="btn ml-4" onClick={resetGame}>
                        Play Again
                    </button>
                </div>
            )}
            <div className="grid grid-cols-3 gap-2">
                {squares.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
