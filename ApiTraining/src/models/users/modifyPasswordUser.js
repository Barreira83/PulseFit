import pool from '../../db/pool.js';
// Función para modificar la password del usuario.
const modifyPasswordUser = async (password, id) => {
  const [{ insertId }] = await pool.query(
    `
  UPDATE users SET  password = ? WHERE id = ?`,
    [password, id]
  );

  return insertId;
};

export default modifyPasswordUser;
