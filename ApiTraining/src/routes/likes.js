import express from 'express';
import { validateAuth } from '../middlewares/index.js';
import { addLike, deleteLike, searchLikesByTraining, checkLike } from '../controllers/likes/index.js';



const router = express.Router();

//Ruta para dar like
router.post('/like/:idtraining', validateAuth, addLike);
//Ruta para eliminar like
router.delete('/like/:idtraining', validateAuth, deleteLike);
//Ruta para contar los likes de un entreno
router.get('/allLikes/:idtraining', searchLikesByTraining);
//Ruta para saber si un usuario dio like a un entreno
router.get('/likeChecked/:idtraining', validateAuth, checkLike );



export default router;
