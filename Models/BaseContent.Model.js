const mongoose = require('mongoose');

// Base schema with common fields
const baseContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Unpublished", "Scheduled"],
    default: "Draft"
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }],
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = baseContentSchema;
