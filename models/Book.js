const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number
}, { timestamps: true });

// ✅ Prevent model overwrite error
module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
