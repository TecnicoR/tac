import React from 'react';
import { motion } from 'framer-motion';

function Square({ value, onClick }) {
    return (
        <motion.button
            className="w-20 h-20 bg-white border-2 border-orange-500 text-3xl font-bold flex items-center justify-center"
            onClick={onClick}
            whileTap={{ scale: 0.9 }}
        >
            {value}
        </motion.button>
    );
}

export default Square;
