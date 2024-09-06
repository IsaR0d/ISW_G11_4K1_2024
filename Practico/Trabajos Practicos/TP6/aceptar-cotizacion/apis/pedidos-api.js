const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Path to the JSON file
const dataFilePath = path.join(__dirname, 'pedidos.json');

// Function to read data from JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Endpoint GET /api/pedido=:idPedido&cotizacion=:idCotizacion
app.get('/api/pedido=:idPedido&cotizacion=:idCotizacion', (req, res) => {
    const { idPedido, idCotizacion } = req.params;
    const data = readData();
    const pedido = data.find(p => p.id == idPedido);

    if (pedido) {
        // Si el pedido existe, buscamos la cotización
        const cotizacion = pedido.cotizaciones.find(c => c.id == idCotizacion);

        if (cotizacion) {
            // Devolver tanto el pedido como la cotización
            res.json({
                pedido: pedido,
                cotizacion: cotizacion
            });
        } else {
            // Si la cotización no se encuentra, devolver solo el pedido
            res.json({
                pedido: pedido
            });
        }
    } else {
        // Si el pedido no se encuentra, devolver un error
        res.status(404).json({ message: 'Pedido no encontrado' });
    }
});


// Endpoint PUT /api/confirmar
app.put('/api/confirmar', (req, res) => {
    const { idPedido, metodo_pago, entrega_fecha, retiro_fecha, transportista, precio } = req.body;
    let data = readData();
    const pedidoIndex = data.findIndex(p => p.id == idPedido);
    
    if (pedidoIndex > -1) {
        const pedido = data[pedidoIndex];
        
        // Actualizar campos si no son nulos
        if (metodo_pago !== undefined) pedido.meotodo_pago = metodo_pago;
        if (entrega_fecha !== undefined) pedido.entrega_fecha = entrega_fecha;
        if (retiro_fecha !== undefined) pedido.retiro_fecha = retiro_fecha;
        if (transportista !== undefined) pedido.transportista = transportista;
        if (precio !== undefined) pedido.precio = precio;

        // Actualizar estado del pedido
        pedido.estado = "Confirmada";

        data[pedidoIndex] = pedido;
        writeData(data);
        
        res.json(pedido);
    } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
