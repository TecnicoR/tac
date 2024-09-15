// src/components/SoundToggle.jsx
import React from 'react';

function SoundToggle({ soundOn, setSoundOn }) {
    return (
        <button
            className="fixed bottom-4 right-4 p-2 bg-white rounded-full shadow-md focus:outline-none"
            onClick={() => setSoundOn(!soundOn)}
            aria-label="Toggle Sound"
        >
            {soundOn ? (
                "up"
                // <VolumeUpIcon className="h-6 w-6 text-orange-500" />
            ) : (
                // <VolumeOffIcon className="h-6 w-6 text-orange-500" />
                "down"
            )}
        </button>
    );
}

export default SoundToggle;
