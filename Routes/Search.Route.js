const express=require('express')
const asyncHandler=require('express-async-handler')
const Content=require('../Models/Content.Model')
const mongoose = require('mongoose')
const router=express.Router()

router.get('/searchcontent',asyncHandler(async(req,res)=>{
    const {query,category,tags,author,startDate,endDate}=req.query
    let searchQuery={}
    if (query) {
        searchQuery.$text={$search:query}
    }
    console.log("search query:",searchQuery)
    if(category)
    {
        searchQuery.category=new mongoose.Types.ObjectId(category)
    }
    console.log("search query:",searchQuery)

    if (tags) {
        searchQuery.tags={$in:tags.split(',')}
    }
    console.log("search query:",searchQuery)

    if (author) {
        searchQuery.author=author
    }
    if (startDate || endDate) {
        searchQuery.publishedAt={}
        if (startDate) {
            searchQuery.publishedAt.$gte=new Date(startDate)
        }
        if (endDate) {
            searchQuery.publishedAt.$lte=new Date(endDate)
        }
        
    }
    const results=await Content.find(searchQuery).populate('author category').exec()
    if (!results) {
        return res.status(404).json("search not found")
    }
    res.status(200).json(results)
}))
module.exports=router