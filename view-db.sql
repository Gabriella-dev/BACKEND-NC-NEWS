\c nc_news_test

SELECT articles.article_id, articles.title, articles.body, articles.votes, articles.topic, articles.author, articles.created_at, 
COUNT(comments.article_id) AS comment_count
FROM comments
INNER JOIN articles ON comments.article_id = articles.article_id
WHERE articles.article_id=1
GROUP BY articles.article_id




--ORDER BY num_comments DESC
--LIMIT 3