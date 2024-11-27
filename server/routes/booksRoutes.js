const express = require('express');
const router = express.Router();
const booksController = require('./../controllers/booksController.js');

router.get('/all', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/new', booksController.createBook);
router.patch('/edit', booksController.updateBook);
router.delete('/delete', booksController.deleteBook);

module.exports = router;