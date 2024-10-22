const mongoose=require('mongoose')
const baseCategorySchema=require('./BaseCategory.Model')
const categorySchema=mongoose.Schema({

    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        default:null
    },
   
},{timestamps:true})

categorySchema.add(baseCategorySchema)
module.exports=mongoose.model("Category",categorySchema)