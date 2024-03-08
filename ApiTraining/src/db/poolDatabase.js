import mysql from 'mysql2/promise';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD} from '../../env.js';
// Creamos conexión con la base de datos
const poolDB = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionLimit: 5,

});

export default poolDB;
