import pool from '../../db/pool.js';
// Función para seleccionar los likes por Id
const getCountLikesByTraining = async (trainingId) => {
  const [allLikes] = await pool.query(
    `
   SELECT count(*) allLikes FROM likes WHERE id_training=?`,
    [trainingId]
  );

  return allLikes;
};

export default getCountLikesByTraining;
