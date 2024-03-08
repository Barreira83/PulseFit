import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';

// Función para que un usuario pueda elminarse a sí mismo.
const removeUserById = async (id_user) => {
  try {
    await pool.query(
      `
    DELETE FROM users WHERE id = ?`,
      [id_user]
    );
  } catch (error) {
    generateError(error, error.statusCode || 500);
  }
};
export default removeUserById;
