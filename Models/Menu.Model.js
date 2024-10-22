const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: String,  // For example, 'header', 'footer', etc.
    required: true,
    enum: ['header', 'footer', 'sidebar', 'custom'] // Can be customized
  },
  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem' // Reference to the MenuItem model
  }],
  deletedAt: {
    type: Date,
    default: null  // For soft deletes
  }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
