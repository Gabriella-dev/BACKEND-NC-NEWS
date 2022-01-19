const { selectArticlesById } = require("../models/articles.models");
exports.getArticlesById = (req, res, next) => {
  console.log("hello articles controlers");
  selectArticlesById(req.params.article_id).then((articles) => {
    res.status(200).send({ articles });
  });
};
