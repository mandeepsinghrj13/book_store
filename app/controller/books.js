const service = require("../service/books");

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
          return res.status(400).json({
            message: "failed to addBook",
            success: false,
          });
        } else {
          return res.status(201).send({
            message: "Successfully inserted book",
            success: true,
            data: data,
          });
        }
      });
    } catch {
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
        console.log(data, "data");
        return res.status(200).json({
          message: "Get All Books successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        return res.status(400).json({
          message: "failed to get all Books",
          success: false,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Internal Error",
      });
    }
  };

  getBook = async (req, res) => {
    try {
      const data = await service.getBook(req.params.id);
      if (!data) {
        return res.json({
          message: "Book not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Book retrieved succesfully",
        success: true,
        data: data,
      });
    } catch {
      return res.status(500).json({
        message: "Internal Error",
        success: false,
      });
    }
  };

  updateBook = (req, res) => {
    try {
      const bookDetails = req.body;
      service.updateBook(bookDetails, resolve, reject);
      function resolve(data) {
        return res.status(201).send({
          message: "book Updated Successfully",
          success: true,
          data: data,
        });
      }
      function reject() {
        return res.status(400).json({
          message: "Note Not Updated or bookId Is Not Match",
          success: false,
        });
      }
    } catch {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  deleteBook = async (req, res) => {
    try {
      const data = await service.deleteBook(req.params.bookId);
      if (data.affectedRows == 0) {
        return res.status(404).json({
          message: "book not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "book Deleted succesfully",
        success: true,
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "book not deleted",
        success: false,
        data: err,
      });
    }
  };
}

module.exports = new BookController();
