import pool from './pool.js';
import poolDB from './poolDatabase.js'
import useDb from './useDb.js';
import { DB_NAME } from '../../env.js';
// Creamos la base de datos
const initDb = async () => {
  try {
     await poolDB.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);

    await useDb();

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            rol ENUM('admin','normal') DEFAULT 'normal',          
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,               
            modify_at DATETIME DEFAULT CURRENT_TIMESTAMP  
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS training (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description LONGTEXT NOT NULL,
            photo VARCHAR(100) DEFAULT "defaultAvatar.jpg",           
            typology VARCHAR(50) NOT NULL,
            muscle_group VARCHAR(50) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
            modify_at DATETIME DEFAULT CURRENT_TIMESTAMP,       
            id_user INT UNSIGNED 
            
        );
    `);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS 
    routine (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(200),
        id_user INT UNSIGNED NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
        modify_at DATETIME DEFAULT CURRENT_TIMESTAMP,       
        FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE
        
    );
`);
await pool.query(`
CREATE TABLE IF NOT EXISTS 
routine_training (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_training INT UNSIGNED NOT NULL,
    id_routine INT UNSIGNED NOT NULL,
    reps INT NOT NULL,
    series INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,    
    modify_at DATETIME DEFAULT CURRENT_TIMESTAMP,       
    FOREIGN KEY (id_training) REFERENCES training (id) ON DELETE CASCADE,
    FOREIGN KEY (id_routine) REFERENCES routine (id) ON DELETE CASCADE
    
);
`);
    await pool.query(`
    CREATE TABLE IF NOT EXISTS forgot_password (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        temporary_pass VARCHAR(36) NOT NULL,
        id_user INT UNSIGNED NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,         
        FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE
        
    );
`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS likes (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          id_user INT UNSIGNED NOT NULL,
          id_training INT UNSIGNED NOT NULL ,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE,
          FOREIGN KEY (id_training) REFERENCES training (id) ON DELETE CASCADE,
          CONSTRAINT training_likes UNIQUE (id_user,id_training)
          

        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS favorites (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          id_user INT UNSIGNED NOT NULL,
          id_training INT UNSIGNED NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE,
          FOREIGN KEY (id_training) REFERENCES training (id) ON DELETE CASCADE,
          CONSTRAINT training_favs UNIQUE (id_user,id_training)
          
        );
    `);

    console.log('¡Base de datos creada satisfactoriamente! 😄');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

initDb();
