import pool from '../../db/pool.js';
// Función para seleccionar rutina por Id.
const selectRoutineById = async (id) => {
  const [[routine]] = await pool.query(
    `
  SELECT * FROM routine WHERE id = ?`,
    [id]
  );

  return routine;
};

export default selectRoutineById;
