
import {checkedLike} from '../../models/likes/index.js';

const checkLike = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const loggedId = req.auth.id;


    const [result]= await checkedLike(loggedId, trainingId);

    res.status(200).json({
      message: `El usuario ${loggedId} dio like al entreno ${trainingId} a favorites`,
      data: result,
    });

  } catch (error) {
    next(error);
  }
};





export default checkLike;