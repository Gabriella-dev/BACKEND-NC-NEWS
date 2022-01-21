const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  const artIdQuery = `SELECT articles.*, 
    COUNT(comments.article_id) AS comment_count
    FROM comments
    INNER JOIN articles ON comments.article_id = articles.article_id
    WHERE articles.article_id=$1
    GROUP BY articles.article_id`;

  return db.query(artIdQuery, [article_id]).then((result) => {
    return result.rows[0];
  });
};

exports.updateArticleById = (inc_votes, article_id) => {
  // update article votes

  return db
    .query(`UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *;`, [
      inc_votes,
      article_id,
    ])
    .then((result) => {
      return result.rows[0];
    });
};
exports.selectArticles = () => {
  const artIdQuery = `
  SELECT articles.*, 
  COUNT(comments.article_id) AS comment_count
  FROM comments
  INNER JOIN articles ON comments.article_id = articles.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at ASC`;

  return db.query(artIdQuery).then((result) => {
    return result.rows;
  });
};
