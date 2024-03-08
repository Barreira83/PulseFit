import {
  deleteTemporaryPassword,
  selectUserByEmail,
  temporaryPassword,
} from '../../models/users/index.js';
import { generateError, sendMailUtil } from '../../helpers/index.js';
import { SERVER_HOST, SERVER_PORT_FRONT } from '../../../env.js';
import { v4 as uuidv4 } from 'uuid';

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    //Seleccionamos el usuario  por el email
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }

    const temporaryPass = uuidv4();

    await deleteTemporaryPassword(userDb.id);
    await temporaryPassword(temporaryPass, userDb.id);

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

export default forgotPassword;
