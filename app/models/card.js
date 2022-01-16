const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
    book: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Books",
        },
        qty: {
          type: Number,
        },
      },
    ],
    isPurchased: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("Carts", cartSchema);

class CartModels {
  createCart = (userInfo, callback) => {
    const data = new CartModel({
      userId: userInfo.userId,
      book: [
        {
          bookId: userInfo.itemId,
          qty: userInfo.qty,
        },
      ],
    });
    CartModel.findOne({ userId: userInfo.userId }, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        if (result == null) {
          data
            .save()
            .then((data) => {
              return callback(null, data);
            })
            .catch((error) => {
              return callback(error, null);
            });
        } else {
          let updated = false;
          if (updated == false) {
            const newBook = {
              bookId: userInfo.itemId,
              qty: userInfo.qty,
            };
            CartModel.findByIdAndUpdate(result._id, { $push: { book: newBook } }, { new: true }, (err, res) => {
              if (err) {
                console.log(err);
                return callback("Error in adding book", null);
              } else {
                return callback(null, "book added");
              }
            });
          }
        }
      }
    });
  };

  getAllCarts = () => {
    return new Promise((resolve, reject) => {
      CartModel.find()
        .then((books) => resolve(books))
        .catch((err) => reject(err));
    });
  };

  getCart = (data) => {
    return new Promise((resolve, reject) => {
      CartModel.findOne({ userId: data.userId })
        .then((books) => resolve(books))
        .catch((err) => reject(err));
    });
  };

  placeOrder = (data) => {
    return new Promise((resolve, reject) => {
      CartModel.findByIdAndUpdate(data.cartId, { userId: data.userId, isPurchased: data.isPurchased }, { new: true })
        .then((cart) => resolve(cart))
        .catch((err) => reject(err));
    });
  };
}

module.exports = new CartModels();
