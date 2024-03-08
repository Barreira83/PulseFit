import { generateError } from '../../helpers/index.js';
import { modifyUserById, selectUserById } from '../../models/users/index.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

// Borrar el entreno de favoritos
const modifyUser = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    //Validamos los datos de entrada con Joi
  
    const {value}=schema.validate(req.body);   
    const { name, email } = value;
    const {password}=req.body;

    //Recogemos los datos del usuario de la bbdd, si no modifica contraseña se deja la misma hasheada
    let hashedPassword="";
    const userDb = await selectUserById(loggedUserId); 
    if(password===""){
       hashedPassword=userDb.password;
    }else{
        // Genero el hash de la contraseña
      hashedPassword = await bcrypt.hash(password, 10);
    }


    // Llamamos al model para modificar usuario
    const userModified = await modifyUserById(
      loggedUserId,
      name,
      email,
      hashedPassword      
    );
    if (!userModified) {
      generateError('Error al actualizar los datos de usuario.', 400);
    }

    const user = await selectUserById(loggedUserId); 
    console.log("Datos modificados", user);

    res.status(200).json({
      message: 'Usuario modificado con éxito.',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
        modify_at: user.modify_at
      },
    });
  } catch (error) {
    next(error);
  }
};

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
});

export default modifyUser;
