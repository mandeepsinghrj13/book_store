const controller = require("../controller/registration");
const helper = require("../utility/helper.js");

module.exports = (app) => {
  app.post("/userRegistration", helper.setRole("user"), controller.register);
  // api for adminRegistration
  app.post("/adminRegistration", helper.setRole("admin"), controller.register);
  // api for login
  app.post("/login", controller.login);
};
