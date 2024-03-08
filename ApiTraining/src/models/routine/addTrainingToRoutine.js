import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
// Función para añadir un entrenamiento a una rutina
const addTrainingToRoutine = async (idTraining, idRoutine, reps, series) => {
  try {
    const result = await pool.query(
      `
    INSERT INTO routine_training ( id_training,id_routine,reps,series ) VALUES (?, ?, ?, ?)`,
      [idTraining, idRoutine, reps, series]
    );

    return result;
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};

export default addTrainingToRoutine;
