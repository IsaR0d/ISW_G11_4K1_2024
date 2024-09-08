import React from 'react';

const Modal = ({
        nombreImagen,
        titulo,
        descripcion,
        textoBotonPrincipal,
        accionBotonPrincipal,
        textoBotonSecundario,
        accionBotonSecundario,
        onClose
    }) => {
        const imageSrc = nombreImagen === 'Success' ? '/Success.png' : '/Fail.png';

        return (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
                <div className="bg-white rounded-lg w-80 p-6 relative shadow-lg mb-10">
                    <img src={imageSrc} alt={nombreImagen} className="w-40 h-40 mx-auto mb-4" />
                    <h2 className="text-black text-center text-lg font-semibold mt-10 mb-4">{titulo}</h2>
                    <p className="text-gray-500 text-center text-sm mb-2">{descripcion}</p>
                    <button
                        onClick={accionBotonPrincipal}
                        className="bg-primary text-white py-2 w-full text-sm font-semibold rounded-lg mt-7 mb-2 hover:bg-primaryLight transition"
                    >
                        {textoBotonPrincipal}
                    </button>
                    <button
                        onClick={accionBotonSecundario}
                        className="text-gray-500 py-2 w-full text-sm font-semibold rounded-lg hover:bg-gray-100 transition"
                    >
                        {textoBotonSecundario}
                    </button>
                </div>
            </div>
        );
    };

export default Modal;
