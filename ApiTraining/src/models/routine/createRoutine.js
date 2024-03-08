import pool from '../../db/pool.js';
// Función para agregar un nuevo usuario.

const insertRoutine = async (name, description, loggedId) => {
  const [{ insertId }] = await pool.query(
    `
    INSERT INTO routine (name, description, id_user) VALUES (?, ?, ?)`,
    [name, description, loggedId]
  );

  return insertId;
};

export default insertRoutine;
