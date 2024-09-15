// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import GameBoard from './components/GameBoard';
import SoundToggle from './components/SoundToggle';

function App() {
    const [gameMode, setGameMode] = useState(null); // { mode: 'single' | 'multiplayer', difficulty: 'Easy' | 'Medium' | 'Hard' }
    const [soundOn, setSoundOn] = useState(true);

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center">
            <Header />
            {!gameMode ? (
                <ModeSelector setGameMode={setGameMode} />
            ) : (
                <GameBoard gameMode={gameMode} soundOn={soundOn} setGameMode={setGameMode} />
            )}
            <SoundToggle soundOn={soundOn} setSoundOn={setSoundOn} />
        </div>
    );
}

export default App;
