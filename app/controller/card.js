const services = require("../service/card");
class CartController {
  addToCart = (req, res) => {
    try {
      const userInfo = {
        userId: req.user.dataForToken.id,
        itemId: req.params.id,
        qty: req.body.qty,
      };
      console.log(userInfo, "userInfo in controller");
      services.addToCart(userInfo, (err, data) => {
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

  getCart = (req, res) => {
    try {
      const data = {
        userId: req.params.userId, // registration id
      };
      services
        .getCart(data)
        .then((carts) => {
          res.status(200).send({
            success: true,
            message: "get cart by id successfully",
            carts,
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: false,
            message: "unable to fetch cart",
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

  placeOrder = (req, res) => {
    try {
      const data = {
        cartId: req.params.cartId,
        userId: req.user.dataForToken.id,
        isPurchased: req.body.isPurchased,
      };
      services
        .placeOrder(data)
        .then(() => {
          res.status(200).send({
            success: true,
            message: "order placed successfully",
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: false,
            message: "unable to place order",
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

  removeBookFromCart = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, bookId: req.body.bookId };
      const data = await services.removeBookFromCart(id);
      if (data) {
        console.log("controller", data);
        return res.status(200).json({
          success: true,
          message: "book removed from cart successfully",
          data: data,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "book was unable to remove from cart",
        });
      }
    } catch {
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  };
}
module.exports = new CartController();
