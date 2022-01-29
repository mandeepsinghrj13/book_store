const services = require("../service/wishlist");
class wishListController {
  addToWish = (req, res) => {
    try {
      const info = {
        userId: req.user.dataForToken.id,
        itemId: req.params.bookId,
      };
      services.addToWish(info, (err, data) => {
        if (err) {
          return res.status(400).json({
            message: err,
            success: false,
          });
        }
        if (data == null) {
          return res.status(409).json({
            message: "Book Already into wishlist",
            success: false,
          });
        }
        return res.status(200).json({
          message: "Book added into wishlist successfully",
          success: true,
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
