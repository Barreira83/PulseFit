

import { generateError } from '../../helpers/index.js';
import selectTrainingById from '../../models/training/selectTrainingById.js';

const searchTrainingById = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;

    const training = await selectTrainingById(trainingId);

    if (!training) {
      generateError('El entreno que buscas no existe', 404);
    }

    res.send({ message: 'Entrenamiento seleccionado', data: training });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingById;
