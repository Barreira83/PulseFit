// Creamos el middleware de manejo de errores.
const handleError = (error, req, res, next) => {
  console.log(error);
  res
    .status(error?.httpStatus || 500)
    .send({ error: error?.message || 'generic error' });
};

export default handleError;
