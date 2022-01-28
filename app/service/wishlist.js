const models = require("../models/wishlist");

class Service {
  addToWish = (info, callback) => {
    models.addToWish(info, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  };
}

module.exports = new Service();
