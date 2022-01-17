exports.formatTopicsData = (topicData) => {
  const formattedTopics = topicData.map((topic) => [
    topic.slug,
    topic.description,
  ]);
  // console.log(formattedTopics);
  return formattedTopics;
};
exports.formatUserData = (userData) => {
  const formattedUsers = userData.map((user) => [
    user.username,
    user.name,
    user.avatar_url,
  ]);
  return formattedUsers;
};
exporsts.formatArticlesDate = (articleData, topicsRef, usersRef) => {};

// CREATE TABLE articles(
//     article_id SERIAL PRIMARY KEY,
//     title TEXT,
//     body TEXT,
//     votes INT DEFAULT 0,
//     topic VARCHAR(255) REFERENCES topics(slug),
//     author VARCHAR(255) REFERENCES users(username),
//     created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
//   )
