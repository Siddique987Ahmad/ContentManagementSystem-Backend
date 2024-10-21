const mongoose = require('mongoose');

const customContentTypeSchema = mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    trim: true
  },
  fields: [{
    fieldName: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,  // Example: 'String', 'Number', 'Date', etc.
      required: true
    },
    fieldValue: {
      type: mongoose.Schema.Types.Mixed,  // Can hold different data types
      required: true
    }
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Unpublished"],
    default: "Draft"
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('CustomContentType', customContentTypeSchema);
