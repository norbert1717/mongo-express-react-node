/* 
ha olyan id-ra keresünk rá, ami nem létezik, akkor ne 200-as status kódot írjon ki a kód
    - findbyId-n belül kell módosítani
    - !book -> booknak nincs értéke
mongoosen belül van egy find metódus, amivel az összes adatot ki lehet mutatni
    - getallbooks-on belül kell ezt a findot lefuttatni, {} => van benne egy filter metódus, ezért üres, így mindent megjelenít.
    ha akarok valamilyen feltétel alapján keresni, akkor a {} belül kell írni 

*/
require('dotenv').config();

const mongoose = require('mongoose');
const Book = require('./../model/Book.js');

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

module.exports.getAllBooks = (req, res) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

module.exports.getBookById = (req, res) => {
  // Book.findById("6744b99489d00a1b5be6cce7")
  if (req.params.id.length !== 24) {
    res.status(406).json(`${req.params.id} is not a valid id, it must be 24 characters long`);
  } else {
    Book.findById(req.params.id)
    .then(book => {
      if (!book) { // if id is not present in the DB, book value is null
        console.log("could not find book with id: ", req.params.id);
        
        res.status(404).json(`could not find book with id: ${req.params.id}`);
      } else {
        res.json(book);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  }
}

module.exports.createBook = (req, res) => {
  Book.create({
    ...req.body,
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
    .then((createdBook) => res.json(createdBook))
    .catch(err => {
      console.log("error at adding data: ", err);
      res.status(500).json(err);
    });
}

module.exports.updateBook = (req, res) => {
  Book.findById(req.body._id)
    .then(book => {
      const keysToEdit = Object.keys(req.body).filter(key => key !== "_id");

      keysToEdit.forEach(key => book[key] = req.body[key]);
      book.updatedAt = Date.now();

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