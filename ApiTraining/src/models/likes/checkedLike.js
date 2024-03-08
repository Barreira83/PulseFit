import pool from '../../db/pool.js';
// Función para eliminar un like de un entrenamiento.
const checkedLike = async (loggedId, trainingId) => {
  const [checked] = await pool.query(
    `
    SELECT BIT_OR(id_user=?) likeCheck FROM likes 
    WHERE id_training=?
    `,
    [loggedId, trainingId]
  );

  return checked;
};

export default checkedLike;
