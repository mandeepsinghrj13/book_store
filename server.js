require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const logger = require("./app/utility/logger");
const app = express();
app.use("/bookstore", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const connection = require("./app/config/database");
connection.database();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "welcome to BookStore_App",
  });
});

require("./app/routes/routes")(app);

app.listen(process.env.APP_PORT, () => {
  logger.info("server runing on port : 4000 ", process.env.APP_PORT);
});
module.exports = app;
