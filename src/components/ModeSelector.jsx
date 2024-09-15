// src/components/ModeSelector.jsx
import React, { useState } from 'react';

function ModeSelector({ setGameMode }) {
    const [difficulty, setDifficulty] = useState('Easy');

    const startSinglePlayer = () => {
        setGameMode({ mode: 'single', difficulty });
    };

    const startMultiplayer = () => {
        setGameMode({ mode: 'multiplayer' });
    };

    return (
        <div className="flex flex-col items-center space-y-6 mt-8">
            <h2 className="text-2xl font-semibold text-orange-700">Choose Game Mode</h2>
            <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                    <button className="btn" onClick={startSinglePlayer}>
                        Single Player
                    </button>
                    <select
                        className="select"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
                <button className="btn-secondary" onClick={startMultiplayer}>
                    Local Multiplayer
                </button>
            </div>
        </div>
    );
}

export default ModeSelector;
