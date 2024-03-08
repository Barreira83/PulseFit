import { generateError} from '../../helpers/index.js';
import {deleteRoutineById,selectRoutineById} from '../../models/routine/index.js';





const deleteRoutine = async (req, res, next) => {
  try {
    // const trainingId = req.params.idtraining;
    // // Hacemos la llamada al helper de validación del numero entero
    // validateInt('trainingId no válido.', trainingId);
    const routineId= req.params.idRoutine;

    //Comprobamos si el idtraining existe
    const routineExists = await selectRoutineById(routineId);
    if (!routineExists) {
      generateError('La rutina seleccionada no existe.', 404);
    }

    // Borrar el entreno
    await deleteRoutineById(routineId);

    res.send({
      status: 'ok',
      message: `El entreno con id: ${routineId} fue borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteRoutine;
