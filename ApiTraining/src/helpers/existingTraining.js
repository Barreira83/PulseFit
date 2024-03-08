import { generateError } from './index.js';
// Comprobamos que el entrenamiento exista
const existingTraining = (bodyData, existingData, error) => {
  const { name, description, typology, muscle_group } = bodyData;

  if (
    name === existingData.name &&
    description === existingData.description &&
    typology === existingData.typology &&
    muscle_group === existingData.muscle_group
  ) {
    generateError(error, 400);
  }
};
export default existingTraining;
