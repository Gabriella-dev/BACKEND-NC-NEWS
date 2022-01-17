const db = require("../connection");
const format = require("pg-format");
const {
  formatTopicsData,
  formatUserData,
} = require("/Users/gabriella/dev/northcoders/backend/be-nc-news/utils/seeds-formatting.js");
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
      //console.log("table dropted");
      return db.query(`
    CREATE TABLE topics(
      slug VARCHAR(255) PRIMARY KEY,
      description TEXT NOT NULL
    )
    ;`);
    })
    .then(() => {
      //console.log("table dropted");
      return db.query(`
    CREATE TABLE users(
      username VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      avatar_url TEXT
    )
    ;`);
    })
    .then(() => {
      //console.log("users table");
      return db.query(`
      CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title TEXT,
        body TEXT,
        votes INT DEFAULT 0,
        topic VARCHAR(255) REFERENCES topics(slug),
        author VARCHAR(255) REFERENCES users(username),
        created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      ;`);
    })
    .then(() => {
      //  console.log("comments table");
      return db.query(`
    CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(255) REFERENCES  users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      body TEXT
    )
    ;`);
    })

    .then(() => {
      // console.log(`all tables created`);
    })
    .then(() => {
      const formattedTopics = formatTopicsData(topicData);
      //console.log("formsatted Topics>>>>", formattedTopics);
      const sql = format(
        `INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
        formattedTopics
      );
      return db.query(sql);
    })
    .then((results) => {
      console.log("results.rows formatted topics>>>>", results.rows);
      const topicsRef = results.rows;
      return topicsRef;
    })
    .then(() => {
      const formattedUsers = formatUserData(userData);
      const sql = format(
        `INSERT INTO users (username, name,avatar_url) VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(sql);
    })
    .then((results) => {
      console.log("results.rows formatted users>>>>", results.rows);
      const userRef = results.rows;
      return userRef;
    });
};

module.exports = seed;
