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

  getAllBooks = (body) => {
    return new Promise((resolve, reject) => {
      bookModel.getAllBooks(body, (err, results) => {
        if (err) {
          return reject(err, null);
        }
        return resolve(null, results);
      });
    });
  };

  getBook = (id, callBack) => {
    bookModel.getBook(id, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  };

  updateBook = (data, callBack) => {
    bookModel.updateBook(data, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  };

  deleteBook = (data, callBack) => {
    bookModel.deleteBook(data, (err, results) => {
      if (err) {
        return callBack(err, null);
      }
      return callBack(null, results);
    });
  };
}
module.exports = new Service();
