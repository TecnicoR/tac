// src/components/Square.jsx
import React from 'react';
import { motion } from 'framer-motion';

function Square({ value, onClick }) {
    return (
        <motion.button
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white border-2 border-orange-500 text-4xl font-bold flex items-center justify-center focus:outline-none"
            onClick={onClick}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: value ? [0, 1] : 1 }}
            transition={{ duration: 0.2 }}
        >
            {value}
        </motion.button>
    );
}

export default Square;
