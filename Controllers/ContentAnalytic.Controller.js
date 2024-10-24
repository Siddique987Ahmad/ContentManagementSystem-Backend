const asyncHandler=require('express-async-handler')
const Content=require('../Models/Content.Model')
const ContentAnalytic=require('../Models/ContentAnalytic.Model')
//middleware to check if content exist
const checkContentExist=async(req,res,next)=>{
    const {contentid}=req.params
    const contentAnalytics=await ContentAnalytic.findOne({content:contentid})
    if(!contentAnalytics)
    {
        return res.status(404).json("content analytic not found")
    }
    next()
}
//create content analytic
//private
const createContentAnalytic=asyncHandler(async(req,res)=>{
    const {contentid}=req.params
    const {action}=req.body
    let contentAnalytics=await ContentAnalytic.findOne({Content:contentid})
    if (!contentAnalytics) {
        contentAnalytics=new ContentAnalytic({content:contentid})
    }
    if(action==='view')
    {
        contentAnalytics.views+=1
    }
    else if(action==='like')
    {
        contentAnalytics.likes+=1
    }
    else if(action==='share')
    {
        contentAnalytics.shares+=1
    }
    await contentAnalytics.save()
    res.status(200).json(contentAnalytics)

})
//get analytic of specific content
const getAnalyticOfSpecificId=asyncHandler(async(req,res)=>{
    const {contentid}=req.params
    const contentAnalytics=await ContentAnalytic.findOne({content:contentid})
    if(!contentAnalytics)
    {
        return res.status(404).json("content analytic not found")
    }
    res.status(200).json(contentAnalytics)
})
//get analytic of all content
const getAnalyticOfAllContent=asyncHandler(async(req,res)=>{
    const allAnalytic=await ContentAnalytic.find().populate('content')
    if(!allAnalytic)
        {
            return res.status(404).json("content analytics not found")
        }
        res.status(200).json(allAnalytic)
})



module.exports={createContentAnalytic,checkContentExist,getAnalyticOfSpecificId,getAnalyticOfAllContent}