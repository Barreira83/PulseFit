import {checkedFav} from '../../models/favs/index.js';

const checkFav = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;
    const loggedId = req.auth.id;

    const [result]= await checkedFav(loggedId, trainingId);

    res.status(200).json({
        message: `El usuario ${loggedId} añadio el entreno ${trainingId} a favorites`,
        data: result,
      });

  } catch (error) {
    next(error);
  }
};




export default checkFav;