const jwt=require('jsonwebtoken')
const User=require('../Models/User.Model')
const asyncHandler=require('express-async-handler')

const protect=asyncHandler(async(req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select('-password')
            next()
            
        } catch (error) {
            res.status(401).json("not authorized token")
        }
    }
    if (!token) {
        res.status(404).json("token not found")
    }
})

const adminOnly=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role==='Admin')
    {
        next()
    }
    else
    {
        res.status(403).json("Not authorize to admin")
    }
})
module.exports={protect,adminOnly}