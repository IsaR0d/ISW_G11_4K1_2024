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
const cardFilePath = path.join(__dirname, 'tarjetas.json');

// Function to read data from JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const readCards = () => {
    const data = fs.readFileSync(cardFilePath);
    return JSON.parse(data);
};

const checkDate = (mmYY) =>
{

        // Get current date
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
        const currentYear = now.getFullYear();
        
        // Parse MM/YY
        const [inputMonth, inputYear] = mmYY.split('/');
        const month = parseInt(inputMonth, 10);
        const year = parseInt(`20${inputYear}`, 10); // Assuming input is in the 2000s
      
        if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < currentYear) {
          return false; // Invalid date
        }
      
        // Check if the input year is greater than the current year
        if (year > currentYear) {
          return true;
        }
      
        // Check if the input year is the same as the current year but the month is greater
        if (year === currentYear && month > currentMonth) {
          return true;
        }
      
        return false;
      
}


// Function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const writeCards = (data) => {
    fs.writeFileSync(cardFilePath, JSON.stringify(data, null, 2));
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

// Endpoint GET /api/pedido=:idPedido&cotizacion=:idCotizacion
app.patch('/api/tarjetas', (req, res) => {
    const { number, name, expiry, cvc, pin, monto } = req.body;
    console.log({ number, name, expiry, cvc, pin, monto })
    const cards = readCards();
    console.log(cards)
    const cardIdx =  cards.findIndex(c => c.numero.toString() == number.toString());;
    

    if (cardIdx != -1) {
        // Si la tarjeta existe, validamos sus datos.
        let card = cards[cardIdx];
        if(card.numero != number.toString()
             || card.nombre.toUpperCase() != name.toString().toUpperCase()
             || card.expiracion != expiry.toString()
             || card.pin != pin.toString() 
             || card.cvc != cvc.toString())
        {
            res.status(400).json({message: "Datos de tarjeta incorrectos"})
        }
        else if (!card.activo) {
            res.status(400).json({message: "Tarjeta deshabilitada"})
        }
        else if (!checkDate(card.expiracion)) {
            res.status(400).json({message: "Tarjeta no vigente"})
        }
        else if (card.monto < monto) {
            res.status(400).json({message: "Saldo insuficiente"})
        }
        else {
            card.monto -= monto;
            cards[cardIdx] = card;
            writeCards(cards);
            res.status(200).json({message: "Transaccion completada correctamente"})
        }

    } else {
        // Si el pedido no se encuentra, devolver un error
        res.status(404).json({ message: "Tarjeta no encontrada: " + number });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
