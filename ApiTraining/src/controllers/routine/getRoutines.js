import { selectAllRoutines } from '../../models/routine/index.js';

const getRoutines = async (req, res, next) => {
  try {
    const loggedId = req.auth.id;
    const routines = await selectAllRoutines(loggedId);

    res.send({
      message: 'Rutinas seleccionadas.',
      data: routines,
    });
  } catch (error) {
    next(error);
  }
};

export default getRoutines;
