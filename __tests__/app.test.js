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
});

describe("GET /api/articles", () => {
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
});
