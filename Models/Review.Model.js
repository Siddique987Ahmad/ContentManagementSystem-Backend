const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',  // Reference to the post/article being reviewed
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // User who gave the rating or review
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5  // Rating scale of 1 to 5
  },
  review: {
    type: String,
    trim: true  // Optional review content
  },
  isApproved: {
    type: Boolean,
    default: false  // For moderation (admin approval required)
  },
  deletedAt: {
    type: Date,
    default: null  // For soft deletes
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
