const Joi = require("joi");
class Validation {
  authUserRegister = Joi.object({
    firstName: Joi.string().min(2).required().pattern(new RegExp("^[A-Za-z]{1}[a-z]{1,}$")),
    lastName: Joi.string().min(2).required().pattern(new RegExp("^[A-Za-z]{1}[a-z]{1,}$")),
    email: Joi.string().pattern(new RegExp("^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$")).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required(),
    role: Joi.string().required(),
  });

  authUserLogin = Joi.object({
    email: Joi.string().pattern(new RegExp("^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$")).required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required(),
  });

  updateBook = Joi.object({
    author: Joi.string().min(2).required().pattern(new RegExp("^[A-Za-z ]{2,}$")),

    title: Joi.string().min(2).required(),

    quantity: Joi.number().required(),

    price: Joi.number().required(),

    description: Joi.string().required(),

    id: Joi.number().integer().required(),
  });
}
module.exports = new Validation();
