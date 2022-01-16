const models = require("../models/card");

class Service {
  createCart = (userInfo, callback) => {
    models.createCart(userInfo, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  };
}

module.exports = new Service();
