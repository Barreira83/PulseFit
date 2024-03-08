import pool from '../../db/pool.js';
// Función para modificar un entrenamientos existente.
const modifyTrainingById = async (
  name,
  description,
  photo,
  typology,
  muscle_group,
  id_user,
  trainingId
) => {
  try {
    const [updateRow] = await pool.query(
      `
      UPDATE training 
      SET name=?, description=?, photo=?, typology=?, muscle_group=?, id_user=?, modify_at=CURRENT_TIMESTAMP 
      WHERE id=?`,
      [name, description, photo, typology, muscle_group, id_user, trainingId]
    );

    return updateRow;
  } catch (error) {
    throw error;
  }
};

export default modifyTrainingById;
