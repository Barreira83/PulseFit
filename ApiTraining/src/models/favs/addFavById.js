import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
// Función para añadir un entrenamiento a favoritos
const addFavById = async (id_user, id_training) => {
  try {
    const fav = await pool.query(
      `INSERT INTO favorites ( id_user, id_training ) VALUES (?, ?)`,
      [id_user, id_training]
    );

    return fav;
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};

export default addFavById;
