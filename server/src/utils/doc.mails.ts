import nodemailer from 'nodemailer';

// Configura el transporte de correo electrónico
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // false para conexiones sin SSL
    auth: {
        user: 'tallerxpert@gmail.com',
        pass: 'password',
    },
});

async function sendEmailWithAttachment() {
    try {
        const mailOptions = {
            from: 'tallerXpert@gmail.com',
            to: 'cliente@gmail.com',
            subject: 'Product Review PDF',
            text: 'Review del producto.',
            attachments: [
                {
                    filename: 'documento.pdf', // Nombre del archivo adjunto
                    path: '/ruta/al/archivo/documento.pdf', // Ruta al archivo PDF en tu sistema
                    contentType: 'application/pdf', // Tipo MIME del archivo adjunto
                },
            ],
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado con éxito.');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}

// Llama a la función para enviar el correo electrónico con el archivo adjunto
sendEmailWithAttachment();
