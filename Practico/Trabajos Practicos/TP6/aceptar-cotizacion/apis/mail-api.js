require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "tangoappisw@hotmail.com",
        pass: "159951ISW"
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post('/enviar-correo', async (req, res) => {
    const { detallesPedido } = req.body;

    const mailOptions = {
        from: "tangoappisw@hotmail.com",
        to: 'avalleag@gmail.com',
        subject: 'TANGO APP - Confirmación de Cotización',
        text: detallesPedido
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo electrónico enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).send('Error al enviar el correo electrónico');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
