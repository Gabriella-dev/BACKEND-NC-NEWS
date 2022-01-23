exports.handle404s = (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
};

exports.psqlErroes = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "42703" || err.code === "42601") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.serverErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
