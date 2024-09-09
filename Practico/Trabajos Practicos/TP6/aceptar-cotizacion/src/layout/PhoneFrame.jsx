import React from 'react';

const PhoneFrame = ({ children }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative h-[80vh] w-[19vw] min-w-[330px] min-h-[650px] bg-white border-8 border-black rounded-[40px] shadow-lg overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[50%] h-[3.7%] bg-black rounded-b-[15px] z-10">
                    <div className="absolute top-1 left-[25%] w-[10px] h-[10px] bg-gray-800 rounded-full"></div> {/* Cámara frontal */}
                    <div className="absolute top-1 right-[25%] w-[10px] h-[10px] bg-gray-800 rounded-full"></div> {/* Sensor */}
                    <div className="absolute top-1 left-[40%] w-[20%] h-[5px] bg-gray-600 rounded-full"></div> {/* Altavoz */}
                </div>
                {/* Contenedor*/}
                <div className="w-full h-full overflow-auto">
                    {children}
                </div>

                {/* Barra de historial */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[100px] h-[5px] bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
};

export default PhoneFrame;
