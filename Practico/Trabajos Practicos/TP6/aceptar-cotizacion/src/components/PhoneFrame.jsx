import React from 'react';

const PhoneFrame = ({ children }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative w-[375px] h-[812px] bg-white border-8 border-black rounded-[40px] shadow-lg overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[210px] h-[30px] bg-black rounded-b-[15px] z-10"></div>
                {/* Contenedor*/}
                <div className="w-full h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PhoneFrame;
