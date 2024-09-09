require('dotenv').config();

const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

sgMail.setApiKey("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");

app.use(bodyParser.json());

app.post('/enviar-correo', async (req, res) => {
    const { detallesPedido } = req.body;

    const msg = {
        to: "agostina.avalle@gmail.com",
        from: 'avalleag@gmail.com',
        subject: 'TANGO APP - Confirmación de Cotización',
        text: detallesPedido,
    };

    try {
        await sgMail.send(msg);
        res.status(200).send('Correo electrónico enviado');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).send('Error al enviar el correo electrónico');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
