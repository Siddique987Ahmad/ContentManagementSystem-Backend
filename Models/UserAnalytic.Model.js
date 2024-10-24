const mongoose = require('mongoose');

const userAnalyticSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user
    required: true
  },
  activities: [{
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',  // Content interacted with by the user
      required: true
    },
    action: {
      type: String,
      enum: ['view', 'like', 'share', 'comment'],  // Actions performed by the user
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now  // Timestamp of the activity
    }
  }]
});

module.exports = mongoose.model('UserAnalytic', userAnalyticSchema);
