const app = require("./app");
app.listen(9990, (err) => {
  if (err) throw err;
  console.log(`server listening on port 9990`);
});
