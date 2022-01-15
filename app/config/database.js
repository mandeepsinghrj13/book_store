const mongoose = require("mongoose");
const logger = require("../utility/logger");
const url = process.env.URL;
class DbConnection {
  database = () => {
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose
      .connect(url, {
        useNewUrlParser: true,
      })
      .then(() => {
        logger.info("Successfully connected to the database");
      })
      .catch((err) => {
        logger.error("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
  };
}
module.exports = new DbConnection();
