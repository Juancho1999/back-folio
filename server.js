const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para manejar el formulario de contacto
app.post('/send-mail', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Verifica que los valores estén llegando correctamente
    console.log(name, email, phone, message);

    // Configuración del transportador de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'iralajuan099@gmail.com',
            pass: 'nuerkapjxardorap' // Aquí debes usar un password de aplicación si usas Gmail
        }
    });

    const mailOptions = {
        from: email,
        to: 'iralajuan099@gmail.com',
        subject: 'Nuevo mensaje desde el formulario de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ message: 'Error al enviar el correo' });
        }
        console.log('Correo enviado:', info);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    });
});

// Exportar el handler para que Vercel lo ejecute como función serverless
module.exports = app;
