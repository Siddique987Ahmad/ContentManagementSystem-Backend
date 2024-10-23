const asyncHandler=require('express-async-handler')
const User=require('../Models/User.Model')
const Article=require('../Models/Article.Model')
const Review=require('../Models/Review.Model')
//create review
//private
const createReview=asyncHandler(async(req,res)=>{

    const {article, user, rating, review}=req.body
    const users=await User.findById(user)
    const articles=await Article.findById(article)
    if(!users || !articles)
    {
        return res.status(404).json("user and article not found")
    }
    const reviewCreate=await Review.create({
        article:articles,
        user:users,
        rating,
        review
    })
    if (!reviewCreate) {
        return res.status(404).json("review not created")
    }
    res.status(200).json(reviewCreate)
})
//update review
//protect
const updateReview=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {rating,review}=req.body
    const reviews=await Review.findById(id)
    if(!reviews)
    {
        return res.status(404).json("review not found")
    }
    if(reviews.user.toString()!==req.user._id.toString())
    {
        return res.status(403).json("not authorize user")

    }
    reviews.rating=rating!==undefined?rating:reviews.rating
    reviews.review=review!==undefined?review:reviews.review
    await reviews.save()
    res.status(200).json(reviews)
})
//soft delete review
//private
const softDeleteReview=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const reviewDelete=await Review.findById(id)
    if(!reviewDelete)
        {
            return res.status(404).json("review not found")
        }
        if(reviewDelete.user.toString()!==req.user._id.toString())
        {
            return res.status(403).json("not authorize user")
        }
        const review=await Review.findByIdAndUpdate(id,{deletedAt:new Date()},{new:true})
        if(!review)
            {
                return res.status(404).json("review not soft deleted")
            }
            res.status(200).json(review)
})
//delete review
//private
const deleteReview=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const reviewDelete=await Review.findById(id)
    if(!reviewDelete)
        {
            return res.status(404).json("review not found")
        }
        if(reviewDelete.user.toString()!==req.user._id.toString())
        {
            return res.status(403).json("not authorize user")
        }
        const review=await Review.findByIdAndDelete(id,{deletedAt:null},{new:true})
        if(!review)
            {
                return res.status(404).json("review not deleted")
            }
            res.status(200).json(review)
})
//get all reviews of articles
const getAllReviewOfArticle=asyncHandler(async(req,res)=>{
    const {articleid}=req.params
    const review=await Review.find({article:articleid,deletedAt:null})
    .populate('user','userName')
    if(!review)
        {
            return res.status(404).json("article review not found")
        }
        res.status(200).json(review)
})
//get specific review through id
//private
const getReviewOfId=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const review=await Review.findById(id)
    .populate('user','userName')
    if(!review || review.deletedAt)
        {
            return res.status(404).json("review of id not found")
        }
        res.status(200).json(review)
})
//approve review
const approveReview=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const review=await Review.findById(id)
    if(!review)
        {
            return res.status(404).json("review not found")
        }
        review.isApproved=true
        await review.save()
        res.status(200).json(review)
})


module.exports={createReview,updateReview,softDeleteReview,deleteReview,getAllReviewOfArticle,getReviewOfId,approveReview}