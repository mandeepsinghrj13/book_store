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
  app.post("/books/addbook", middleware.validateToken, helper.verifyRole, booksController.addBook);
  app.get("/books/getallbook", middleware.validateToken, booksController.getAllBooks);
  app.get("/books/getbook/:bookId", middleware.validateToken, booksController.getBook);
  app.get("/books/searchbook/:title", middleware.validateToken, booksController.searchBook);
  app.put("/books/updatebook/:bookId", middleware.validateToken, helper.verifyRole, booksController.updateBook);
  app.delete("/books/deletebook/:bookId", middleware.validateToken, helper.verifyRole, booksController.deleteBook);

  // Cart CURD api
  app.post("/carts/addToCart/:bookId", middleware.validateToken, cartController.addToCart);
  app.get("/carts/cart", middleware.validateToken, cartController.getAllCarts);
  app.get("/carts/cart/:userId", middleware.validateToken, cartController.getCart);
  app.put("/carts/placeOrder/:cartId", middleware.validateToken, cartController.placeOrder);
  app.delete("/carts/removeBookFromCart", middleware.validateToken, cartController.removeBookFromCart);
};
