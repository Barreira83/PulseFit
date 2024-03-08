import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
// Función para eliminar un entrenamiento de favoritos.
const removeFavById = async (id_user, id_training) => {
  try {
    await pool.query(
      `DELETE FROM favorites WHERE id_user = ? AND id_training = ?`,
      [id_user, id_training]
    );
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};

export default removeFavById;
