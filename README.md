# BACKEND-NC-NEWS

**Project Title**

## BACKEND-NC-NEWS

This is a repository for building a basic API for a news website. The database is PSQL It stores articles, users, topics and comments using different endpoints.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

**Prerequisites**

The packages and dependences required for running this API are available in the package.json file and can be installed by running the following command: `npm i`

This API uses Node.js v17.3.0, cors - ^2.8.5, dotenv - ^14.1.0, express - ^4.17.2, pg - ^8.7.1, pg-format - ^1.0.4; Developer Dependencies: jest - ^27.4.7, supertest - ^6.2.1

**Installing**

For local use, a config folder is needed for switching between the development, test, and production environments.

All packages needed can be found in the package.json file.

**Step 1 - Seeding**

For seeding the database, the package.json file has already been set up with a script depending on the environment it runs in:

development: npm run seed:dev;
test: npm run seed:test;
production: npm run seed:production;
These command will ensure the database is dropped before re-seeding the file every time.

**Step 2 - Testing**

Tests have been provided for the main seed function, for each endpoint with all methods used, as well as for each error which can occur at each endpoint. A script has been set up for running the tests: `npm test`

## Routes:

GET /api: Serves an HTML page with documentation for all the available endpoints

**Topics**

GET /api/topics: Serves all the topics

**Articles**

GET /api/articles: Returns all the articles

GET /api/articles/:article_id: Returns the article corresponding to the article_id passed in

GET /api/articles/:article_id/comments: Gets all the comments for a individual article

POST /api/articles/:article_id/comments: Adds a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"new_comment": "This is my new comment", "username": "butter_bridge" }

PATCH /api/articles/:article_id: PATCH /api/articles/:article_id modifies the votes on the article in question

**Comments**

DELETE /api/comments/:comment_id: Deletes a comment

**Step 3 - Deployment**

The API is hosted on Heroku here: https://gabriella-nc-news.herokuapp.com/api

For more information on how to deploy and manage your apps on Heroku, their docuemntation is available here: https://devcenter.heroku.com/
