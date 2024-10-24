const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ['content', 'user'],  // Types of reports: content performance or user engagement
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,  // Mixed type to accommodate various report formats
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now  // Timestamp when the report was generated
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who generated the report
    required: true
  }
});

module.exports = mongoose.model('Report', reportSchema);
