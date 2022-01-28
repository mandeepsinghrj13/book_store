const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

const wishlistModel = mongoose.model("wishList", wishlistSchema);

class wishListModels {
  addToWish = (info, callback) => {
    const data = new wishlistModel({
      userId: info.userId,
      book: [
        {
          bookId: info.itemId,
          qty: info.qty,
        },
      ],
    });
    wishlistModel.findOne({ userId: info.userId }, (err, result) => {
      if (err) {
        return callback(err, null);
      } else {
        if (result == null) {
          data
            .save()
            .then((data) => {
              console.log("empty");
              return callback(null, data);
            })
            .catch((error) => {
              return callback(error, null);
            });
        } else {
          let updated = false;
          const index = result.book.findIndex((item) => item.bookId == info.itemId);
          console.log("index = ", index);
          if (index >= 0) {
            updated = true;
            const newBook = {
              bookId: result.book[index].bookId,
              qty: result.book[index].qty + info.qty,
            };
            console.log("Old Book", result.book[index]);
            console.log("newBook = ", newBook);
            wishlistModel.updateOne({ _id: result._id }, { $pull: { book: result.book[index] } }, { new: true }, (err, res) => {
              console.log(result._id, "id pull");
              console.log(err, res);
            });
            wishlistModel.updateOne({ _id: result._id }, { $push: { book: newBook } }, { new: true }, (err, res) => {
              if (err) {
                return callback("Error in updating quantity", null);
              } else {
                return callback(null, "wishList updated");
              }
            });
          }

          if (updated == false) {
            const newBook = {
              bookId: info.itemId,
              qty: info.qty,
            };
            wishlistModel.findByIdAndUpdate(result._id, { $push: { book: newBook } }, { new: true }, (err, res) => {
              if (err) {
                console.log(err);
                return callback("Error in adding wishList", null);
              } else {
                return callback(null, "new book added into WishList");
              }
            });
          }
        }
      }
    });
  };
}

module.exports = new wishListModels();
