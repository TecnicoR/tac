// src/components/WinningLine.jsx
import React from 'react';
import { motion } from 'framer-motion';

function WinningLine({ line }) {
    let lineClass = '';

    if (arraysEqual(line, [0, 1, 2])) {
        lineClass = 'line-horizontal top-1/6';
    } else if (arraysEqual(line, [3, 4, 5])) {
        lineClass = 'line-horizontal top-1/2';
    } else if (arraysEqual(line, [6, 7, 8])) {
        lineClass = 'line-horizontal bottom-1/6';
    } else if (arraysEqual(line, [0, 3, 6])) {
        lineClass = 'line-vertical left-1/6';
    } else if (arraysEqual(line, [1, 4, 7])) {
        lineClass = 'line-vertical left-1/2';
    } else if (arraysEqual(line, [2, 5, 8])) {
        lineClass = 'line-vertical right-1/6';
    } else if (arraysEqual(line, [0, 4, 8])) {
        lineClass = 'line-diagonal-1';
    } else if (arraysEqual(line, [2, 4, 6])) {
        lineClass = 'line-diagonal-2';
    }

    return (
        <div className="absolute inset-0">
            <motion.div
                className={`absolute bg-red-500 ${lineClass}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
            ></motion.div>
        </div>
    );
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export default WinningLine;
