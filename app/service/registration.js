const models = require("../models/registration");
const utilities = require("../utility/helper.js");
const bcrypt = require("bcrypt");

class Service {
  register = (data, callback) => {
    data.password = bcrypt.hashSync(data.password, 10);
    models.register(data, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  };

  userLogin = (InfoLogin, callback) => {
    models.login(InfoLogin, (error, data) => {
      if (data) {
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            return callback(error + "Invalid Password", null);
          } else {
            const token = utilities.token(data);
            return callback(null, token);
          }
        });
      } else {
        return callback(error);
      }
    });
  };
}

module.exports = new Service();
