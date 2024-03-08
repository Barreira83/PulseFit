import { generateError, validateInt } from '../../helpers/index.js';
import { selectUserById, removeUserById } from '../../models/users/index.js';

// Borrar el entreno de favoritos
const getUser = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    

    const user = await selectUserById(loggedUserId);
    if (!user) {
        generateError('Error al traer los datos de usuario.', 400);
      }

    res.status(200).json({
      message: 'Datos usuario',
      data: {
        id:user.id,
        name:user.name,
        email:user.email,
        password:user.password,
        rol:user.rol

      },
    });
  } catch (error) {
    next(error);
  }
};
export default getUser;
