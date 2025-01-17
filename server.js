const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// Configuración del middleware
app.use(cors());
app.use(express.json());  // <-- Este middleware permite recibir JSON
app.use(express.urlencoded({ extended: true }));

// Ruta para manejar el formulario de contacto
app.post('/send-mail', async (req, res) => {
     // Aquí ahora puedes acceder a los datos JSON directamente
     const { name, email, phone, message } = req.body;

  // Verifica que los valores estén llegando correctamente
  console.log(name, email, phone, message);

    // Configuración del transportador de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // O puedes usar otro servicio de correo
        auth: {
            //user: process.env.EMAIL_USER,  // Email desde las variables de entorno
            //pass: process.env.EMAIL_PASS   // Contraseña desde las variables de entorno
            user: 'iralajuan099@gmail.com', // mi correo electrónico
            pass: 'nuerkapjxardorap' // Contraseña o App Password
        }
    });

    const mailOptions = {
        from: email,  // Correo del usuario
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
    
// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
