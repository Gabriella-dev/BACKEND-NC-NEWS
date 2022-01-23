//const { sort } = require("../db/data/test-data/articles");
const { commentData } = require("../db/data/test-data");
const articles = require("../db/data/test-data/articles");
const comments = require("../db/data/test-data/comments");
const {
  selectArticleById,
  updateArticleById,
  selectArticles,
  selectArticleComments,
  updateArticleComments,
  removeCommentCommentById,
} = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      if (article) {
        res.status(200).send({ article });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  selectArticleById(article_id)
    .then((article) => {
      if (article) {
        return article.votes;
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    })
    .then((votes) => {
      let totalVotes = votes + inc_votes;

      updateArticleById(totalVotes, article_id)
        .then((article) => {
          res.status(200).send({ article });
        })
        .catch((err) => {
          next(err);
        });
    });
};

exports.getArticles = (req, res, next) => {
  const { topic } = req.query;
  const { sort_by } = req.query;
  const { order_by } = req.query;

  selectArticles(topic, sort_by, order_by)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      if (article) {
        next;
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });

  selectArticleComments(article_id)
    .then((comments) => {
      if (comments.length >= 0) {
        res.status(200).send({ comments });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, new_comment } = req.body;

  updateArticleComments(new_comment, username, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
