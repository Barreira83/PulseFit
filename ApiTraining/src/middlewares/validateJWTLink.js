import jwt from 'jsonwebtoken';
import { generateError } from '../helpers/index.js';
import { TOKEN_SECRET } from '../../env.js';
// Validamos la autorización del usuario a través de jsonwebtoken con params para generar un link de reseteo de password.

const validateAuthLink = (req, res, next) => {
  try {
    const token = req.params.token;
    
    let tokenPayload;

    try {
      tokenPayload = jwt.verify(token, TOKEN_SECRET);
    } catch (error) {
      generateError('El token es inválido', 400);
    }

    req.auth = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default validateAuthLink;
