const logger = require("../utility/logger");
const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", bookSchema);
class Model {
  addBook = (Bookinfo, callback) => {
    const book = new Books({
      author: Bookinfo.author,
      title: Bookinfo.title,
      quantity: Bookinfo.quantity,
      price: Bookinfo.price,
      description: Bookinfo.description,
    });
    book.save((error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };

  getAllBooks = () => {
    return new Promise((resolve, reject) => {
      Books.find()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  getBook = async (id) => {
    try {
      return await Books.find({ $and: [{ _id: id.bookId }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  };

  searchBook = async (id) => {
    try {
      return await Books.find({ $and: [{ title: id.title }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  };

  updateBook = (bookDetails) => {
    return new Promise((resolve, reject) => {
      Books.findByIdAndUpdate(
        bookDetails.bookId,
        {
          author: bookDetails.author,
          title: bookDetails.title,
          quantity: bookDetails.quantity,
          price: bookDetails.price,
          description: bookDetails.description,
        },
        { new: true }
      )

        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  deleteBook = async (bookDetails) => {
    try {
      return await Books.findByIdAndRemove(bookDetails);
    } catch (err) {
      return err;
    }
  };
}
module.exports = new Model();
