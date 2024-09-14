const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'pedidos.json');
const cardFilePath = path.join(__dirname, 'tarjetas.json');

const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const readCards = () => {
    const data = fs.readFileSync(cardFilePath);
    return JSON.parse(data);
};

function writeCards(cards) {
    fs.writeFileSync(cardFilePath, JSON.stringify(cards, null, 2), 'utf-8');
}

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Endpoint GET /api/pedido=:idPedido&cotizacion=:idCotizacion
app.get('/api/pedido=:idPedido&cotizacion=:idCotizacion', (req, res) => {
    const { idPedido, idCotizacion } = req.params;
    const data = readData();
    const pedido = data.find(p => p.id == idPedido);

    if (pedido) {
        const cotizacion = pedido.cotizaciones.find(c => c.id == idCotizacion);

        if (cotizacion) {
            res.json({
                pedido: pedido,
                cotizacion: cotizacion
            });
        } else {
            res.status(404).json({ message: "Cotización no encontrada" });
        }
    } else {
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
        
        if (metodo_pago !== undefined) pedido.meotodo_pago = metodo_pago;
        if (entrega_fecha !== undefined) pedido.entrega_fecha = entrega_fecha;
        if (retiro_fecha !== undefined) pedido.retiro_fecha = retiro_fecha;
        if (transportista !== undefined) pedido.transportista = transportista;
        if (precio !== undefined) pedido.precio = precio;

        pedido.estado = "Confirmada";

        data[pedidoIndex] = pedido;
        writeData(data);
        
        res.json(pedido);
    } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
    }
});

// Endpoint PUT /api/pedido=:idPedido&cotizacion=:idCotizacion
app.patch('/api/tarjetas', (req, res) => {
    const { number, name, expiry, cvc, pin, monto } = req.body;
    const cards = readCards();
    const cardIndex = cards.findIndex(c => c.numero.toString() === number.toString());

    if (cardIndex !== -1) {
        const card = cards[cardIndex];

        if (card.numero !== number.toString()
            || card.nombre.toUpperCase() !== name.toString().toUpperCase()
            || card.expiracion !== expiry.toString()
            || card.pin !== pin.toString()
            || card.cvc !== cvc.toString()) {
            return res.status(400).json({ message: "Los datos de la tarjeta son incorrectos." });
        }

        if (!card.activo) {
            return res.status(400).json({ message: "La tarjeta se encuentra deshabilitada." });
        }

        if (card.monto < monto) {
            return res.status(400).json({
                message: "La tarjeta se encuentra con saldo insuficiente.",
            });
        }

        card.monto -= monto;
        cards[cardIndex] = card;

        writeCards(cards);

        return res.status(200).json({
            message: "Transacción completada correctamente",
            numeroPago: Math.floor(100000000 + Math.random() * 900000000) // Número de pago aleatorio
        });
    } else {
        return res.status(404).json({ message: "Tarjeta no encontrada: " + number });
    }
});



// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
