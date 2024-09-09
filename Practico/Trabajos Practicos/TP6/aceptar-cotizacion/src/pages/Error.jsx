import React from 'react';
import Layout from '../layout/Layout';
import { TruckIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

const Error = () => {
    const { state } = useLocation();
    const { mensaje, icono } = state || {};

    const getIcon = (icono) => {
        switch (icono) {
            case 'truck':
                return <TruckIcon className="w-24 h-24 text-black mb-4" />;
            case 'sad':
                return <FaceFrownIcon className="w-24 h-24 text-black mb-4" />;
            default:
                return null;
        }
    };

    return (
        <Layout footerType={"default"} headerType={"default"}>
            <div className="flex flex-col items-center justify-center mt-20 py-10">

                {getIcon(icono)}

                <p className="text-lg font-semibold p-4 text-center text-black">
                    {mensaje}
                </p>
            </div>
        </Layout>
    );
};

export default Error;
