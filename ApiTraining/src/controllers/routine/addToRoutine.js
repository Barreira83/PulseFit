import generateError from '../../helpers/generateError.js';
import validateInt from '../../helpers/regexInt.js';
import {
  addTrainingToRoutine,
  selectTrainingToRoutine,
} from '../../models/routine/index.js';

const addToRoutine = async (req, res, next) => {
  try {
    const routineId = parseInt(req.params.idRoutine);
    const { idTraining, reps, series } = req.body;

    // Hacemos la llamada al helper de validación del numero entero
    validateInt('Id de rutina no válido.', routineId);
    const resultCheck = await selectTrainingToRoutine(routineId);

    // Llamamos al model para añadir a rutinas

    resultCheck.map((trainingExist) => {
      if (trainingExist.id_training == idTraining) {
        generateError('El entreno ya fue añadido a esta rutina.', 409);
      }
    });

    const result = await addTrainingToRoutine(
      idTraining,
      routineId,
      reps,
      series
    );

    res.status(200).json({
      message: 'Entrenamiento añadido con éxito.',
    });
  } catch (error) {
    next(error);
  }
};

export default addToRoutine;
