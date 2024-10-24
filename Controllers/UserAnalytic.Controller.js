const asyncHandler=require('express-async-handler')
const UserAnalytic=require('../Models/UserAnalytic.Model')

const createUserAnalytic=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const {contentid,action}=req.body
    let userAnalytic=await UserAnalytic.findOne({user:userid})
    if (!userAnalytic) {
        userAnalytic=new UserAnalytic({
            user:userid,
            activities:[]
        })
    }
userAnalytic.activities.push({
    content:contentid,
    action:action
})
await userAnalytic.save()
res.status(200).json(userAnalytic)
})
//get all user analytic
const getAllUserAnalytic=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const userAnalytic=await UserAnalytic.findOne({user:userid})
    .populate('activities.content')
    if(!userAnalytic)
    {
        return res.status(404).json("user analytic not found")
    }
    res.status(200).json(userAnalytic)
})



module.exports={createUserAnalytic,getAllUserAnalytic}