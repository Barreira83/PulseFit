import { generateError, validateInt } from '../../helpers/index.js';
import { deleteLikeById, selectLike } from '../../models/likes/index.js';
import { selectTrainingById } from '../../models/training/index.js';

const deleteLike = async (req, res, next) => {
  try {
    //Cogemos el id de entrenamiento que se para por parametro
    const trainingId = req.params.idtraining;
    //Cogemos el id del payload de usuario logeado
    const loggedUserId = req.auth.id;
        // Hacemos la llamada al helper de validación del numero entero
    validateInt('trainingId no válido.', trainingId);

    //Comprobamos si el idtraining existe
    const trainingExists = await selectTrainingById(trainingId);
    if (!trainingExists) {
      generateError('El entrenamiento seleccionado no existe.', 404);
    }

    //Comprobamos si el usuario es kien dio like a este entrenamiento
    const idLike = await selectLike(loggedUserId, trainingId);

    if (idLike === 0) {
      generateError('Este usuario no puede borrar un like que no dió.', 401);
    } else {
      await deleteLikeById(idLike);
    }

    res.status(201).send({
      message: `El like con id: ${idLike} fue borrado con exito.`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteLike;
