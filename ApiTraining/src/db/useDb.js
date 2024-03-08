import pool from "./pool.js";
import { DB_NAME } from "../../env.js";
// Activamos la base de datos existente 
const useDb = async () => {
  try {
    await pool.query(`USE ${DB_NAME};`);
  } catch (error) {
    console.error(
      `La base de datos ${DB_NAME} no existe. Ejecuta el npm run initDb para iniciarla`
    );
    process.exit(1);
  }
};

export default useDb;
