const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = model('Book', bookSchema);