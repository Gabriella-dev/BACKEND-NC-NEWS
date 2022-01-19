const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: responds with an an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        //console.log(res.body);
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
  test("status:200, responds with a single matching ARTICLE", () => {
    const article_id = 3;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.articles).toEqual({
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
});
