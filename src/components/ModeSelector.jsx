import React from 'react';

function ModeSelector({ setGameMode }) {
    return (
        <div className="flex flex-col items-center space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Choose Game Mode</h2>
            <button
                className="btn"
                onClick={() => setGameMode('single')}
            >
                Single Player
            </button>
            <button
                className="btn"
                onClick={() => setGameMode('multiplayer')}
            >
                Local Multiplayer
            </button>
        </div>
    );
}

export default ModeSelector;
