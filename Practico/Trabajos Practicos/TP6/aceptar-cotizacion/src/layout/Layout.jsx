// Layout.jsx
import React from 'react';
import {
    ArrowLeftIcon,
    ClipboardDocumentListIcon,
    MapPinIcon,
    BellAlertIcon,
    UserCircleIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

const Layout = ({ children, title, footerType, headerType, anteriorAccion, siguienteAccion, actionEnabled=true }) => {
    return (
        <div className="flex flex-col flex-grow h-full w-full bg-gray-100 overflow-hidden md:relative lg: fixed">
        
            {/* Header */}
            <header
                className={`flex items-center justify-between p-4 pt-10 ${
                    headerType === 'default' ? 'bg-primary text-white' : 'bg-transparent'
                }`}
            >
                <button
                    className={`block ${headerType === 'default' ? 'text-white' : 'text-black'}`}
                    onClick={() => window.history.back()}
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>

                <p className="flex-grow text-center font-semibold">{title}</p>
                <div className="w-6"></div>
            </header>

            {/* Contenido principal */}
            <main className="flex-grow h-full w-full overflow-auto">{children}</main>

            {/* Footer */}
            {footerType === 'default' && (
                <footer
                    className={`bg-white p-2 flex justify-around pb-8 ${
                        footerType === 'default' ? 'fixed bottom-0 left-0 right-0' : ''
                    } ${
                        'md:static md:flex md:justify-between'
                    }`}
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

            {footerType === "simple" && (
                <footer className={`bg-white p-2 flex justify-between pb-6 ${
                    footerType === 'simple' ? 'fixed bottom-0 left-0 right-0' : ''
                } ${
                    'md:static'
                }`}
                style={{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)' }}
                >
                    <button
                        className="text-gray-500 ml-4 font-semibold"
                        onClick={anteriorAccion}
                    >
                        Anterior
                    </button>
                    <button
                        className={`text-primary mr-4 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed`}
                        onClick={siguienteAccion}
                        disabled={!actionEnabled}
                    >
                        Siguiente
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Layout;
