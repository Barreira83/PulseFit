import pool from '../../db/pool.js';
// Función para seleccionar usuario por su Id.
const selectUserById = async (id) => {
  const [[userWithSameId]] = await pool.query(
    `
    SELECT * FROM users WHERE id = ?`,
    [id]
  );

  return userWithSameId;
};

export default selectUserById;
