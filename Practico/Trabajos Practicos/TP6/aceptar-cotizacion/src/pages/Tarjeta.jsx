import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import { validarNumero, getMarca } from '../services/validarTarjeta';
import { procesarPago } from '../services/procesarPago';


const Tarjeta = () => {
    const { state } = useLocation();
    const { cotizacion, pedido, metodo } = state || {};
    const [ confirmar, setConfirmar ] = useState(false);
    const [ volver, setVolver ] = useState(false);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
        pin: "",
    });

    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["number", "name", "expiry", "cvc", "pin"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (e) => {
        setValues((prev) => ({ ...prev, focus: e.target.name }));
    };


    const handleSiguiente = () => {
        setCurrentStep((prev) => {
            if (prev < steps.length - 1) {
                return prev + 1;
            } else {
                setConfirmar(true);
                return prev;
            }
        });
    };

    const handleAnterior = () => {
        setCurrentStep((prev) => {
            if (prev > 0) {
                return prev - 1;
            } else {
                setVolver(true);
                return 0;
            }
        });
    };

    useEffect(() => {
        if (confirmar) {
            navigate("/confirmacion", { state: { cotizacion, pedido, metodo } });
            setConfirmar(false);
        }
        else if (volver) {
            navigate(-1);
            setVolver(false);
        }
    }, [confirmar, volver, navigate, cotizacion, pedido, metodo]);

    return (
        <Layout footerType={"simple"} anteriorAccion={handleAnterior} siguienteAccion={handleSiguiente}>
            <div className="max-h-screen p-8">
                <h1 className="text-1xl font-semibold text-black mb-8">Ingresa los datos de tu tarjeta</h1>

                <div className="relative flex flex-col items-center">
                    <div className="mb-6">
                        <Cards
                            number={values.number}
                            expiry={values.expiry}
                            cvc={values.cvc}
                            name={values.name}
                            focused={values.focus}
                        />
                    </div>

                    {/* Contenedor para los inputs */}
                    <div className="relative w-full overflow-hidden mt-4">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentStep * 100}%)` }}
                        >
                            <div className="w-full flex-shrink-0 relative">
                                <input
                                    type="number"
                                    name="number"
                                    className={`form-control p-2 border rounded w-full focus:outline-none`}
                                    value={values.number}
                                    placeholder="Número de tarjeta"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control p-2 border rounded w-full"
                                    placeholder="Nombre"
                                    value={values.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="text"
                                    name="expiry"
                                    className="form-control p-2 border rounded w-full"
                                    placeholder="Fecha de vencimiento (MM/AA)"
                                    value={values.expiry}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="text"
                                    name="cvc"
                                    className="form-control p-2 border rounded w-full"
                                    placeholder="CVC"
                                    value={values.cvc}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="number"
                                    name="pin"
                                    className="form-control p-2 border rounded w-full"
                                    placeholder="PIN"
                                    value={values.pin}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Tarjeta;