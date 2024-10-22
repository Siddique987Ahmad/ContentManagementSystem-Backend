const mongoose = require('mongoose');
const baseCategorySchema=require('./BaseCategory.Model')
const mediaCategorySchema = mongoose.Schema({
 ...baseCategorySchema.obj,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MediaCategory',
    default: null // Set to null for top-level categories
  },
  
}, { timestamps: true });

module.exports = mongoose.model('MediaCategory', mediaCategorySchema);
