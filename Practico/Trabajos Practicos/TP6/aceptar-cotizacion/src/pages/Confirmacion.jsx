import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import { procesarPago } from '../services/procesarPago';
import { enviarCorreoConfirmacion } from '../services/mail';

const Confirmacion = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { cotizacion, pedido, metodo, datosTarjeta } = state || {};
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({});
    const isTarjeta = metodo.toLowerCase().includes('tarjeta');


    const confirmarPedido = async (numeroPago) => {
        const response = await fetch("http://localhost:4000/api/confirmar", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPedido: pedido.id,
                metodo_pago: metodo,
                entrega_fecha: cotizacion.entrega_fecha || pedido.entrega_fecha,
                retiro_fecha: cotizacion.retiro_fecha || pedido.retiro_fecha,
                transportista: cotizacion.transportista,
                precio: cotizacion.precio,
            }),
        });

        if (!response.ok) {
            setModalContent({
                nombreImagen: "Fail",
                titulo: 'Error',
                descripcion: `Ha ocurrido un error inesperado. Por favor, intente nuevamente.`,
                textoBotonPrincipal: "Reintentar",
                accionBotonPrincipal: () => window.history.back(),
            });
            
            return;
        }

        const data = await response.json();

        setModalContent({
            nombreImagen: "Success",
            titulo: isTarjeta ? '¡Pago exitoso!' : 'Cotización confirmada',
            descripcion: `El pedido #ID${data.id} ha sido confirmado correctamente.` +
            `${numeroPago ? `Número de pago: ${numeroPago}` : ''}`,
            textoBotonPrincipal: "Ver mi pedido",
            accionBotonPrincipal: () => console.log(data),
            textoBotonSecundario: 'Contactar con el transportista',
            accionBotonSecundario: () => console.log([data.transportista.nro_telefono, data.transportista.mail]),
        });
        
        await enviarCorreoConfirmacion(`Su cotización para el pedido #ID${data.id} fue aceptada. Método de pago seleccionado: ${metodo}.`);
        
        alert(`(Simulación de notificación push) Su cotización para el pedido #ID${data.id} fue aceptada. Método de pago seleccionado: ${metodo}.`);
    }

    const handleConfirmar = async () => {
        setLoading(true);        
        try {
            
            if (isTarjeta) {
                let {ok, message, numeroPago} = await procesarPago(datosTarjeta.number, datosTarjeta.name, datosTarjeta.expiry, datosTarjeta.cvc, datosTarjeta.pin, cotizacion.precio);
                if(!ok)
                {
                    setModalContent({
                        nombreImagen: "Fail",
                        titulo: "Pago no realizado",
                        descripcion: message,
                        textoBotonPrincipal: "Intentar nuevamente",
                        accionBotonPrincipal: () => window.history.back(),
                        textoBotonSecundario: "Elegir otro medio de pago",
                        accionBotonSecundario: () => navigate(-2)
                    });
                }
                else {
                    confirmarPedido(numeroPago);
                }
            }
            else {
                confirmarPedido();
            }
    
        } catch (error) {
            setModalContent({
                nombreImagen: 'Fail',
                titulo: 'Error',
                descripcion: 'No se pudo confirmar el pedido. Inténtalo nuevamente.',
                textoBotonPrincipal: 'Reintentar',
                accionBotonPrincipal: handleConfirmar,
            });
        } finally {
            setLoading(false);
        }
    
        setModalOpen(true);
    };

    return (
        <div className='flex flex-col h-full bg-white overflow-hidden'>
            <div className="bg-primary text-white">
                {/* Header */}
                <header className="flex items-center p-4 pt-10">
                    <button
                        className="text-white"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                </header>

                <div className="p-4">
                    <h1 className="text-white text-center text-xl font-light flex-grow">Confirma la cotización</h1>

                    {/* Detalles */}
                    <div className="p-6 pb-0">

                        {/* Retiro */}
                        <div className="border-t border-white border-opacity-20 py-4">
                            <div className="flex items-center justify-between text-white text-sm mb-4">
                                <span className="font-semibold text-xs">Retiro</span>
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="h-5 w-5 text-white" />
                                    <span className="text-md font-bold">{cotizacion?.retiro_fecha || pedido?.retiro_fecha}</span>
                                </div>
                            </div>
                        </div>

                        {/* Entrega */}
                        <div className="border-t border-white border-opacity-20 py-4">
                            <div className="flex items-center justify-between text-white text-sm mb-4">
                                <span className="font-semibold text-xs">Entrega</span>
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="h-5 w-5 text-white" />
                                    <span className="text-md font-bold">{cotizacion?.entrega_fecha || pedido?.entrega_fecha}</span>
                                </div>
                            </div>
                        </div>

                        {/* Pago */}
                        <div className="border-t border-white border-opacity-20 py-4">
                            <div className="flex items-center justify-between text-white text-sm">
                                <span className="text-xs">Pagás</span>
                                <span className="text-2xl font-bold">{cotizacion?.precio ? `$${cotizacion.precio}` : 'N/A'}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-4 p-4">
                <button
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryLight transition w-full max-w-sm"
                    onClick={handleConfirmar}
                >
                    {loading ? 'Confirmando...' : 'Confirmar'}
                </button>
            </div>

            {isModalOpen && <Modal {...modalContent} onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default Confirmacion;
