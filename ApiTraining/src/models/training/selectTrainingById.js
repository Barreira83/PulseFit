import pool from '../../db/pool.js';
// Función para seleccionar entrenamiento por Id.
const selectTrainingById = async (id) => {
  const [[training]] = await pool.query(
    `
  SELECT * FROM training WHERE id = ?`,
    [id]
  );

  return training;
};

export default selectTrainingById;
