 const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  publishedYear: Number
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

