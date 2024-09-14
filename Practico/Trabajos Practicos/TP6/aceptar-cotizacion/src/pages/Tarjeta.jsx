import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import { validateNumber, validateName, validateExpiry, validateCvc, validatePin } from '../services/validarTarjeta';

const Tarjeta = () => {
    const { state } = useLocation();
    const { cotizacion, pedido, metodo } = state || {};
    const [confirmar, setConfirmar] = useState(false);
    const [volvemos, setVolvemos] = useState(false);
    const [values, setValues] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
        pin: "",
    });
    const [validationResults, setValidationResults] = useState({
        number: null,
        name: null,
        expiry: null,
        cvc: null,
        pin: null,
    });
    const [shouldValidate, setShouldValidate] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["number", "name", "expiry", "cvc", "pin"];
    const validators = [validateNumber, validateName, validateExpiry, validateCvc, validatePin];
    const maxAllowedLength = [16, 50, 5, 4, 6];
    const onlyNumbers = [true, false, false, true, true];
    const navigate = useNavigate();

const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value.length <= maxAllowedLength[currentStep]) {
        if (onlyNumbers[currentStep] === !isNaN(value) || !onlyNumbers[currentStep]) {
            setValues((prev) => {
                const newValues = { ...prev, [name]: value };
                validarStep(newValues);

                return newValues;
            });
        }
    }
};

    const handleInputFocus = (e) => {
        setValues((prev) => ({ ...prev, focus: e.target.name }));
    };
    const validarStep = (updatedValues) => {
        if (!shouldValidate) return;
    
        const currentValidator = validators[currentStep];
        const field = steps[currentStep];
        const validationResult = currentValidator(updatedValues[field]);
        setValidationResults((prev) => ({ ...prev, [field]: validationResult }));
    
        return validationResult;
    }
    

    const handleSiguiente = () => {
        setShouldValidate(true);

        if (validarStep(values) === true) {
            setCurrentStep((prev) => {
                if (prev < steps.length - 1) {
                    setShouldValidate(false);
                    return prev + 1;
                } else {
                    setConfirmar(true);
                    return prev;
                }
            });
        }
    };

    const handleAnterior = () => {
        setCurrentStep((prev) => {
            if (prev > 0) {
                return prev - 1;
            } else {
                setVolvemos(true);
                return 0;
            }
        });
    };

    useEffect(() => {
        if (confirmar) {
            navigate("/confirmacion", { state: { cotizacion, pedido, metodo, datosTarjeta: values } });
            setConfirmar(false);
        }
        if (volvemos) {
            navigate(-1);
            setVolvemos(false);
        }
    }, [confirmar, volvemos, navigate, cotizacion, pedido, metodo]);

    const getErrorMessageClassName = (name) => {
        return validationResults[name] !== true && shouldValidate ? 'flex items-center text-red-500 text-sm mt-1' : 'hidden';
    };

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
                    <div className="relative w-full overflow-hidden mt-4">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentStep * 100}%)` }}
                        >
                            <div className="w-full flex-shrink-0 relative">
                                <input
                                    type="text"
                                    name="number"
                                    className="form-control p-2 border rounded w-full focus:outline-none"
                                    value={values.number}
                                    placeholder="Número de tarjeta"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                                <div className={getErrorMessageClassName('number')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.number}
                                </div>
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
                                <div className={getErrorMessageClassName('name')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.name}
                                </div>
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="text"
                                    name="expiry"
                                    className="form-control p-2 border rounded w-full"
                                    placeholder="Fecha de vencimiento (MM/YY)"
                                    value={values.expiry}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                />
                                <div className={getErrorMessageClassName('expiry')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.expiry}
                                </div>
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
                                <div className={getErrorMessageClassName('cvc')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.cvc}
                                </div>
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
                                <div className={getErrorMessageClassName('pin')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.pin}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Tarjeta;
