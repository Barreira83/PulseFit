import pool from '../../db/pool.js';
// Función para seleccionar usuario por clave temporal
const selectUserByTempPass = async (password) => {
  const [[userWithSamePass]] = await pool.query(
    `
    SELECT * FROM forgot_password WHERE temporary_pass = ?`,
    [password]
  );

  return userWithSamePass;
};

export default selectUserByTempPass;
