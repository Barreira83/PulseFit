import Joi from 'joi';
import { generateError } from './index.js';
// Hacemos las correspondientes validaciones con un esquema de Joi 
const validateJoiTraining = async ({
  name,
  typology,
  muscle_group,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'El nombre es obligatorio y tiene un máximo de 50 caracteres.',
          400
        );
      }),

    typology: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'La tipología es obligatoria y tiene un máximo de 50 caracteres',
          400
        );
      }),
    muscle_group: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'El grupo muscular es obligatorio y tiene un máximo de 50 caracteres',
          400
        );
      }),
  });
  schema.validate({
    name,
    typology,
    muscle_group,
  });

};

export default validateJoiTraining;
