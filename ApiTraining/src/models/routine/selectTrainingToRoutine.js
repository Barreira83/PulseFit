import pool from '../../db/pool.js';

const selectTrainingToRoutine = async (idRoutine) => {
  const [routine] = await pool.query(
    `
  SELECT  r.id, t.name, r.reps, r.series, r.id_training
  FROM training t
  INNER JOIN routine_training r  ON r.id_training = t.id
  WHERE r.id_routine= ?`,
    [idRoutine]
  );
  return routine;
};
export default selectTrainingToRoutine;
