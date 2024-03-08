import pool from '../../db/pool.js';
// Función para modificar la password del usuario.
const modifyRol = async (rol, id) => {
  const [{ insertId }] = await pool.query(
    `
    UPDATE users SET  rol = ? WHERE id = ?`,
    [rol, id]
  );

  return insertId;
};

export default modifyRol;
