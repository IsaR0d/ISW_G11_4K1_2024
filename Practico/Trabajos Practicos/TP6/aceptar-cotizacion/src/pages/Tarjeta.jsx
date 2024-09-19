import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Cards from "react-credit-cards-2";
import { IMaskInput } from 'react-imask';
import { validateNumber, validateName, validateExpiry, validateCvc, validatePin, validateTipoDoc, validateNroDoc } from '../services/validarTarjeta';
import axios from 'axios';

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
        tipoDoc: "",
        nroDoc: ""
    });
    const [validationResults, setValidationResults] = useState({
        number: null,
        name: null,
        expiry: null,
        cvc: null,
        pin: null,
        tipoDoc: null,
        nroDoc: null
    });
    const [shouldValidate, setShouldValidate] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["number", "name", "expiry", "cvc", "pin", "tipoDoc", "nroDoc"];
    const validators = [validateNumber, validateName, validateExpiry, validateCvc, validatePin, validateTipoDoc, validateNroDoc];
    const maxAllowedLength = [19, 40, 7, 3, 4, 10, 9];
    const onlyNumbers = [true, false, false, true, true, false, false];
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= maxAllowedLength[currentStep]) {
            if (onlyNumbers[currentStep] === !isNaN(value) || !onlyNumbers[currentStep]) {
                setValues((prev) => {
                    const newValues = { ...prev, [name]: value.toUpperCase() };
                    if (shouldValidate){
                        validarStep(newValues);
                    }
                    return newValues;
                });
            }
        }
    };
    useEffect(() => {
        const fetchCotizacion = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/pedido=${pedido.id}&cotizacion=${cotizacion.id}`);
                const fetchedPedido = response.data.pedido;
                const fetchedCotizacion = response.data.cotizacion;

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

    const handleInputFocus = (e) => {
        setValues((prev) => ({ ...prev, focus: e.target.name }));
    };

    const handleMaskChange = (value, name) => {
        setValues(prev => {
            const newValues = { ...prev, [name]: value.toUpperCase() };
            validarStep(newValues);
            return newValues;
        });
    };

    const validarStep = (updatedValues) => {
        let validationResult;
        const field = steps[currentStep];
        let currentValidator = validators[currentStep];
        const userInput = updatedValues[field];

        if (field === "nroDoc") {
            validationResult = currentValidator(updatedValues["tipoDoc"], userInput);
        } else {
            validationResult = currentValidator(userInput);
        }

        setValidationResults((prev) => ({ ...prev, [field]: validationResult }));

        return validationResult;
    };

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

    const handleKeyDown = (e) => {
        if (e.key === "Tab" && !validarStep(values) === true ) {
            e.preventDefault();
        }
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
                                <IMaskInput
                                    mask="0000 0000 0000 0000"
                                    name="number"
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    value={values.number}
                                    placeholder="Número de tarjeta"
                                    onAccept={(value) => handleMaskChange(value, 'number')}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
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
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    placeholder="Nombre"
                                    value={values.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
                                />
                                <div className={getErrorMessageClassName('name')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.name}
                                </div>
                            </div>

                            <div className="w-full flex-shrink-0">
                                <IMaskInput
                                    mask="00/00"
                                    name="expiry"
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    value={values.expiry}
                                    placeholder="MM/AA"
                                    onAccept={(value) => handleMaskChange(value, 'expiry')}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
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
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    placeholder="CVC"
                                    value={values.cvc}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
                                />
                                <div className={getErrorMessageClassName('cvc')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.cvc}
                                </div>
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="password"
                                    name="pin"
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    placeholder="PIN"
                                    value={values.pin}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
                                />
                                <div className={getErrorMessageClassName('pin')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.pin}
                                </div>
                            </div>

                            <div className="w-full flex-shrink-0">
                                <select
                                    type="select"
                                    name="tipoDoc"
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    placeholder="Tipo de documento"
                                    value={values.tipoDoc}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
                                >
                                    <option value="">Tipo de documento</option>
                                    <option value="DNI">DNI</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>

                                <div className={getErrorMessageClassName('tipoDoc')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.tipoDoc}
                                </div>
                            </div>

                            <div className="w-full flex-shrink-0">
                                <input
                                    type="text"
                                    name="nroDoc"
                                    className="form-control p-2 border rounded w-full focus:outline-secondary"
                                    placeholder="Número de documento"
                                    value={values.nroDoc}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={() => setValues(prev => ({ ...prev, focus: "" }))}
                                    required
                                    onKeyDown={handleKeyDown}
                                    autoComplete='off'
                                />
                                <div className={getErrorMessageClassName('nroDoc')}>
                                    <i className="error-icon fas fa-exclamation-circle"></i>
                                    {validationResults.nroDoc}
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
