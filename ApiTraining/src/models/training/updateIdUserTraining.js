import pool from '../../db/pool.js';

const updateIdUserTraining = async (idUserToDelete) => {
  await pool.query(
    `
  UPDATE training SET id_user = 1 WHERE id_user = ?`,
    [idUserToDelete]
  );
};

export default updateIdUserTraining;
