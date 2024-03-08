import { selectTraining } from '../../models/training/index.js';

const trainingInfo = async (req, res, next) => {
  const loggedId=req.auth.id;
  try {
    const training = await selectTraining({
      ...req.query
    },loggedId);

    res.send({
      message: 'Entrenamientos seleccionados.',
      data: training,
    });
  } catch (error) {
    next(error);
  }
};

export default trainingInfo;
