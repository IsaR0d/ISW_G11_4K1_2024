import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCardIcon, CurrencyDollarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

const MetodoPago = () => {
    const { state } = useLocation();
    const { cotizacion, pedido } = state || {};
    const navigate = useNavigate();

    const getPaymentIcon = (metodo) => {
        if (metodo.toLowerCase().includes('tarjeta')) {
            return <CreditCardIcon className="h-6 w-6 text-gray-600" />;
        } else if (metodo.toLowerCase().includes('contado')) {
            return <CurrencyDollarIcon className="h-6 w-6 text-gray-600" />;
        }
        return null;
    };

    const handlePaymentSelection = (metodo) => {
        const path = metodo.toLowerCase().includes('tarjeta') ? '/tarjeta' : '/confirmacion';
        navigate(path, { state: {
            cotizacion, pedido, metodo
        } });
    };

    return (
        <Layout>
            <div className="max-h-screen p-8">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h1 className="text-1xl font-semibold text-black mb-8">Elegí una forma de pago</h1>
                        
                        <div className="space-y-4">
                            {cotizacion?.metodos_pago?.map((metodo, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                                    onClick={() => handlePaymentSelection(metodo)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full">
                                            {getPaymentIcon(metodo)}
                                        </div>
                                        <span className="text-gray-700">{metodo}</span>
                                    </div>
                                    <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="bg-white p-4 fixed bottom-0 left-0 right-0 flex justify-between items-center"
                style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)' }}
            >
                <span className="text-black font-semibold text-xl">Pagás</span>
                <span className="text-black font-bold text-xl">{cotizacion?.precio ? `$${cotizacion.precio}` : 'N/A'}</span>
            </footer>
        </Layout>
    );
};

export default MetodoPago;
