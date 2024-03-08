import pool from '../../db/pool.js';
// Función para eliminar un like de un entrenamiento.
const deleteLikeById = async (id) => {
  await pool.query(
    `
        DELETE FROM likes WHERE id = ?`,
    [id]
  );
};

export default deleteLikeById;
