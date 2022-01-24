const controller = require("../controller/registration");
const booksController = require("../controller/books");
const cartController = require("../controller/card");
const helper = require("../utility/helper.js");
const middleware = require("../utility/helper.js");
module.exports = (app) => {
  app.post("/users/user", helper.setRole("user"), controller.register);
  // api for adminRegistration
  app.post("/users/admin", helper.setRole("admin"), controller.register);
  // api for login
  app.post("/users/login", controller.login);

  // Book CURD api
  app.post("/books", middleware.validateToken, helper.verifyRole, booksController.addBook);
  app.get("/books", middleware.validateToken, booksController.getAllBooks);
  app.get("/books/:bookId", middleware.validateToken, booksController.getBook);
  app.put("/books/:bookId", middleware.validateToken, helper.verifyRole, booksController.updateBook);
  app.delete("/books/:bookId", middleware.validateToken, helper.verifyRole, booksController.deleteBook);
  app.get("/books/searchbook/:title", middleware.validateToken, booksController.searchBook);

  // Cart CURD api
  app.post("/carts/:bookId", middleware.validateToken, cartController.addToCart);
  app.get("/carts", middleware.validateToken, cartController.getAllCarts);
  app.get("/carts/:userId", middleware.validateToken, cartController.getCart);
  app.put("/carts/:cartId", middleware.validateToken, cartController.placeOrder);
  app.delete("/carts", middleware.validateToken, cartController.removeBookFromCart);
};
