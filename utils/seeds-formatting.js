const articles = require("../db/data/test-data/articles");

exports.formatTopicsData = (topicData) => {
  const formattedTopics = topicData.map((topic) => [
    topic.slug,
    topic.description,
  ]);
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
exports.formatArticlesDate = (articleData) => {
  const formatArticle = articleData.map((article) => {
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
  return formatArticle;
};
exports.formatCommentData = (commentData) => {
  const formatArticle = commentData.map((comment) => {
    return [
      comment.body,
      comment.votes,
      comment.author,
      comment.article_id,
      comment.created_at,
    ];
  });
  return formatArticle;
};
