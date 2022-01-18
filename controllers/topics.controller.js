const { selectTopics } = require("../models/topics.models");
exports.getTopics = (req, res, next) => {
  // console.log("hello topics controlers");
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
