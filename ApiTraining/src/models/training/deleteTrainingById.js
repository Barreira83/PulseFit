import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
const deleteTrainingById = async (id) => {
  try {
    const query = `DELETE FROM training WHERE id = ?`;
    await pool.query(query, [id]);

    return {
      status: 200,
      message: 'Entreno borrado con éxito',
    };
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};
export default deleteTrainingById;
