
  import { generateError, sendMailUtil } from '../../helpers/index.js';
  
 
  
  const sendPdf = async (req, res, next) => {
    try {
      const  pdfFile  = req.files;
      const {email}= req.body
      console.log(pdfFile);
      console.log(email);
      // Configuro el asunto y cuerpo del correo electrónico
      const emailSubject = 'Enlace para recuperacion de contraseña.';
      const bodyMail = `Acceda al enlace siguiente para reiniciar su contraseña: http://${SERVER_HOST}:${SERVER_PORT_FRONT}/reset-password/${temporaryPass}`;
  
      // Envío el correo electrónico
      await sendMailUtil(email, emailSubject, bodyMail);
  
      // //Enviamos mensaje para recuperación
      res.send({
        message:
          'Le Hemos enviado un enlace a su mail para restablecer la contraseña.',
      });
    } catch (error) {
      next(error);
    }
  };
  
  export default sendPdf;