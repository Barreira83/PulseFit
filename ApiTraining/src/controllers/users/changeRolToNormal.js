import { modifyRol, selectUserByEmail } from '../../models/users/index.js';
import { generateError } from '../../helpers/index.js';

const rolToNormal = async (req, res, next) => {
  try {
    const { email } = req.body;

    //Seleccionamos el usuario en la bbdd por el email
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }
    if (userDb.rol === 'normal') {
      generateError('El usuario seleccionado ya tiene el rol "normal"', 401);
    }

    // Inserto el usuario en la base de datos
    await modifyRol('normal', userDb.id);

    //Enviamos mensaje si todo ha ido bien
    res.send({
      message: 'Se ha modificado el rol a usuario normal',
      name: userDb.name,
      rol: userDb.rol,
    });
  } catch (error) {
    next(error);
  }
};

export default rolToNormal;
