const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({

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
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        default:null
    }
},{timestamps:true})

module.exports=mongoose.model("Category",categorySchema)