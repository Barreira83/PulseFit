//Importación de dependencias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import useDb from './src/db/useDb.js';
import { handleError, notFound } from './src/middlewares/index.js';
import { SERVER_PORT, SERVER_HOST, UPLOADS_DIR } from './env.js';

import {
  userRoutes,
  trainingRoutes,
  likeRoutes,
  favRoutes,
  routinesRoutes,
} from './src/routes/index.js';

const app = express();
//Cors para el fecth desde React
app.use(cors({ origin: ['http://localhost:5174', 'http://localhost:5173'] }));
// middlware que analiza los cuerpos de las solicitudes en formato JSON
app.use(express.json());

//middleware de fileupolad para manejar solicitudes que contenga archivos adjuntos
app.use(fileUpload());

//middlewares de morgan , infromación sobre las solicitudes HTTP que llegan al servidor
app.use(morgan('dev'));

// Middleware que indica a Express cuál es el directorio de ficheros estáticos------
app.use(express.static(UPLOADS_DIR));

// // Selección de base de datos en la que trabajamos
// useDb();

//Rutas

app.use(userRoutes);
app.use(trainingRoutes);
app.use(likeRoutes);
app.use(favRoutes);
app.use(routinesRoutes);

//middlewares de manejo de errores y pagina no encontrada

app.use(notFound);
app.use(handleError);

//Inicialización del servidor
app.listen(SERVER_PORT, () => {
  console.log(
    `Servidor escuchando en la dirección ${SERVER_HOST}:${SERVER_PORT}`
  );
});
