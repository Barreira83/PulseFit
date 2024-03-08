import pool from '../../db/pool.js';
// Función para agregar un nuevo usuario.

const modifyUserById = async (loggedUserId, name, email, hashedPassword) => {
  const [user] = await pool.query(
    `
        UPDATE users
        SET name=?, email=?, password=?, modify_at=CURRENT_TIMESTAMP 
        WHERE id=?`,
    [name, email, hashedPassword, loggedUserId]
  );

  return user;
};

export default modifyUserById;
