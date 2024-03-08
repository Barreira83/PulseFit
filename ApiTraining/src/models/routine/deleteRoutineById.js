import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';

const deleteRoutineById = async (id) => {
  try {
    await pool.query(
      `
    DELETE FROM routine WHERE id = ?;`,
      [id]
    );

    return {
      status: 200,
      message: 'Rutina borrada con éxito',
    };
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};
export default deleteRoutineById;
