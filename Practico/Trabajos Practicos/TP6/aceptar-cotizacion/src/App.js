import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import DetallesCotizacion from './pages/DetallesCotizacion';
import MetodoPago from './pages/MetodoPago';
import Tarjeta from './pages/Tarjeta';
import Confirmacion from './pages/Confirmacion';
import Error from './pages/Error';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/pedido/:idPedido/cotizacion/:idCotizacion" element={<DetallesCotizacion />} />
      <Route path="/metodo-pago" element={<MetodoPago />} />
      <Route path="/tarjeta" element={<Tarjeta />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
      <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
