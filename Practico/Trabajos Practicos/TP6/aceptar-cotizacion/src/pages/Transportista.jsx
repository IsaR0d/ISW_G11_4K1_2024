import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import { procesarPago } from '../services/procesarPago';
import { enviarCorreoConfirmacion } from '../services/mail';


export function Transportista()
{
    const Confirmacion = () => {
        const { state } = useLocation();
        const navigate = useNavigate();
        const { cotizacion, pedido, metodo } = state || {};
        const [isModalOpen, setModalOpen] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [modalContent, setModalContent] = React.useState({});
        const isTarjeta = metodo.toLowerCase().includes('tarjeta');
    
    
        return (
            <div className='flex flex-col h-full bg-white overflow-hidden'>

            </div>
        );
    };
    
}