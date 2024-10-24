const mongoose = require('mongoose');

const contentAnalyticsSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',  // Reference to the content being analyzed
    required: true,
    unique: true  // Ensures that each content item has only one analytics record
  },
  views: {
    type: Number,
    default: 0  // Total views for the content
  },
  likes: {
    type: Number,
    default: 0  // Total likes for the content
  },
  shares: {
    type: Number,
    default: 0  // Total shares for the content
  },
  createdAt: {
    type: Date,
    default: Date.now  // Timestamp when the analytics record was created
  },
  updatedAt: {
    type: Date,
    default: Date.now  // Timestamp when the analytics record was last updated
  }
});

// Optional: Middleware to update the updatedAt field
contentAnalyticsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ContentAnalytic', contentAnalyticsSchema);
