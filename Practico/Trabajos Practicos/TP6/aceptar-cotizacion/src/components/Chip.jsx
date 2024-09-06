// src/components/Chip.jsx
import React from 'react';

const Chip = ({ texto }) => {
    return (
        <div className="bg-blue-100 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full mr-2 flex items-center justify-center">
            {texto}
        </div>
    );
};

export default Chip;
