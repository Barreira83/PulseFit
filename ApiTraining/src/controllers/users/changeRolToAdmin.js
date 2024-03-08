import { modifyRol, selectUserByEmail } from '../../models/users/index.js';
import { generateError } from '../../helpers/index.js';

const rolToAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    //Seleccionamos el usuario en la bbdd por el email
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }
    if (userDb.rol === 'admin') {
      generateError(
        'El usuario seleccionado ya tiene el rol "administrador"',
        401
      );
    }

    // Inserto el usuario en la base de datos
    await modifyRol('admin', userDb.id);

    //Enviamos mensaje si todo ha ido bien
    res.send({
      message: 'Se ha modificado el rol a usuario administrador',
      name: userDb.name,
      rol: userDb.rol,
    });
  } catch (error) {
    next(error);
  }
};

export default rolToAdmin;
