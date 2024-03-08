import path from 'path';
import fs from 'fs/promises';
import { UPLOADS_DIR } from '../../../env.js';
import {
  existingTraining,
  generateError,
  saveImage,
  validateJoiTraining,
  validateInt,
} from '../../helpers/index.js';
import {
  selectTrainingById,
  modifyTrainingById,
} from '../../models/training/index.js';

const modifyTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const crudeData = req.files;
    const { name, description, typology, muscle_group } = req.body;
    let photoTrainingName;

    // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);

    validateJoiTraining({ name, typology, muscle_group });

    const training = await selectTrainingById(trainingId);
    if (!training) {
      generateError('El entrenamiento no existe.', 404);
    }

    //Comprueba si existe imagen
    if (req.files && req.files.image) {
      if(training.photo!=="defaultAvatar.jpg"){
          //Si modificamos la foto, se elimina la foto anteriormente guardada
          const routeImage = path.resolve(UPLOADS_DIR, training.photo);
          await fs.unlink(routeImage);
      }    
      //llama a funcion de guaradar imagen
      photoTrainingName = await saveImage(crudeData);
    } else {
      existingTraining(
        req.body,
        training,
        'Debes cambiar algún dato del entrenamiento.'
      );
      photoTrainingName = training.photo;
    }

    // Update de training en la base de datos
    const updatedTraining = await modifyTrainingById(
      name,
      description,
      photoTrainingName,
      typology,
      muscle_group,
      existingTraining.id_user,
      trainingId
    );

    res.status(200).json({
      message: 'Entrenamiento actualizado correctamente',
      data: updatedTraining,
    });
  } catch (error) {
    next(error);
  }
};

export default modifyTraining;
