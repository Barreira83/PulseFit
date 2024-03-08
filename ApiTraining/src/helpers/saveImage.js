import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { createPathIfNotExist, generateError } from './index.js';
import { UPLOADS_DIR } from '../../env.js';

const saveImage = async (crudeData) => {
  try {
    const photosDirPath = path.resolve(UPLOADS_DIR);

    //Se crea carpeta si no existe
    await createPathIfNotExist(photosDirPath);

    //Procesa imagen para poder alamcenarla
    const photoTraining = sharp(crudeData.image.data);
    photoTraining.resize(500);

    //Guardo imagen despues de renombrar imagen
    const [, ext] = crudeData.image.name.split('.');
    const photoName = `${uuidv4()}.${ext}`;
    await photoTraining.toFile(path.resolve(photosDirPath, photoName));
    return photoName;
  } catch (error) {
    generateError('Error al guardar la imagen de entrenamiento', 400);
  }
};
export default saveImage;
