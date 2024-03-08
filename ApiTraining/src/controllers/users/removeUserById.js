import { generateError } from '../../helpers/index.js';
import { removeUserById } from '../../models/users/index.js';

// Borrar el entreno de favoritos
const removeUser = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    await removeUserById(loggedUserId);

    res.status(200).json({
      message: 'Usuario borrado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};
export default removeUser;
