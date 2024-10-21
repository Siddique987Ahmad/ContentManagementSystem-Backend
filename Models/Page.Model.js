const mongoose = require('mongoose');
const pageSchema = mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Unpublished"],
    default: "Draft"
  },
  publishedAt: {
    type: Date
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }],
  deletedAt: {
    type: Date,
    default: null
  }}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
