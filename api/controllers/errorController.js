const CODIGOS_ERROR = {
  401.1: 'Contraseña incorrecta',
  401.2: 'No estás autorizado',
  403: 'Acceso prohibido',
  404: 'Recurso no encontrado',
  500: 'Error interno servidor',
};

const handleError = (statusCode, message = null, res) => {
  if (statusCode in CODIGOS_ERROR) {
    return res.status(statusCode).send({
      error: statusCode,
      message: message || CODIGOS_ERROR[statusCode],
    });
  } else if (typeof statusCode === 'number') {
    return res.status(statusCode).send({
      error: statusCode,
      message: message,
    });
  } else {
    return res.status(500).send({
      error: 500,
      message: 'Código error no válido',
    });
  }
};

export default handleError;
