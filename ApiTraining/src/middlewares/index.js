// Este archivo lo utilizamos para unificar los import y export de la carpeta middlewares.
import handleError from './handleError.js';
import notFound from './notFound.js';
import validateAuth from './validateJWT.js';
import validateAuthLink from './validateJWTLink.js'
import isAdmin from "./isAdmin.js"

export { handleError, notFound, validateAuth,validateAuthLink,isAdmin };
