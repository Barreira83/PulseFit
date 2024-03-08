//Importar nuestras dependenncias
import nodemailer from 'nodemailer';
// Obtenemos las variables de entorno necesarias.
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../../env.js';
import generateError from './generateError.js';

//Preparando el transporte de nuestro correo a través de los datos SMTP proporcionados en el .env
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

//Efectuar el envio el correo de bienvenida al usuario.

const sendMailUtil = async (email, subject, body) => {
  try {
    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: subject,
      text: body,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    generateError('Error durante el envio del email', 111);
  }
};

export default sendMailUtil;
