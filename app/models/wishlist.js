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
              return callback(null, data);
            })
            .catch((error) => {
              return callback(error, null);
            });
        } else {
          let updated = false;
          const index = result.book.findIndex((item) => item.bookId == info.itemId);
          if (index >= 0) {
            updated = true;
            return callback(err, null);
          }
          if (updated == false) {
            const newBook = {
              bookId: info.itemId,
            };
            wishlistModel.findByIdAndUpdate(result._id, { $push: { book: newBook } }, { new: true }, (err, res) => {
              if (err) {
                return callback("Error in adding wishList", null);
              } else {
                return callback(null, data);
              }
            });
          }
        }
      }
    });
  };
}

module.exports = new wishListModels();
