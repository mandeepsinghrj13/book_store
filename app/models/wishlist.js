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
  removeBook = async (data) => {
    try {
      let wishList = await wishlistModel.findOne({ userId: data.userId });
      if (wishList) {
        let itemIndex = wishList.book.findIndex((p) => p.bookId == data.bookId);
        if (itemIndex >= 0) {
          await wishlistModel.updateOne({ userId: data.userId }, { $pull: { book: { bookId: data.bookId } } });
          return true;
        } else {
          return false;
        }
      }
    } catch (err) {
      return err;
    }
  };
}

module.exports = new wishListModels();
