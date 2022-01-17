const models = require("../models/card");

class Service {
  addToCart = (userInfo, callback) => {
    models.addToCart(userInfo, (err, data) => {
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

  placeOrder = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.placeOrder(data);
      result.then((book) => resolve({ book })).catch((err) => reject({ err }));
    });
  };
}

module.exports = new Service();
