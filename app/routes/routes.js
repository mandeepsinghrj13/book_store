const controller = require("../controller/registration");
const booksController = require("../controller/books");
const cartController = require("../controller/card");
const helper = require("../utility/helper.js");
const middleware = require("../utility/helper.js");
module.exports = (app) => {
  app.post("/userRegistration", helper.setRole("user"), controller.register);
  // api for adminRegistration
  app.post("/adminRegistration", helper.setRole("admin"), controller.register);
  // api for login
  app.post("/login", controller.login);

  // Book CURD api
  app.post("/books", middleware.validateToken, helper.verifyRole, booksController.addBook);
  app.get("/getbooks", middleware.validateToken, booksController.getAllBooks);
  app.get("/books/:id", middleware.validateToken, booksController.getBook);
  app.put("/updatebooks/:bookId", middleware.validateToken, helper.verifyRole, booksController.updateBook);
  app.delete("/deletebooks/:bookId", middleware.validateToken, helper.verifyRole, booksController.deleteBook);

  app.post("/addToCart/:id", middleware.validateToken, cartController.addToCart);
  app.get("/carts", middleware.validateToken, cartController.getAllCarts);
  app.get("/cart/:userId", middleware.validateToken, cartController.getCart);
  app.put("/placeOrder/:cartId", middleware.validateToken, cartController.placeOrder);
};
