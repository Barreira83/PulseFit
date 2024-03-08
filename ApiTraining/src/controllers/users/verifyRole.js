import { selectUserById } from '../../models/users/index.js';

// Devolvemos el rol de usuario
const verifyRole = async (req, res, next) => {
  try {
    const user = await selectUserById(req.auth.id);
    res.send({
      message: `El usuario ${user.name} es: ${user.rol}`,
      name: user.name,
      rol: user.rol,
    });
  } catch (error) {
    next(error);
  }
};

export default verifyRole;
