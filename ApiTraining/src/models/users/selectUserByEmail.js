import pool from '../../db/pool.js';
// Función para seleccionar usuario por su email.
const selectUserByEmail = async (email) => {
  const [[userWithSameEmail]] = await pool.query(
    `
      SELECT * FROM users WHERE email = ?`,
    [email]
  );

  return userWithSameEmail;
};

export default selectUserByEmail;
