const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);

// Optional health check
app.get('/', (req, res) => {
  res.send('Book API Running');
});

module.exports = app;
