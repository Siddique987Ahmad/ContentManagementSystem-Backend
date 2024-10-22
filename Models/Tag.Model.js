const mongoose = require('mongoose');
const baseCategorySchema=require('./BaseCategory.Model')
const tagSchema = mongoose.Schema({
 ...baseCategorySchema.obj,
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);
