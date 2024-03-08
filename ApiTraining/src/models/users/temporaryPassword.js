import pool from '../../db/pool.js';
// Función para modificar la password del usuario.
const temporaryPassword = async (password, id) => {
  const rr = await pool.query(
    `
    INSERT INTO forgot_password ( temporary_pass, id_user ) 
    VALUES (?, ?)`,
    [password, id]
  );

  return rr;
};

export default temporaryPassword;
