require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Create reusable transporter object using Hotmail SMTP
let transporter = nodemailer.createTransport({
    service: 'hotmail', // Change service to Hotmail
    auth: {
        user: "tangoappisw@hotmail.com", // Replace with your Hotmail email address from environment variables
        pass: "159951ISW"  // Replace with your Hotmail password or app password from environment variables
    },
    tls: {
        rejectUnauthorized: false // Sometimes needed for self-signed certificates
    }
});

app.post('/enviar-correo', async (req, res) => {
    const { detallesPedido } = req.body;

    const mailOptions = {
        from: "tangoappisw@hotmail.com", // Sender address
        to: 'maxgamercod@gmail.com', // Receiver email
        subject: 'TANGO APP - Confirmación de Cotización',
        text: detallesPedido // Email body content
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
