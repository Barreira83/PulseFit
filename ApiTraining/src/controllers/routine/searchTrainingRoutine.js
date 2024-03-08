import { selectTrainingToRoutine } from '../../models/routine/index.js';

const searchTrainingRoutine = async (req, res, next) => {
  const idRoutine = req.params.idRoutine;
  try {
    const training = await selectTrainingToRoutine(idRoutine);
    // console.log(training);

    res.send({
      message: 'Entrenamientos de rutina seleccionados.',
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

export default searchTrainingRoutine;
