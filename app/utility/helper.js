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

  validateToken = (req, res, next) => {
    const header = req.headers.authorization;
    const myArr = header.split(" ");
    const token = myArr[1];
    try {
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(400).send({ success: false, message: "Invalid Token" });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.status(401).send({ success: false, message: "Authorisation failed! Invalid user" });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: "Something went wrong!" });
    }
  };

  verifyRole = (req, res, next) => {
    console.log(req.user);
    if (req.user.dataForToken.role == "admin") {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthentic user",
      });
    }
  };
}

module.exports = new Helper();
