import {
  deleteTemporaryPassword,
  modifyPasswordUser,
  selectUserByTempPass,
} from '../../models/users/index.js';
import bcrypt from 'bcrypt';

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    console.log(req.params);
    //Seleccionamos el usuario por clave temporal
    const userDb = await selectUserByTempPass(req.params.temp);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }
    await deleteTemporaryPassword(userDb.id_user);

    // Genero el hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserto el usuario en la base de datos
    await modifyPasswordUser(hashedPassword, userDb.id_user);

    //Enviamos mensaje si todo ha ido bien
    res.send({ message: 'Contraseña modificada correctamente.' });
  } catch (error) {
    next(error);
  }
};

export default resetPassword;
