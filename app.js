const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const app = express();

app.use(express.json());
// GET /api/topics
app.get("/api/topics", getTopics);

// GET /api/articles/:article_id
// PATCH /api/articles/:article_id
// GET /api/articles
// GET /api/articles/:article_id/comments
// POST /api/articles/:article_id/comments
// DELETE /api/comments/:comment_id
// GET /api

// GET /api/users
// GET /api/users/:username
// PATCH /api/comments/:comment_id

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
