const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message;

  switch (statusCode) {
    case 400:
      message = err.message || "Bad Request";
      break;
    case 401:
      message = err.message || "Unauthorized";
      break;
    case 403:
      message = err.message || "Forbidden";
      break;
    case 404:
      message = err.message || "Not Found";
      break;
    case 409:
      message = err.message || "Conflict";
      break;
    default:
      message = "An error occurred on the server";
  }

  res.status(statusCode).send({
    status: statusCode,
    message: message,
  });
};

module.exports = errorHandler;
