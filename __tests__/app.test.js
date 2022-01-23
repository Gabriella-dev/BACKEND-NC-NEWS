const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/invalid_url", () => {
  test("status: 404 and message", () => {
    return request(app)
      .get("/invalid_url")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });
});

describe("GET /api/topics", () => {
  test("200: responds with an an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toHaveLength(3);
        res.body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("status:200, responds with a single matching article object", () => {
    const article_id = 3;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          body: "some gifs",
          votes: 0,
          topic: "mitch",
          author: "icellusedkars",
          created_at: "2020-11-03T00:00:00.000Z",
          comment_count: "2",
        });
      });
  });
  test("QUERY: article_id; existing. status 200 and returns an object", () => {
    return request(app)
      .get(`/api/articles/1`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(String),
        });
      });
  });
  test("QUERY: article_id; invalid id. status 400 and returns an error message", () => {
    return request(app)
      .get(`/api/articles/invalid_id`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("QUERY: article_id; not existing. status 404 and returns an error message", () => {
    return request(app)
      .get(`/api/articles/10000`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("200: responds with", () => {
    const article_id = 1;
    const newVotes = 8;

    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: newVotes })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          body: "I find this existence challenging",
          votes: 108,
          topic: "mitch",
          author: "butter_bridge",
          created_at: "2020-07-08T23:00:00.000Z",
        });
      });
  });
  test("QUERY: article_id; invalid id. status 400 and returns an error message", () => {
    const article_id = "invalid_url";
    const newVotes = 8;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: newVotes })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("QUERY: article_id; not existing. status 404 and returns an error message", () => {
    const article_id = 10000;
    const newVotes = 8;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: newVotes })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("Status 400, invalid inc_votes type", () => {
    const article_id = 7;
    const newVotes = "for";
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: newVotes })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Status 200, missing `inc_votes` key. No effect to article.", () => {
    const article_id = 1;
    const newVotes = 0;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: newVotes })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          body: "I find this existence challenging",
          votes: 100,
          topic: "mitch",
          author: "butter_bridge",
          created_at: "2020-07-08T23:00:00.000Z",
        });
      });
  });
});

describe("GET /api/articles/", () => {
  test("status:200, responds with array of article objects", () => {
    return request(app)
      .get(`/api/articles`)
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(5);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });

  test("status:200, responds with array of article objects with the topic 'cats'", () => {
    const topic = "cats";
    return request(app)
      .get(`/api/articles/`)
      .query({
        topic: topic,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(1);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });

  test("status:200, responds with array of article objects with sort_by and order_by defaults", () => {
    return request(app)
      .get(`/api/articles/`)
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(5);
        expect(body.articles[0].created_at).toBe("2020-11-03T00:00:00.000Z");
      });
  });

  test("status:200, responds with array of article objects with sort_by default and order_by non default", () => {
    const order_by = "ASC";
    return request(app)
      .get(`/api/articles/`)
      .query({
        order_by: order_by,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(5);
        expect(body.articles[0].created_at).toBe("2020-06-05T23:00:00.000Z");
      });
  });

  test("status:200, responds with array of article objects with sort_by non default and order_by default", () => {
    const sort_by = "title";
    return request(app)
      .get(`/api/articles/`)
      .query({
        sort_by: sort_by,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(5);
        expect(body.articles[0].title).toBe(
          "UNCOVERED: catspiracy to bring down democracy"
        );
      });
  });

  test("status:200, responds with array of article objects with sort_by non default and order_by non default", () => {
    const sort_by = "title";
    const order_by = "ASC";
    return request(app)
      .get(`/api/articles/`)
      .query({
        sort_by: sort_by,
        order_by: order_by,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(5);
        expect(body.articles[0].title).toBe("A");
        expect(body.articles[1].title).toBe(
          "Eight pug gifs that remind me of mitch"
        );
      });
  });

  test("status:200, responds with array of article objects with topic and sort_by non default and order_by non default", () => {
    const topic = "mitch";
    const sort_by = "title";
    const order_by = "ASC";
    return request(app)
      .get(`/api/articles/`)
      .query({
        sort_by: sort_by,
        order_by: order_by,
        topic: topic,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles).toHaveLength(4);
        expect(body.articles[0].title).toBe("A");
        expect(body.articles[1].title).toBe(
          "Eight pug gifs that remind me of mitch"
        );
      });
  });

  test("Status 400. invalid `order` query", () => {
    const order_by = "bananas";
    return request(app)
      .get(`/api/articles/`)
      .query({
        order_by: order_by,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Status 400. invalid `sort_by` query`", () => {
    const sort_by = "bananas";
    return request(app)
      .get(`/api/articles/`)
      .query({
        sort_by: sort_by,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("status:200, responds with an array of comments for the given article_id", () => {
    const article_id = 9;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments).toHaveLength(2);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test("Status 400, invalid ID,", () => {
    const article_id = "bananas";
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Status 404, non existent ID,", () => {
    const article_id = 99099999;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("Status 201, respond with created comment object", () => {
    const article_id = 9;
    const new_comment =
      "I would love to stand here and talk with you — but I’m not going to.";
    const username = "butter_bridge";

    return request(app)
      .post(`/api/articles/${article_id}/comments`)
      .send({
        new_comment: new_comment,
        username: username,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual({
          comment_id: 19,
          author: "butter_bridge",
          article_id: 9,
          votes: 0,
          created_at: "2022-01-23T00:00:00.000Z",
          body: "I would love to stand here and talk with you — but I’m not going to.",
        });
      });
  });
});
describe.only("DELETE comments", () => {
  test("status 204", () => {
    const comment_id = 19;
    return request(app).delete(`/api/comments/${comment_id}`).expect(204);
  });
});
