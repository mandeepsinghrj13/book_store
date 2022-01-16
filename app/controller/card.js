const services = require("../service/card");
class CartController {
  createCart = (req, res) => {
    try {
      const userInfo = {
        userId: req.user.dataForToken.id,
        itemId: req.params.id,
        qty: req.body.qty,
      };
      console.log(userInfo, "userInfo in controller");
      services.createCart(userInfo, (err, data) => {
        if (err) {
          return res.status(400).json({
            message: err,
            success: false,
          });
        }
        return res.status(201).json({
          message: "Item added successfully",
          success: true,
          data: data,
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  getAllCarts = (req, res) => {
    try {
      services
        .getAllCarts(req)
        .then((carts) => {
          res.status(200).send({
            success: true,
            message: "get all carts successfully",
            carts,
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: false,
            message: "unable to fetch carts",
            err,
          });
        });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  };
}
module.exports = new CartController();
