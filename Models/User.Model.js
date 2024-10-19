const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Editor","Viewer","Content Manager","Contributor"],
        default:"Viewer"
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
},{timestamps:true})

userSchema.pre('save',async function(next) {
    if(!this.isModified('password'))
    {
       return next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.generateResetToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpires=Date.now()+60*60*1000
    return resetToken
}



module.exports=mongoose.model("User",userSchema)
