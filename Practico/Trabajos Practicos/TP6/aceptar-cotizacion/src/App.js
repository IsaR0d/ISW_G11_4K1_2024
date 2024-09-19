import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetallesCotizacion from './pages/DetallesCotizacion';
import MetodoPago from './pages/MetodoPago';
import Tarjeta from './pages/Tarjeta';
import Confirmacion from './pages/Confirmacion';
import Inicio from './pages/Inicio';
import Error from './pages/Error';
import PhoneFrame from './layout/PhoneFrame';
import Transportista from './pages/Transportista';
import './App.css';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const App = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <Router>
      {isMobile ? (
        <Routes>
          <Route path="/pedido/:idPedido/cotizacion/:idCotizacion" element={<DetallesCotizacion />} />
          <Route path="/metodo-pago" element={<MetodoPago />} />
          <Route path="/tarjeta" element={<Tarjeta />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/error" element={<Error />} />
          <Route path="/*" element={<Inicio />} />
          <Route path="/transportista/:idTransportista" element={<Transportista />} />
        </Routes>
      ) : (
        <PhoneFrame>
          <Routes>
            <Route path="/pedido/:idPedido/cotizacion/:idCotizacion" element={<DetallesCotizacion />} />
            <Route path="/metodo-pago" element={<MetodoPago />} />
            <Route path="/tarjeta" element={<Tarjeta />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Inicio />} />
            <Route path="/transportista/:idTransportista" element={<Transportista />} />
          </Routes>
        </PhoneFrame>
      )}
    </Router>
  );
};

export default App;
