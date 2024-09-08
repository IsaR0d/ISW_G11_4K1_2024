import React from 'react';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';

const Tarjeta = () => {
    const { state } = useLocation();
    const { cotizacion, pedido, metodo } = state || {};
    const navigate = useNavigate();

    const handleConfirmar = () => {
        navigate("/confirmacion", { state: {
            cotizacion, pedido, metodo
        } });
    }

    return (
        <Layout footerType={"simple"} siguienteAccion={handleConfirmar}>
            <div className="max-h-screen p-8">
                <h1 className="text-1xl font-semibold text-black mb-8">Ingresá los datos de tu tarjeta</h1>

                {/* Inputs */}
                <div>

                </div>
            </div>

        </Layout>
    );
};

export default Tarjeta;
