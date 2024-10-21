const mongoose = require('mongoose');
const baseContentSchema=require('./BaseContent.Model')
const articleSchema = mongoose.Schema({
  
  tags: [{
    type: String,
    trim: true
  }],
  publishedAt: {
    type: Date
  },
  
}, { timestamps: true });

articleSchema.add(baseContentSchema)
module.exports = mongoose.model('Article', articleSchema);
