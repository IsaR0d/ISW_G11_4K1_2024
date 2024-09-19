import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCardIcon, CurrencyDollarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Layout from '../layout/Layout';
import axios from 'axios';


const MetodoPago = () => {
    const { state } = useLocation();
    const { cotizacion, pedido } = state || {};
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCotizacion = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/pedido=${pedido.id}&cotizacion=${cotizacion.id}`);
                const fetchedPedido = response.data.pedido;
                const fetchedCotizacion = response.data.cotizacion;

                // Verifica si el pedido ya está confirmado
                if (fetchedPedido.estado === 'Confirmada') {
                    navigate('/error', { state: {
                        mensaje: `El pedido #ID${fetchedPedido.id} ya tiene un transportista seleccionado.`,
                        icono: "truck"
                    } });
                    return;
                }
            } catch (err) {
                navigate('/error', { state: {
                    mensaje: err.response?.data?.message || 'Error desconocido',
                    icono: "sad"
                } });
                return;
            }
        };

        fetchCotizacion();
    }, []);

    const getPaymentIcon = (metodo) => {
        if (metodo.toLowerCase().includes('tarjeta')) {
            return <CreditCardIcon className="h-5 w-5 text-primary" />;
        } else if (metodo.toLowerCase().includes('contado')) {
            return <CurrencyDollarIcon className="h-5 w-5 text-primary" />;
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
            <div className="p-8">
                <h1 className="text-1xl font-semibold text-black mb-8">Elegí una forma de pago</h1>
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="p-1">
                        {cotizacion?.metodos_pago?.map((metodo, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${
                                    index !== cotizacion.metodos_pago.length - 1 ? 'border-b border-gray-200' : ''
                                }`}
                                onClick={() => handlePaymentSelection(metodo)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full">
                                        {getPaymentIcon(metodo)}
                                    </div>
                                    <span className="text-gray-700">{metodo}</span>
                                </div>
                                <ChevronRightIcon className="h-6 w-6 mr-0 text-gray-400" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MetodoPago;
