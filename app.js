const cors = require("cors");
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  patchArticleById,
  getArticles,
  getArticleComments,
  postComment,
} = require("./controllers/articles.controller");
const { deleteCommentsById } = require("./controllers/comments.controllers");
const {
  psqlErroes,
  customErrors,
  serverErrors,
  handle404s,
} = require("./errors/errors");
const endpoints = require("./endpoints.json");

app.use(cors());

app.use(express.json());
app.get("/api", (req, res, next) => {
  res.send(endpoints);
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteCommentsById);

app.all("*", handle404s);
app.use(psqlErroes);
app.use(customErrors);
app.use(serverErrors);

module.exports = app;
