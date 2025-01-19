const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración CORS
const corsOptions = {
  origin: 'https://portafolio-ten-vert-85.vercel.app', // Dominio de tu frontend
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  preflightContinue: false, // Deja que Express maneje las respuestas de preflight automáticamente
  optionsSuccessStatus: 204, // Esto puede ayudar con algunos problemas de compatibilidad
};


// Usar CORS con las opciones configuradas
app.use(cors(corsOptions));


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

// Asegurar que las solicitudes OPTIONS sean manejadas correctamente
app.options('*', cors(corsOptions));

// Exportar el handler para que Vercel lo ejecute como función serverless
module.exports = app;
