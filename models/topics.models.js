const db = require("../db/connection");
exports.selectTopics = () => {
  console.log("in the model");
  return db.query(`SELECT * FROM topics;`).then((results) => {
    //console.log(results.rows);
    return results.rows;
  });
};
// {"topics": {[
//   { slug: 'mitch', description: 'The man, the Mitch, the legend' },
//   { slug: 'cats', description: 'Not dogs' },
//   { slug: 'paper', description: 'what books are made of' }
// ]}}
