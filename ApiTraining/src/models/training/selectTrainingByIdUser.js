import pool from '../../db/pool.js';
// Función para seleccionar entrenamiento por Id.
const selectTrainingByIdUser = async (id_user) => {
  const [training] = await pool.query(
    `
  SELECT * FROM training WHERE id_user = ?`,
    [id_user]
  );

  return training;
};

export default selectTrainingByIdUser;
