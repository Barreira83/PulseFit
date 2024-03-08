// Importamos dependencia dotenv para la gestión de las variables de entorno que se recogen en el .env
import 'dotenv/config';

const {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,

  SERVER_PORT,
  SERVER_HOST,

  TOKEN_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  UPLOADS_DIR,
  SERVER_PORT_FRONT,
} = process.env;

export {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
  SERVER_PORT,
  SERVER_HOST,
  TOKEN_SECRET,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  UPLOADS_DIR,
  SERVER_PORT_FRONT,
};
