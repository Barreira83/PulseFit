import { generateError } from '../../helpers/index.js';
import {
  selectUserById,
  removeUserById,
  selectUserByEmail,
} from '../../models/users/index.js';

// Borrar el entreno de favoritos
const removeUserByEmail = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { email } = req.body;

    const userExists = await selectUserById(loggedUserId);

    if (userExists.rol !== 'admin') {
      generateError(
        'No tienes permisos de administrador para borrar usuarios ajenos.',
        403
      );
    }

    //Seleccionamos el usuario  por el email
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError('El usuario seleccionado no existe.', 404);
    } else {
      // Llamamos al model para borrar usuario
      await removeUserById(userDb.id);
    }

    res.status(200).json({
      message: 'Usuario borrado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};
export default removeUserByEmail;
