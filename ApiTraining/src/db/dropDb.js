import pool from "./pool.js";
import { DB_NAME } from "../../env.js";
// Eliminamos la base de datos si existe 
const dropDb = async () => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);

    console.log("¡Base de datos eliminada satisfactoriamente! 😄");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

dropDb();
