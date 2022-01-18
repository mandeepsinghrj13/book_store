const service = require("../service/books");
const validation = require("../utility/Validation");
const logger = require("../utility/logger");
class BookController {
  addBook = (req, res) => {
    try {
      const bookDetails = {
        author: req.body.author,
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
      };
      service.addBook(bookDetails, (error, data) => {
        if (error) {
          logger.error("failed to addBook");
          return res.status(400).json({
            message: "failed to addBook",
            success: false,
          });
        } else {
          logger.info("Successfully inserted book");
          return res.status(201).send({
            message: "Successfully inserted book",
            success: true,
            data: data,
          });
        }
      });
    } catch {
      logger.error("Internal server error");
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };

  getAllBooks = (req, res) => {
    try {
      service.getAllBooks(resolve, reject);
      function resolve(data) {
        logger.info("Get All Books successfully");
        return res.status(200).json({
          message: "Get All Books successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("Failed to get all Books");
        return res.status(400).json({
          message: "failed to get all Books",
          success: false,
        });
      }
    } catch {
      logger.error("Internal Error");
      return res.status(500).json({
        message: "Internal Error",
      });
    }
  };

  getBook = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, bookId: req.params.id };
      const data = await service.getBook(id);
      if (data.message) {
        return res.json({
          message: "Book not found",
          success: false,
        });
      }
      logger.info("Book retrieved succesfully");
      return res.status(200).json({
        message: "Book retrieved succesfully",
        success: true,
        data: data,
      });
    } catch {
      logger.error("Internal Error");
      return res.status(500).json({
        message: "Internal Error",
        success: false,
      });
    }
  };

  searchBook = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, title: req.body.title };
      const data = await service.searchBook(id);
      if (data.length !== 0) {
        logger.info("search book retrieved succesfully");
        return res.status(200).json({
          message: "search book retrieved succesfully",
          success: true,
          data: data,
        });
      } else {
        return res.json({
          message: "not found book",
          success: false,
          data: data,
        });
      }
    } catch {
      logger.error("Internal Error");
      return res.status(500).json({
        message: "Internal Error",
        success: false,
      });
    }
  };

  updateBook = (req, res) => {
    try {
      const bookDetails = {
        author: req.body.author,
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        bookId: req.params.bookId,
      };
      const validationResult = validation.updateBook.validate(bookDetails);
      if (validationResult.error) {
        logger.error("Wrong Input Validations");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: validationResult,
        });
      }
      service.updateBook(bookDetails, resolve, reject);
      function resolve(data) {
        logger.info("book Updated Successfully");
        return res.status(201).send({
          message: "book Updated Successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        logger.error("book Not Updated or bookId Is Not Match");
        return res.status(400).json({
          message: "Note Not Updated or bookId Is Not Match",
          success: false,
        });
      }
    } catch {
      logger.error("Internal Server Error");
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  deleteBook = async (req, res) => {
    try {
      const data = await service.deleteBook(req.params.bookId);
      if (data == null) {
        logger.error("book not found");
        return res.status(404).json({
          message: "book not found",
          success: false,
        });
      }
      logger.info("book Deleted succesfully");
      return res.status(200).json({
        message: "book Deleted succesfully",
        success: true,
        data: data,
      });
    } catch (err) {
      logger.error("book not deleted");
      return res.status(500).json({
        message: "book not deleted",
        success: false,
        data: err,
      });
    }
  };
}

module.exports = new BookController();
