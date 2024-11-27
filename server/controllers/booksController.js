require('dotenv').config();

const mongoose = require('mongoose');
const Book = require('./../model/Book.js');

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

module.exports.getAllBooks = (req, res) => {
  res.json("data")
}

module.exports.getBookById = (req, res) => {
  // Book.findById("6744b99489d00a1b5be6cce7")
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

module.exports.createBook = (req, res) => {
  Book.create(req.body)
    .then((createdBook) => res.json(createdBook))
    .catch(err => {
      console.log("error at adding data: ", err);
      res.status(500).json(err);
    });
}

module.exports.updateBook = (req, res) => {
  Book.findById(req.body.id)
    .then(book => {
      const keysToEdit = Object.keys(req.body).filter(key => key !== "id");

      keysToEdit.forEach(key => book[key] = req.body[key]);

      return book.save();
    })
    .then(book => res.json(book))
    .catch(err => {
      console.log("error at updating book: ", err);
      res.status(500).json(err);
    })
}

module.exports.deleteBook = (req, res) => {
  Book.deleteOne(req.body)
    .then(deleteRes => res.json(deleteRes))
    .catch(err => {
      console.log("error at deleting: ", err);
      res.status(500).json(err);
    })
}