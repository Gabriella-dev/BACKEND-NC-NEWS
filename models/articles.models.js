const db = require("../db/connection");

exports.selectArticlesById = (article_id) => {
  const artIdQuery = `SELECT articles.article_id, articles.title,articles.body,articles.votes, articles.topic, articles.author, articles.created_at, 
    COUNT(comments.article_id) AS comment_count
    FROM comments
    INNER JOIN articles ON comments.article_id = articles.article_id
    WHERE articles.article_id=$1
    GROUP BY articles.article_id`;
  return db.query(artIdQuery, [article_id]).then((result) => {
    //console.log("results>>>", result.rows[0]);
    return result.rows[0];
  });
};
