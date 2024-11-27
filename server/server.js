const express = require('express');
const booksRoutes = require('./routes/booksRoutes.js');

const app = express();

app.use(express.json());
app.use('/api/books', booksRoutes);

app.listen(5173, () => console.log("server is running"));