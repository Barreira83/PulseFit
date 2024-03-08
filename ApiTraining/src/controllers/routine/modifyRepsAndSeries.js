import {
  generateError,
  
  validateInt,
} from '../../helpers/index.js';
import { addSeriesAndReps } from '../../models/routine/index.js';

const modifyRepsAndSeries = async (req, res, next) => {
  try {
    const idRoutine = req.params.idRoutine;

    const { series, reps, idTraining } = req.body;

    // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', idRoutine);



    // const training = await selectTrainingById(trainingId);
    // if (!training) {
    //   generateError('El entrenamiento no existe.', 404);
    // }

    // Update de training en la base de datos
    const updatedTraining = await addSeriesAndReps(reps, series, idRoutine, idTraining
     
    );

    res.status(200).json({
      message: 'Rutina actualizada',
      data: updatedTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default modifyRepsAndSeries;
