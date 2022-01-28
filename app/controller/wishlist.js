const services = require("../service/wishlist");
class wishListController {
  addToWish = async (req, res) => {
    try {
      const info = {
        userId: req.user.dataForToken.id,
        itemId: req.params.bookId,
        qty: req.body.qty,
      };
      console.log("info in controller wishList", info);
      services.addToWish(info, (err, data) => {
        if (err) {
          return res.status(400).json({
            message: err,
            success: false,
          });
        }
        return res.status(200).json({
          message: "Book added into wishlist successfully",
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
module.exports = new wishListController();
