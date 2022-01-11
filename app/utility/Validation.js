const Joi = require("joi");
class Validation {
  authUserRegister = Joi.object({
    firstName: Joi.string().min(2).required().pattern(new RegExp("^[A-Za-z]{1}[a-z]{1,}$")),
    lastName: Joi.string().min(2).required().pattern(new RegExp("^[A-Za-z]{1}[a-z]{1,}$")),
    email: Joi.string().pattern(new RegExp("^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$")).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required(),
    role: Joi.string().required(),
  });
}
module.exports = new Validation();
