const service = require("../service/registration");
const logger = require("../utility/logger");
const validation = require("../utility/Validation");
class Controller {
  register = (req, res) => {
    try {
      const registrationDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.role,
      };

      const validationRegister = validation.authUserRegister.validate(registrationDetails);

      if (validationRegister.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationRegister,
        });
      }

      service.register(registrationDetails, (error, data) => {
        if (error) {
          logger.error("User already exist");
          return res.status(400).send({
            success: false,
            message: "User already exist",
          });
        }
        logger.info("registered successfully");
        return res.status(200).send({
          success: true,
          message: "registered successfully",
          data: data,
        });
      });
    } catch (err) {
      logger.error("Internal server error");
      res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  };

  login = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      const validationLogin = validation.authUserLogin.validate(userLoginInfo);

      if (validationLogin.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationLogin,
        });
      }
      service.userLogin(userLoginInfo, (error, token) => {
        if (error) {
          logger.error("Unable to login. Please enter correct info");
          return res.status(400).json({
            success: false,
            message: "Unable to login. Please enter correct info",
            error,
          });
        }
        logger.info("User logged in successfully");
        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: token,
        });
      });
    } catch (error) {
      logger.error("Error while Login");
      return res.status(500).json({
        success: false,
        message: "Error while Login",
        data: null,
      });
    }
  };
}

module.exports = new Controller();
