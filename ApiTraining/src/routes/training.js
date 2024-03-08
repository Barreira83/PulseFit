import express from 'express';
import { validateAuth, isAdmin } from '../middlewares/index.js';
import {
  createTraining,
  deleteTraining,
  modifyTraining,
  searchTraining,
  searchTrainingById,

} from '../controllers/training/index.js';

const router = express.Router();

//Ruta para crear un entrenamiento.
router.post('/training', validateAuth, isAdmin, createTraining);
//Rutas para borrar un entrenamiento.
router.delete('/training/:idtraining', validateAuth, isAdmin, deleteTraining);
//Ruta para modifcar un entrenamiento.
router.put('/training/:idtraining', validateAuth, isAdmin, modifyTraining);
//Ruta para ordenar y filtrar entrenamientos.
router.get('/training', validateAuth, searchTraining);
//Ruta para seleccionar un entrenamiento.
router.get('/training/:idtraining', validateAuth, searchTrainingById);


export default router;
