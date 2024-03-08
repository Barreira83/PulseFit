import { generateError, validateInt } from '../../helpers/index.js';

import {
  deleteTrainingById,
  selectTrainingById,
} from '../../models/training/index.js';

const deleteTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);

    //Comprobamos si el idtraining existe
    const trainingExists = await selectTrainingById(trainingId);
    if (!trainingExists) {
      generateError('El entrenamiento seleccionado no existe.', 404);
    }

    // Borrar el entreno
    await deleteTrainingById(trainingId);

    res.send({
      status: 'ok',
      message: `El entreno con id: ${trainingId} fue borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTraining;
