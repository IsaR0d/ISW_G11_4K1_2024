import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Chip from '../components/Chip';
import Estrellas from '../components/Estrellas';
import { CalendarIcon } from '@heroicons/react/24/outline';

const DetallesCotizacion = () => {
    const { idPedido, idCotizacion } = useParams();
    const [cotizacion, setCotizacion] = useState(null);
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCotizacion = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/pedido=${idPedido}&cotizacion=${idCotizacion}`);
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

                setCotizacion(fetchedCotizacion);
                setPedido(fetchedPedido);
            } catch (err) {
                navigate('/error', { state: {
                    mensaje: err.response?.data?.message || 'Error desconocido',
                    icono: "sad"
                } });
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchCotizacion();
    }, [idPedido, idCotizacion, navigate]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    const handleConfirmar = () => {
        navigate('/metodo-pago', {
            state: {
                cotizacion,
                pedido
            }
        });
    };

    return (
        <Layout footerType={"default"} headerType={"default"} title={`Cotización #ID${cotizacion.id}`}>
            <div className="container mx-auto p-4 mb-20">
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                    {/* Precio */}
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                        <div className="text-gray-600 text-sm mb-4">Pago</div>
                        <div className='flex flex-col justify-center'>
                            <div className="text-black text-4xl font-bold text-center mt-2 mb-4">${cotizacion.precio}</div>
                            <div className="flex flex-col gap-2 mt-2 justify-center">
                                {Array.isArray(cotizacion.metodos_pago) && cotizacion.metodos_pago.map((metodo, index) => (
                                    <Chip key={index} texto={metodo} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Envío */}
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                        <div className="text-gray-600 text-sm mb-4">Envío</div>
                        <div className="mt-2">
                            {/* Retiro */}
                            <div className="flex flex-col mt-2">
                                <div className="text-black text-sm font-semibold mb-2">Retiro</div>
                                <div className="flex items-center">
                                    <CalendarIcon className="w-5 h-5 text-gray-600" />
                                    <span className="text-black text-md font-bold ml-2">
                                        {cotizacion.retiro_fecha || pedido.retiro_fecha}
                                    </span>
                                </div>
                                <div className="text-gray-600 text-sm mt-1">{pedido.retiro_direccion}</div>
                            </div>

                            <hr className="my-2" />

                            {/* Entrega */}
                            <div className="flex flex-col mt-2">
                                <div className="text-black text-sm font-semibold mb-2">Entrega</div>
                                <div className="flex items-center">
                                    <CalendarIcon className="w-5 h-5 text-gray-600" />
                                    <span className="text-black text-md font-bold ml-2">
                                        {cotizacion.entrega_fecha || pedido.entrega_fecha}
                                    </span>
                                </div>
                                <div className="text-gray-600 text-sm mt-1">{pedido.entrega_direccion}</div>
                            </div>
                        </div>
                    </div>

                    {/* Transportista */}
                    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                        <div className="text-gray-600 text-sm mb-4">Transportista</div>
                        <div className='ml-1 flex flex-col justify-center'>
                            <div className="flex mt-2 mb-2">
                                <img src={`/${cotizacion.transportista.nombre}_${cotizacion.transportista.apellido}.jpg`} alt="Transportista" className="w-20 h-20 rounded-full" />
                                <div className="ml-4 flex flex-col justify-center">
                                    <div className="text-black text-md font-semibold">{cotizacion.transportista.nombre} {cotizacion.transportista.apellido}</div>
                                    <div className="text-black text-md font-semibold">{"ID: "}{cotizacion.transportista.id}</div>
                                    <Estrellas rating={cotizacion.transportista.rating} cantidadResenas={cotizacion.transportista.cantidad_resenas} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmar */}
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryLight transition w-full max-w-sm"
                        onClick={handleConfirmar}
                    >
                        Confirmar ahora
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default DetallesCotizacion;
