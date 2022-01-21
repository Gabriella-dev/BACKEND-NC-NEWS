const {
  selectArticleById,
  updateArticleById,
  selectArticles,
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
      return article.votes;
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
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
