import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';

const deleteTrainingRoutineById = async (id) => {
  try {
    await pool.query(
      `
    DELETE FROM routine_training WHERE id = ?;`,
      [id]
    );

    return {
      status: 200,
      message: 'Entreno borrado con éxito de rutina',
    };
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};
export default deleteTrainingRoutineById;
