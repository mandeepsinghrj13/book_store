require("dotenv").config();
const jwt = require("jsonwebtoken");

class Helper {
  setRole = (role) => {
    return (req, res, next) => {
      req.role = role;
      next();
    };
  };

  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET);
  };
}

module.exports = new Helper();
