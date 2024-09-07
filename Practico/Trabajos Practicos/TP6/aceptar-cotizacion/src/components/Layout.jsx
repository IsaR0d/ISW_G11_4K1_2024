import React from 'react';
import {
    ArrowLeftIcon,
    ClipboardDocumentListIcon,
    MapPinIcon,
    BellAlertIcon,
    UserCircleIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

const Layout = ({ children, footerType, headerType }) => {
    return (
        <div className={`flex flex-col min-h-screen bg-gray-100`}>
            {/* Header */}
            <header
                className={`p-4 flex items-center justify-between ${
                    headerType === 'default' ? 'bg-primary text-white' : 'bg-transparent'
                }`}
            >
                {/* Botón de "Back" visible solo en mobile */}
                <button
                    className={`block ${headerType === 'default' ? 'text-white md:hidden' : 'text-black'}`}
                    onClick={() => window.history.back()}
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>

                {/* Logo y título visibles solo en web */}
                <div className={`flex items-center space-x-2 ${headerType === 'default' ? 'md:block' : 'hidden'}`}>
                    {/*<img src="/logo.png" alt="Logo" className="h-8 w-8" />*/}
                    <span className="text-lg font-semibold">TANGO APP</span>
                </div>

                {/* Navbar visible solo en web cuando headerType es 'default' */}
                {headerType === 'default' && (
                    <nav className="space-x-4 hidden md:flex">
                        <a href="#" className="flex items-center space-x-1">
                            <ClipboardDocumentListIcon className="h-5 w-5" />
                            <span>Mis pedidos</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1">
                            <MapPinIcon className="h-5 w-5" />
                            <span>Mapa</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1">
                            <BellAlertIcon className="h-5 w-5" />
                            <span>Notificaciones</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1">
                            <UserCircleIcon className="h-5 w-5" />
                            <span>Mi perfil</span>
                        </a>
                    </nav>
                )}
            </header>

            {/* Contenido principal */}
            <main className="flex-grow p-4">{children}</main>

            {/* Footer dinámico */}
            {footerType === 'default' && (
                <footer className="bg-white p-2 fixed bottom-0 left-0 right-0 flex justify-around md:hidden pb-5"
                    style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)' }}
                >
                    <button className="flex flex-col items-center text-gray-400 w-1/5">
                        <ClipboardDocumentListIcon className="h-6 w-6" />
                        
                    </button>
                    <button className="flex flex-col items-center text-gray-400 w-1/5">
                        <MapPinIcon className="h-6 w-6" />
                        
                    </button>
                    <button className="flex flex-col items-center text-primary w-1/5">
                        <PlusIcon className="h-10 w-10 bg-white rounded-full -mt-4 border-4 border-white shadow-lg" />
                    </button>
                    <button className="flex flex-col items-center text-gray-400 w-1/5">
                        <BellAlertIcon className="h-6 w-6" />
                        
                    </button>
                    <button className="flex flex-col items-center text-gray-400 w-1/5">
                        <UserCircleIcon className="h-6 w-6" />
                        
                    </button>
                </footer>
            )}

            {footerType === 'simple' && (
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
                    >
                        Siguiente
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Layout;
