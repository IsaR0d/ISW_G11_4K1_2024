import React from 'react';
import { TruckIcon } from '@heroicons/react/24/outline';

const Notificacion = ({ title, message }) => {
    return (
        <div className="p-4">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full border-4 border-primary">
                    <TruckIcon className="w-8 h-8 m-1" />
                </div>
                <div className="ml-4">
                    <div className="font-bold text-lg">{title}</div>
                    <div className="mt-1 text-sm">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default Notificacion;
