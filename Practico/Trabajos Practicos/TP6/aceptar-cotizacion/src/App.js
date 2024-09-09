import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetallesCotizacion from './pages/DetallesCotizacion';
import MetodoPago from './pages/MetodoPago';
import Tarjeta from './pages/Tarjeta';
import Confirmacion from './pages/Confirmacion';
import Error from './pages/Error';
import PhoneFrame from './layout/PhoneFrame';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="hidden lg:block">
        <PhoneFrame>
          <Routes>
            <Route path="/pedido/:idPedido/cotizacion/:idCotizacion" element={<DetallesCotizacion />} />
            <Route path="/metodo-pago" element={<MetodoPago />} />
            <Route path="/tarjeta" element={<Tarjeta />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </PhoneFrame>
      </div>
      <div className="lg:hidden">
        <Routes>
          <Route path="/pedido/:idPedido/cotizacion/:idCotizacion" element={<DetallesCotizacion />} />
          <Route path="/metodo-pago" element={<MetodoPago />} />
          <Route path="/tarjeta" element={<Tarjeta />} />
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
