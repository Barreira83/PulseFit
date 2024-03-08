import fs from 'fs/promises';
//  verificamos si un directorio existe en la ruta especificada y, si no existe, lo creamos de manera asíncrona utilizando el módulo fs/promises
const createPathIfNotExist = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path);
  }
};

export default createPathIfNotExist;
