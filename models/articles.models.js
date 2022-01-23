const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  const artIdQuery = `SELECT articles.*, 
    COUNT(comments.article_id) AS comment_count
    FROM comments
    FULL OUTER JOIN articles ON comments.article_id = articles.article_id
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
exports.selectArticles = (topic, sort_by, order_by) => {
  let queryArgs = [];
  let artIdQuery = `
    SELECT articles.*, 
    COUNT(comments.article_id) AS comment_count
    FROM comments
    INNER JOIN articles ON comments.article_id = articles.article_id
  `;

  if (topic) {
    artIdQuery += ` WHERE articles.topic = $1`;
    queryArgs.push(topic);
  }

  if (!sort_by) {
    sort_by = "created_at";
  }

  if (!order_by) {
    order_by = "DESC";
  }

  artIdQuery += ` GROUP BY articles.article_id
  ORDER BY articles.${sort_by} ${order_by};
  `;

  return db.query(artIdQuery, queryArgs).then((result) => {
    return result.rows;
  });
};
exports.selectArticleComments = (article_id) => {
  const artIdQuery = ` 
  SELECT  
  comments.comment_id, 
  comments.votes, 
  comments.created_at,
  comments.author,
  comments.body
  FROM comments
  INNER JOIN articles ON comments.article_id = articles.article_id
  WHERE articles.article_id = $1 
  ORDER BY comments.created_at DESC
  `;

  return db.query(artIdQuery, [article_id]).then((result) => {
    return result.rows;
  });
};

exports.updateArticleComments = (new_comment, username, article_id) => {
  // update article comments
  return db
    .query(
      `INSERT INTO comments (body, author, article_id)
      VALUES ($1, $2, $3) RETURNING *;`,
      [new_comment, username, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
