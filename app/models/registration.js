const pool = require("../config/database");

module.exports = {
  register: (data, callBack) => {
    pool.query(
      `insert into bookstoretable( firstName, lastName, email, password, role) values(?,?,?,?,?)`,
      [data.firstName, data.lastName, data.email, data.password, data.role],
      (error, results, fields) => {
        if (error) {
          if (error.code === "ER_DUP_ENTRY") {
            let err = "user already there";
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

  login: (data, callBack) => {
    pool.query(`select * from bookstoretable where email = ?`, [data.email], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
