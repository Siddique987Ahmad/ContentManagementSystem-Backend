const mongoose=require('mongoose')

const roleSchema=mongoose.Schema({

    roleName:{
        type:String,
        required:true,
        //unique:true
    },
    permissions:[
        {
            type:String,
            required:true
        }
    ]}
    ,{
    timestamps:true
})

module.exports=mongoose.model("Role",roleSchema) 