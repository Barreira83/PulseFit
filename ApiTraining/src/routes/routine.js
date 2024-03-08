import express from 'express';

import { validateAuth } from '../middlewares/index.js';
import {
  addToRoutine,
  createRoutine,
  deleteRoutine,
  deleteTrainingRoutine,
  getRoutineById,
  getRoutines,
  modifyRepsAndSeries,
  searchTrainingRoutine,
  sendPdf,
} from '../controllers/routine/index.js';

const router = express.Router();

router.post('/addRoutine', validateAuth, createRoutine);

router.get('/getRoutine', validateAuth, getRoutines);

router.get('/getRoutine/:id', validateAuth, getRoutineById);
router.post('/addTrainingToRoutine/:idRoutine', validateAuth, addToRoutine);
router.get('/getTrainingRoutine/:idRoutine',validateAuth,searchTrainingRoutine)
router.patch('/modifyRoutine/:idRoutine',validateAuth,modifyRepsAndSeries)
router.post('/sendPdf',sendPdf)

//Eliminar rutina
router.delete('/deleteRoutine/:idRoutine',validateAuth, deleteRoutine)

//Eliminar entreno de rutina
router.delete('/deleteTrainingRoutine/:id',validateAuth, deleteTrainingRoutine)
export default router;
