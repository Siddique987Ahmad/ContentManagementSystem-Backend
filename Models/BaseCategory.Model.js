const mongoose=require('mongoose')

const baseCategorySchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    description: {
    type: String,
    trim: true
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  deletedAt: {
    type: Date,
    default: null // For soft deletes
  }
},{timestamps:true})

module.exports=baseCategorySchema