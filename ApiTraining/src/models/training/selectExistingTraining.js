import pool from '../../db/pool.js';
// Función para seleccionar un entrenamiento existente.
const selectExistingTraining = async (
  name,
  description,
  typology,
  muscle_group
) => {
  try {
    const [[result]] = await pool.query(
      `
    SELECT * FROM training WHERE name=? AND description=? AND typology=? AND muscle_group=?`,
      [name, description, typology, muscle_group]
    );
    return result.id;
  } catch {
    return 0;
  }
};

export default selectExistingTraining;
