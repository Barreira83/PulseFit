import Joi from 'joi';
import bcrypt from 'bcrypt';
import {
  insertUser,
  selectUserByEmail,
  selectUserById,
} from '../../models/users/index.js';
import { generateError } from '../../helpers/index.js';
import sendMailUtil from '../../helpers/sendMailUtil.js';

//  esquema de validación con Joi
const schema = Joi.object({
  name: Joi.string()
    .required()
    .error(() => {
      generateError('El nombre es un campo obligatorio', 400);
    }),
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      generateError(
        'El email es un campo obligatorio y debe ser una dirección de correo válida',
        400
      );
    }),
  password: Joi.string()
    .required()
    .error(() => {
      generateError('El password es un campo obligatorio', 400);
    }),
});

const register = async (req, res, next) => {
  try {
    // Valida los datos de entrada
    const { value } = schema.validate(req.body);

    // Desestructuro los datos validados

    let { name, email, password } = value;

    // Compruebo si el correo electrónico ya existe
    const emailExists = await selectUserByEmail(email);
    if (emailExists) {
      generateError('Ya existe un usuario con este email 😥.', 409);
    }

    // Genero el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserto el usuario en la base de datos
    const insertId = await insertUser(name, email, hashedPassword);

    //Buscamos en la base de datos el nuevo usuario registrado-----------
    const newUser = await selectUserById(insertId);

    // Configuro el asunto y cuerpo del correo electrónico
    const emailSubject = 'Gracias por registrarte en nuestra plataforma 🦾';
    const bodyMail = `  Bienvenid@ ${name} 
                        Gracias por registrarte, pronto nos comunicaremos contigo`;

    // Envío el correo electrónico
    await sendMailUtil(email, emailSubject, bodyMail);

    // Respondo con éxito
    res.status(201).send({
      message: 'Registro completado con éxito ✌️',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default register;
