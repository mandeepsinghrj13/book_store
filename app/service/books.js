const bookModel = require("../models/books");
class Service {
  addBook = (book, callback) => {
    bookModel.addBook(book, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };

  getAllBooks = (resolve, reject) => {
    bookModel
      .getAllBooks()
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  getBook = async (id) => {
    try {
      return await bookModel.getBook(id);
    } catch (err) {
      return err;
    }
  };

  updateBook = (bookDetails, resolve, reject) => {
    bookModel
      .updateBook(bookDetails)
      .then((data) => resolve(data))
      .catch(() => reject());
  };

  deleteBook = async (bookDetails) => {
    try {
      return await bookModel.deleteBook(bookDetails);
    } catch (err) {
      return err;
    }
  };
}
module.exports = new Service();
