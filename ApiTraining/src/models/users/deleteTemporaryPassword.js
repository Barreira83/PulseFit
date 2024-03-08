import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
const deleteTemporaryPassword = async (id) => {
  try {
    const query = `DELETE FROM forgot_password WHERE id_user = ?`;
    await pool.query(query, [id]);

    return {
      status: 200,
      message: 'Borrado con éxito',
    };
  } catch (error) {
    generateError(error, error.statusCode || 500);
  }
};
export default deleteTemporaryPassword;
