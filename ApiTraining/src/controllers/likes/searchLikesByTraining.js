

import { generateError } from '../../helpers/index.js';
import {getCountLikesByTraining} from '../../models/likes/index.js';


const searchLikesByTraining = async (req, res, next) => {
  try {
    const trainingId = req.params.idtraining;

    const [totalLikes] = await getCountLikesByTraining(trainingId);

    if (!totalLikes) {
      generateError('El entreno que buscas no existe', 404);
    }

    res.send({ 
      message: 'Total de likes', 
      data: totalLikes.allLikes });
  } catch (error) {
    next(error);
  }
};



export default searchLikesByTraining;