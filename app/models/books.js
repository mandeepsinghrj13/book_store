const pool = require("../config/database");
module.exports = {
  addBook: (data, callBack) => {
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
  },

  getAllBooks: (callBack) => {
    pool.query(`select id, author, title, quantity, price, description from book`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  getBook: (id, callBack) => {
    pool.query(
      `select id, author, title, quantity, price, description from book where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateBook: (data, callBack) => {
    pool.query(
      `update book set author=?, title=?, quantity=?, price=?, description=? where id = ?`,
      [data.author, data.title, data.quantity, data.price, data.description, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteBook: (data, callBack) => {
    pool.query(`delete from book where id = ?`, [data], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        return callBack(null, results);
      }
    });
  },
};
