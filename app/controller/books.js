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
      service.getAllBooks((err, results) => {
        if (err) {
          return res.json({
            message: "failed to get all Books",
            success: false,
          });
        }
        return res.json({
          message: "Get All Books successfully",
          success: true,
          data: results,
        });
      });
    } catch {
      return res.status(500).json({
        message: "Internal Error",
      });
    }
  };

  getBook = (req, res) => {
    try {
      const id = req.params.id;
      service.getBook(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            message: "Book not found",
            success: false,
          });
        }
        return res.status(200).json({
          message: "Book found succesfully",
          success: true,
          data: results,
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Error",
        success: false,
        data: err,
      });
    }
  };

  updateBook = (req, res) => {
    try {
      const data = req.body;
      service.updateBook(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            message: "Note Not Updated or bookId Is Not Match",
            success: false,
          });
        }
        console.log(results, "resultes");
        return res.json({
          message: "book Updated Successfully",
          success: true,
          data: results,
        });
      });
    } catch {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  deleteBook = (req, res) => {
    try {
      const data = req.params.bookId;
      service.deleteBook(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (results.affectedRows == 0) {
          return res.json({
            message: "book Id not found",
            success: false,
          });
        }
        return res.json({
          message: "book Deleted succesfully",
          success: true,
          data: results,
        });
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
