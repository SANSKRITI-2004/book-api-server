const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/books');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/books', bookRoutes);

// Log current environment
console.log('Environment:', process.env.NODE_ENV);

// Connect to MongoDB only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
}

module.exports = app;
