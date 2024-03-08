import { generateError } from '../helpers/index.js';
import { selectUserById } from '../models/users/index.js';

// Validamos la autorización del usuario a través de jsonwebtoken
const isAdmin = async (req, res, next) => {
  try {
    const user = await selectUserById(req.auth.id);
    console.log("rol de usuario",user.rol);
    if (user.rol==="normal") {
        generateError("El usuario debe ser administrador para realizar esta tarea",400)        
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
