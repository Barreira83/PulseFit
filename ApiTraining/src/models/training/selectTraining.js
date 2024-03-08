import pool from '../../db/pool.js';

const selectTraining = async (
  { name, typology, muscle_group, order_by },
  loggedId
) => {
  let sqlQuery = `
  SELECT   
  (SELECT COUNT(id_training) AS allLikes FROM likes WHERE id_training = t.id) AS allLikes,
  BIT_OR(l.id_user=?) AS likeTrue,  BIT_OR(f.id_user=?) AS favTrue, 
  t.id,  t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at 
  FROM training t
  LEFT JOIN likes l ON l.id_training = t.id 
  LEFT JOIN favorites f ON f.id_training = t.id`;

  const sqlValues = [];
  sqlValues.push(loggedId, loggedId);
  let sqlClause = ' WHERE';

  if (name) {
    sqlQuery += `${sqlClause} name LIKE ?`;
    sqlValues.push(`%${name}%`);
    sqlClause = 'AND';
  }

  if (typology) {
    sqlQuery += `${sqlClause} typology LIKE ?`;
    sqlValues.push(`%${typology}%`);
    sqlClause = 'AND';
  }

  if (muscle_group) {
    sqlQuery += `${sqlClause} muscle_group LIKE ?`;
    sqlValues.push(`%${muscle_group}%`);
  }

  sqlQuery += ` GROUP BY (t.id )`;
  //--------------------------------------------------------------------------------
  if (order_by === 'name') {
    sqlQuery += `ORDER BY t.name`;
  }

  if (order_by === 'date') {
    sqlQuery += `ORDER BY t.created_at DESC`;
  }
  if (order_by === 'likes') {
    sqlQuery += `ORDER BY allLikes DESC`;
  }
  //--------------------------------------------------------------------------------

  const [training] = await pool.query(sqlQuery, sqlValues);

  return training;
};

export default selectTraining;
