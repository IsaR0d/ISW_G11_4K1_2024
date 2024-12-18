import React from 'react';

const Estrellas = ({ rating, cantidadResenas }) => {
    const estrellas = Array.from({ length: 5 }, (_, index) => index < rating ? '★' : '☆');

    return (
        <div className="flex items-center text-yellow-400 text-lgn">
            <span>{estrellas}</span>
            <span className="text-gray-500 text-xs ml-2">{rating} ({cantidadResenas})</span>
        </div>
    );
};

export default Estrellas;
