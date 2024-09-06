// src/components/Estrellas.jsx
import React from 'react';

const Estrellas = ({ rating, cantidadResenas }) => {
    const estrellas = Array.from({ length: 5 }, (_, index) => index < rating ? '★' : '☆');

    return (
        <div className="flex items-center text-yellow-400 text-lg">
            <span>{estrellas.join(' ')}</span>
            <span className="text-black text-xs ml-2">{rating} ({cantidadResenas})</span>
        </div>
    );
};

export default Estrellas;
