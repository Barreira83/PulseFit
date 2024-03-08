import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { selectUserByEmail } from '../../models/users/index.js';
import { generateError } from '../../helpers/index.js';
import { TOKEN_SECRET } from '../../../env.js';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Seleccionamos el usuario en la bbdd por el email
    const userDb = await selectUserByEmail(email);
    if (!userDb) {
      generateError('Los datos no son correctos.', 401);
    }

    //Comparamos la password del body, con la password hasheada
    const comparePassword = await bcrypt.compare(password, userDb.password);
    if (!comparePassword) {
      generateError('Los datos no son correctos.', 401);
    }

    //Creamos el Payload con el id de users de la bbdd, y su rol. Despues generamos el TOKEN
    const payload = {
      id: userDb.id,
    };
    const token = jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: '30d',
    });

    //Enviamos mensaje si todo ha ido bien
    res.send({
      message: 'Loggeado correctamente.',
      name: userDb.name,
      token: token,
      rol: userDb.rol,
    });
  } catch (error) {
    next(error);
  }
};

export default login;
