import pool from '../../db/pool.js';

const checkedFav = async (loggedId, trainingId) => {
  const [checked] = await pool.query(
    `  SELECT BIT_OR(id_user=?) FavCheck FROM favorites 
        WHERE id_training=?`,
    [loggedId, trainingId]
  );

  return checked;
};

export default checkedFav;
