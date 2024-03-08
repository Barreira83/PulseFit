import pool from '../../db/pool.js';
// Función para seleccionar todas las rutinas.
const selectAllRoutines = async (id_user) => {
  const [routines] = await pool.query(
    `
  SELECT * FROM routine WHERE id_user=?`,
    [id_user]
  );

  return routines;
};

export default selectAllRoutines;
