// función que sirve para generar un error con un mensaje y un código de estado HTTP específico.
const generateError = (msg, httpStatus) => {
  const error = new Error(msg);
  error.statusCode = httpStatus;

  throw error;
};

export default generateError;
