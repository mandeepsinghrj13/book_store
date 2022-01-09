require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "welcome to BookStore_App",
  });
});

require("./app/routes/routes")(app);

app.listen(process.env.APP_PORT, () => {
  console.log("server up and runing on port : ", process.env.APP_PORT);
});
module.exports = app;
