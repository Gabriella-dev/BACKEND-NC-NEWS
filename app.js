const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("./controllers/articles.controller");
const {
  psqlErroes,
  customErrors,
  serverErrors,
  handle404s,
} = require("./errors/errors");

app.use(express.json());
// GET /api/topics
app.get("/api/topics", getTopics);

// GET /api/articles/:article_id
app.get("/api/articles/:article_id", getArticleById);
// PATCH /api/articles/:article_id
app.patch("/api/articles/:article_id", patchArticleById);
// GET /api/articles
app.get("/api/articles", getArticles);
// GET /api/articles/:article_id/comments
// POST /api/articles/:article_id/comments
// DELETE /api/comments/:comment_id
// GET /api

// GET /api/users
// GET /api/users/:username
// PATCH /api/comments/:comment_id
app.all("*", handle404s);
app.use(psqlErroes);
app.use(customErrors);
app.use(serverErrors);

module.exports = app;
// /Users/gabriella/dev/northcoders/backend/be-nc-news/errors/errors.js
