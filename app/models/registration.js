const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

class Model {
  register = (data, callback) => {
    const registrationDetails = new Registration({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
    });
    try {
      registrationDetails.save((error, data) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, data);
        }
      });
    } catch (error) {
      return callback("Internal error", null);
    }
  };

  login = (loginInfo, callback) => {
    try {
      Registration.findOne({ email: loginInfo.email }, (error, data) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      callback("Internal error", null);
    }
  };
}

module.exports = new Model();
