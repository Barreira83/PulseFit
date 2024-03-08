import { generateError } from './index.js';
// Creamos función con una expresión regular y condicional , para verificar que el Id es un número entero.
const validateInt = (msg, id) => {
  const numRegex = /^\d+$/;

  if (!numRegex.test(id)) {
    generateError(msg, 404);
  }
};
export default validateInt;
