import pool from '../../db/pool.js';
// Función para añadir un nuevo entrenamiento.
const insertTraining = async ({
  name,
  description,
  photoTrainingName,
  typology,
  muscle_group,
  loggedUserId,
}) => {
  const [{ insertId }] = await pool.query(
    `
  INSERT INTO 
  training (name, description, photo, typology, muscle_group, id_user) 
  VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, photoTrainingName, typology, muscle_group, loggedUserId]
  );

  return insertId;
};

export default insertTraining;
