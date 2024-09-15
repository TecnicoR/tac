// src/components/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import Square from './Square';
import { checkWinner } from '../utils/gameHelpers';
import { getComputerMove } from '../utils/ai';
import { motion } from 'framer-motion';

// Import sound files
import moveSound from '../assets/sounds/move.wav';
import winSound from '../assets/sounds/win.mp3';
import loseSound from '../assets/sounds/lose.mp3';
import drawSound from '../assets/sounds/over.mp3';

function GameBoard({ gameMode, soundOn, setGameMode }) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const { mode, difficulty } = gameMode;

    // Symbols for player and AI
    const playerSymbol = 'X';
    const aiSymbol = 'O';

    // Load game state from sessionStorage on mount
    useEffect(() => {
        const savedState = sessionStorage.getItem('gameState');
        if (savedState) {
            const state = JSON.parse(savedState);
            setSquares(state.squares);
            setIsPlayerTurn(state.isPlayerTurn);
            setWinner(state.winner);
            setGameOver(state.gameOver);
        }
    }, []);

    // Save game state to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem(
            'gameState',
            JSON.stringify({ squares, isPlayerTurn, winner, gameOver })
        );
    }, [squares, isPlayerTurn, winner, gameOver]);

    // Check for winner or draw whenever squares change
    useEffect(() => {
        const gameResult = checkWinner(squares);
        if (gameResult) {
            setWinner(gameResult);
            setGameOver(true);
        } else if (!squares.includes(null)) {
            setWinner('Draw');
            setGameOver(true);
        }
    }, [squares]);

    // Handle AI move when it's the AI's turn and the game is not over
    useEffect(() => {
        if (mode === 'single' && !isPlayerTurn && !gameOver) {
            handleComputerMove();
        }
    }, [isPlayerTurn, mode, gameOver]);

    const handleClick = (index) => {
        if (squares[index] || gameOver) return;

        if (mode === 'single' && !isPlayerTurn) {
            // It's the AI's turn; player cannot make a move
            return;
        }

        const newSquares = squares.slice();
        const currentSymbol = mode === 'single' ? playerSymbol : isPlayerTurn ? 'X' : 'O';
        newSquares[index] = currentSymbol;
        setSquares(newSquares);

        if (soundOn) {
            playSound('move');
        }

        setIsPlayerTurn(!isPlayerTurn);
    };

    const handleComputerMove = () => {
        if (gameOver) return; // Prevent AI from moving after game over

        const aiMoveIndex = getComputerMove(squares, aiSymbol, difficulty);

        if (aiMoveIndex !== null) {
            setTimeout(() => {
                const newSquares = squares.slice();
                newSquares[aiMoveIndex] = aiSymbol;
                setSquares(newSquares);

                if (soundOn) {
                    playSound('move');
                }

                setIsPlayerTurn(!isPlayerTurn);
            }, 500); // Delay for realism
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
        setGameOver(false);
        sessionStorage.removeItem('gameState');
    };

    const backToMenu = () => {
        resetGame();
        setGameMode(null);
    };

    // Sound effect function
    const playSound = (type) => {
        let audioSrc = null;
        switch (type) {
            case 'move':
                audioSrc = moveSound;
                break;
            case 'win':
                audioSrc = winSound;
                break;
            case 'lose':
                audioSrc = loseSound;
                break;
            case 'draw':
                audioSrc = drawSound;
                break;
            default:
                break;
        }
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play();
        }
    };

    useEffect(() => {
        // Play sound on game over
        if (gameOver && soundOn) {
            if (winner === 'Draw') {
                playSound('draw');
            } else if (winner === playerSymbol) {
                playSound('win');
            } else {
                playSound('lose');
            }
        }
    }, [gameOver, winner, soundOn]);

    const renderStatusMessage = () => {
        if (winner) {
            if (winner === 'Draw') {
                return "It's a draw!";
            } else {
                return `${winner} wins!`;
            }
        } else {
            if (mode === 'single') {
                return isPlayerTurn ? 'Your turn' : "Computer's turn";
            } else {
                return isPlayerTurn ? "Player X's turn" : "Player O's turn";
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-4 w-full px-4">
            <div className="flex justify-between w-full max-w-md mb-4">
                <button className="btn-secondary" onClick={backToMenu}>
                    Back to Menu
                </button>
                <button className="btn-secondary" onClick={resetGame}>
                    Reset Game
                </button>
            </div>
            <motion.div
                className="mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={winner || isPlayerTurn}
            >
                <p className="text-2xl font-bold text-orange-700">
                    {renderStatusMessage()}
                </p>
            </motion.div>
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
