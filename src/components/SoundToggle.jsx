import React from 'react';

function SoundToggle({ soundOn, setSoundOn }) {
    return (
        <button
            className="fixed bottom-4 right-4 p-2 bg-white rounded-full shadow-md"
            onClick={() => setSoundOn(!soundOn)}
        >
            {soundOn ? '🔊' : '🔇'}
        </button>
    );
}

export default SoundToggle;
