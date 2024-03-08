import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
// Función para añadir series y reps a un ejercicio
const addSeriesAndReps = async (reps, series, idRoutine, idTraining) => {
  try {
    const result = await pool.query(
      `
      UPDATE routine_training SET reps = ? ,series= ? WHERE id_routine= ? AND id_training = ?`,
      [reps, series, idRoutine, idTraining]
    );

    return result;
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};

export default addSeriesAndReps;
