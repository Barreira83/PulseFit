import express from 'express';
import { validateAuth } from '../middlewares/index.js';
import { addFav, getFav, removeFav, checkFav } from '../controllers/fav/index.js';

const router = express.Router();

//Ruta para añadir favorito
router.post('/fav/:idtraining', validateAuth, addFav);
//Ruta para eliminar favorito
router.delete('/fav/:idtraining', validateAuth, removeFav);
////Ruta para añadir listar todos los favoritos.
router.get('/fav', validateAuth, getFav);
//Ruta para saber si un usuario agrego un entreno a favoritos
router.get('/favChecked/:idtraining', validateAuth, checkFav );

export default router;
