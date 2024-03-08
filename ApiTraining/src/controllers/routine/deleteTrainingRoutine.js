import { deleteTrainingRoutineById } from "../../models/routine/index.js";



const deleteTrainingRoutine = async (req, res, next) => {
  try {
    // const trainingId = req.params.idtraining;
    // // Hacemos la llamada al helper de validación del numero entero
    // validateInt('trainingId no válido.', trainingId);
    const id= req.params.id;
    // Borrar el entreno
    await deleteTrainingRoutineById(id);

    res.send({
      status: 'ok',
      message: `El entreno con id: ${id} fue borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTrainingRoutine;
