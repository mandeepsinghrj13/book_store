const { createPool } = require("mysql");
const logger = require("../utility/logger");
const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 1000,
});
pool.getConnection(function (err) {
  if (err) throw err;
  logger.info("database connected");
});
module.exports = pool;
