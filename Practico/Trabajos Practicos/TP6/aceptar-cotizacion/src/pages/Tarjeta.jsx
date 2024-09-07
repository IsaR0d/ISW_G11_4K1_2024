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
        <Layout>
            <div className="max-h-screen p-8">
                <h1 className="text-1xl font-semibold text-black mb-8">Ingresá los datos de tu tarjeta</h1>

                {/* Inputs */}
                <div>

                </div>

                {/* Footer */}
                <footer className="bg-white p-2 fixed bottom-0 left-0 right-0 flex justify-between pb-4"
                    style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)' }}
                >
                    <button
                        className="text-gray-500 ml-4 font-semibold"
                        onClick={() => window.history.back()}
                    >
                        Anterior
                    </button>
                    <button
                        className="text-primary mr-4 font-semibold"
                        onClick={handleConfirmar}
                    >
                        Siguiente
                    </button>
                </footer>
            </div>

        </Layout>
    );
};

export default Tarjeta;
