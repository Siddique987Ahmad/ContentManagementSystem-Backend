const asyncHandler=require('express-async-handler')
const User=require('../Models/User.Model')
const generateToken=require('../utils/generateToken')
const crypto=require('crypto')
const { use } = require('bcrypt/promises')
//post public 
const registerUser=asyncHandler(async(req,res)=>{

    const {userName,email,password}=req.body
    console.log("username",userName)

    const userExist=await User.findOne({email})
    if(userExist)
    {
        res.status(400).json('user already exists')
    }

    const user=await User.create({userName,email,password})
    if(user)
    {
        res.status(200).json({
            _id:user._id,
            userName:user.userName,
            email:user.email,
            password:user.password,
            token:generateToken(user._id)

        })
    }
    else{
        res.status(200).json('invalid user data')
    }
})
//post public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password)))
    {
        res.json({
            _id:user._id,
            userName:user.userName,
            email:user.email,
            password:user.password,
            role:user.role,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).json("invalid data")

    }
})
//public 
const logoutUser=asyncHandler(async(req,res)=>{
    res.status(200).json("user logout")
})
//protected 
//get user profile
const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user)
    {
        res.json({
            _id:user._id,
            userName:user.userName,
            email:user.email,
            password:user.password,
            role:user.role

        })
    }
    else {
        res.status(404).json("user not found")
    }
})
//protected
//update user profile
const updateUserProfile=asyncHandler(async(req,res)=>{
const user=await User.findById(req.user._id)
if(user)
{
    user.userName=req.body.userName || user.userName
    user.email=req.body.email || user.email
    user.role=req.body.role || user.role
    if(req.body.password)
    {
        user.password=req.body.password
    }
    const updatedUser=await user.save()

 res.json({
    _id:updatedUser._id,
    userName:updatedUser.userName,
    email:updatedUser.email,
    role:updatedUser.role,
    token:generateToken(updatedUser._id)
})
}
else{
    res.status(404).json("user not found")
}

})
//request password reset token
const requestPasswordReset=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if(!user)
    {
        res.status(404).json
    }
    const resetToken=user.generateResetToken()
    await user.save()
    const resetUrl = `${req.protocol}://${req.get('host')}/api/users/password-reset/${resetToken}`;
    res.json(resetUrl)
})
//reset password using token
const resetPassword=asyncHandler(async(req,res)=>{
    const resetTokenHash=crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log("Hashed token from URL:", resetTokenHash);
    const user=await User.findOne({
        resetPasswordToken:resetTokenHash,
        resetPasswordExpires:{ $gt:Date.now() }
    })
    if (!user) {
        console.log("No user found or token expired");
        res.status(404).json("invalid password or expired token")
    }
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpires=undefined
    await user.save()
    res.status(400).json("password updated successfully")
}) 




module.exports={registerUser,loginUser,logoutUser,getUserProfile,updateUserProfile,requestPasswordReset,resetPassword}