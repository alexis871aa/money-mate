const ApiError = require("../exceptions/apiError");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).send({
      status: "error",
      message: err.message,
      details: err.errors || null,
    });
  }

  console.error(err);

  return res.status(500).send({
    status: "error",
    message: "Внутренняя ошибка сервера",
    details: err.message,
  });
};
