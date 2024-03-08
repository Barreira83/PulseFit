import jwt from 'jsonwebtoken';
import { generateError } from '../helpers/index.js';
import { TOKEN_SECRET } from '../../env.js';
// Validamos la autorización del usuario a través de jsonwebtoken
const validateAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateError("El header 'authorization' es requerido", 401);
    }
    // console.log(authorization);

    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      generateError("El token debe ser de tipo 'Bearer'", 400);
    }

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

export default validateAuth;
