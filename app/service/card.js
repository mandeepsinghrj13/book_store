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

  getAllCarts = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.getAllCarts(data);
      result.then((cartData) => resolve({ cartData })).catch((err) => reject({ err }));
    });
  };

  getCart = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.getCart(data);
      result.then((cartData) => resolve({ cartData })).catch((err) => reject({ err }));
    });
  };
}

module.exports = new Service();
