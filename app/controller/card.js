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
}
module.exports = new CartController();
