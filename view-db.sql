\c nc_news_test

UPDATE articles SET votes=5
WHERE article_id=1 RETURNING *;




SELECT articles.*, 
COUNT(comments.article_id) AS comment_count
FROM comments
INNER JOIN articles ON comments.article_id = articles.article_id
GROUP BY articles.article_id
ORDER BY articles.created_at ASC

SELECT articles.*, 
COUNT(comments.article_id) AS comment_count
FROM comments
INNER JOIN articles ON comments.article_id = articles.article_id
WHERE articles.topic = "mitch"
GROUP BY articles.article_id
ORDER BY articles.created_at ASC;

SELECT articles.*, 
COUNT(comments.article_id) AS comment_count
FROM comments
INNER JOIN articles ON comments.article_id = articles.article_id
WHERE articles.topic = 'mitch'
GROUP BY articles.article_id
ORDER BY articles.created_at ASC