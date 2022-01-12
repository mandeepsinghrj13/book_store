const pool = require("../config/database");
const util = require("util");
const query = util.promisify(pool.query).bind(pool);
class Model {
  addBook = (data, callBack) => {
    pool.query(
      `insert into book(author, title, quantity, price, description) values(?,?,?,?,?)`,
      [data.author, data.title, data.quantity, data.price, data.description],
      (error, results, fields) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") {
            let err = "book already there";
            return callBack(err, null);
          } else {
            return callBack(error, null);
          }
        } else {
          return callBack(null, results);
        }
      }
    );
  };

  getAllBooks = () => {
    return new Promise((resolve, reject) => {
      query(`select id, author, title, quantity, price, description from book`, [])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  getBook = async (id) => {
    try {
      return await query(`select id, author, title, quantity, price, description from book where id = ?`, [id]);
    } catch (err) {
      return err;
    }
  };

  updateBook = (bookDetails) => {
    return new Promise((resolve, reject) => {
      query(`update book set author=?, title=?, quantity=?, price=?, description=? where id = ?`, [
        bookDetails.author,
        bookDetails.title,
        bookDetails.quantity,
        bookDetails.price,
        bookDetails.description,
        bookDetails.id,
      ])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  deleteBook = async (bookDetails) => {
    try {
      return await query(`delete from book where id = ?`, [bookDetails]);
    } catch (err) {
      return err;
    }
  };
}
module.exports = new Model();
