const comments = require("../db/data/test-data/comments");
const { removeCommentCommentById } = require("../models/comments.models");

exports.deleteCommentsById = (req, res, next) => {
  const { comment_id } = req.body;
  return removeCommentCommentById(comment_id)
    .then(() => {
      res.status(204).send({ msg: "deleted" });
    })
    .catch((err) => {
      next(err);
    });
};
