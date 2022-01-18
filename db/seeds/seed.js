const db = require("../connection");
const format = require("pg-format");
const {
  formatTopicsData,
  formatUserData,
  formatArticlesDate,
  formatCommentData,
} = require("/Users/gabriella/dev/northcoders/backend/be-nc-news/utils/seeds-formatting.js");
const { user } = require("pg/lib/defaults");
const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
          return db.query(`DROP TABLE IF EXISTS topics;`);
        });
      });
    })
    .then(() => {
      return db.query(`
    CREATE TABLE topics(
      slug VARCHAR(255) PRIMARY KEY,
      description TEXT NOT NULL
    )
    ;`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE users(
      username VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      avatar_url TEXT
    )
    ;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        topic VARCHAR(255) REFERENCES topics(slug),
        author VARCHAR(255) REFERENCES users(username) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      ;`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(255) REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      body TEXT
    )
    ;`);
    })
    .then(() => {
      // seeding topics
      const formattedTopics = formatTopicsData(topicData);
      const sql = format(
        `INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
        formattedTopics
      );
      return db.query(sql);
    })
    .then(() => {
      //seeding users
      const formattedUsers = formatUserData(userData);
      const sql = format(
        `INSERT INTO users (username, name,avatar_url) VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(sql);
    })
    .then((results) => {
      // users reference
      const usersRef = results.rows;
      return usersRef;
    })
    .then(() => {
      //seeding articles
      const formatArticle = formatArticlesDate(articleData);
      const sql = format(
        `INSERT INTO articles (title, body, votes, topic, author,created_at) VALUES %L RETURNING *;`,
        formatArticle
      );
      return db.query(sql);
    })
    .then(() => {
      //seeding comments
      const formatComment = formatCommentData(commentData);
      const sql = format(
        `INSERT INTO comments (body, votes, author, article_id, created_at) VALUES %L RETURNING *;`,
        formatComment
      );
      return db.query(sql);
    });
  // .then((results) => {
  //   console.log(results.rows);
  // });
};
module.exports = seed;
