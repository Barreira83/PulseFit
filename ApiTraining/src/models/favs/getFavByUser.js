import pool from '../../db/pool.js';
import { generateError } from '../../helpers/index.js';
// Función para obtener la lista de favoritos del usuario .
const getFavByUser = async (loggedId) => {
  try {
    const selectFav = await pool.query(
      `SELECT   
      (SELECT COUNT(id_training) AS allLikes FROM likes WHERE id_training = t.id) AS allLikes,
      BIT_OR(l.id_user=?) AS likeTrue,  BIT_OR(f.id_user=?) AS favTrue, 
      t.id,  t.name, t.description, t.photo, t.typology, t.muscle_group, t.created_at 
      FROM training t
      LEFT JOIN likes l ON l.id_training = t.id	
      LEFT JOIN favorites f ON f.id_training = t.id  
      WHERE f.id_user = ?
      GROUP BY (t.id);      
      `,
      [loggedId, loggedId, loggedId]
      

    );

    return selectFav;
  } catch (error) {
    throw generateError(error, error.statusCode || 500);
  }
};

export default getFavByUser;
