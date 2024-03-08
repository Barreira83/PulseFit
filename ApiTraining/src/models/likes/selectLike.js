import pool from '../../db/pool.js';
// Función para listar los likes por usuario y entrenamiento.
const selectLike = async (loggedUserId, trainingId) => {
  try {
    const [[result]] = await pool.query(
      `
      SELECT * FROM likes WHERE id_user= ? AND id_training= ?`,
      [loggedUserId, trainingId]
    );

    return result.id;
  } catch {
    return 0;
  }
};

export default selectLike;
