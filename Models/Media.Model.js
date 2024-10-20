const mongoose=require('mongoose')
const mediaSchema=mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    embededUrl:{
        type:String,
        default:null
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Media",mediaSchema)