import {
  insertRoutine,
  selectRoutineById,
} from '../../models/routine/index.js';

const createRoutine = async (req, res, next) => {
  try {
    const loggedId = req.auth.id;

    const { name, description } = req.body;

    const routineId = await insertRoutine(name, description, loggedId);

    const newRoutine = await selectRoutineById(routineId);

    res.status(201).send({
      message: 'Se ha creado su rutina correctamente.',
      data: newRoutine,
    });
  } catch (error) {
    next(error);
  }
};

export default createRoutine;
