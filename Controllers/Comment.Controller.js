const asyncHandler=require('express-async-handler')
const User=require('../Models/User.Model')
const Article=require('../Models/Article.Model')
const Comment=require('../Models/Comment.Model')
//const {adminOnly}=require('../Middleware/protect')
//create comment
//private
const createComment=asyncHandler(async(req,res)=>{
     const {content,article,author,parentComment}=req.body
     const user=await User.findById(author)
     const articles=await Article.findById(article)
     if(!user || !articles)
     {
        res.status(404).json("user and article not found")
     }
     const comment=await Comment.create({
        content,
        article:articles,
        author:user,
        parentComment:parentComment || null
     })
     if(!comment)
     {
        res.status(404).json("Comment not found")
     }
     res.status(200).json(comment)
})
//const reply to comment
//protect
const replyToComment=asyncHandler(async(req,res)=>{
       const {content,author}=req.body
    //    const parentCommentId=req.params.id
    const {id}=req.params
       const parentComment=await Comment.findById(id)
       const user=await User.findById(author)
       if(!parentComment || !user)
       {
        return res.status(404).json("user and parent comment not found")
       }
       const replyComment=await Comment.create({
        content,
        author:user,
        article:parentComment.article,
        parentComment:parentComment._id
       })
       if(!replyComment)
        {
         return res.status(404).json("reply comment not found")
        }
       parentComment.replies.push(replyComment._id)
       await parentComment.save()
     
       res.status(200).json(replyComment)
})
//update comment
//protect
const updateComment=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {content,author,article}=req.body
    const comment=await Comment.findById(id)
    // const user=await User.findById(author)
    //  const articles=await Article.findById(article)
     if(!comment)
     {
       return res.status(404).json("user,comment and article not found")
     }
     if (author) {
        const user = await User.findById(author);
        if (!user) {
            return res.status(404).json("User not found");
        }

        if (comment.author.toString() !== user._id.toString()) {
            return res.status(403).json("Unauthorized user");
        }
    }

    // If article is provided, check if it exists
    if (article) {
        const articles = await Article.findById(article);
        if (!articles) {
            return res.status(404).json("Article not found");
        }
    }

     comment.content=content || comment.content
     comment.isEdited=true
     await comment.save()
     if(!comment)
     {
        return res.status(404).json("comment not found")
     }
     res.status(200).json(comment)

}) 
//soft delete comment 
//private and admin
const softDeleteComment=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const user=req.user._id
    const comment=await Comment.findById(id)
    if(!comment)
        {
           return res.status(404).json("comment not found")
        }
        if(comment.author.toString()!==user.toString() && !req.user.role!=='Admin')
        {
            return res.status(403).json("unauthorize user")

        }
        const commentSoftDelete=await Comment.findByIdAndUpdate(id,{deletedAt:new Date()},{new:true})

        if(!commentSoftDelete)
            {
               return res.status(404).json("comment not softdelete")
            }
            res.status(200).json(commentSoftDelete)
    })
    //permanent delete comment
    //private and admin
    const deleteComment=asyncHandler(async(req,res)=>{
        const {id}=req.params
    const user=req.user._id
    const comment=await Comment.findById(id)
    if(!comment)
        {
           return res.status(404).json("comment not found")
        }
        if(comment.author.toString()!==user.toString() && !req.user.role!=='Admin')
        {
            return res.status(403).json("unauthorize user")

        }
        const commentDelete=await Comment.findByIdAndUpdate(id,{deletedAt:null
        },{new:true})

        if(!commentDelete)
            {
               return res.status(404).json("comment not delete")
            }
            res.status(200).json(commentDelete)
    })
    //approve comment
const approveComment=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const comment=await Comment.findById(id)
    if(!comment)
        {
           return res.status(404).json("comment not found")
        }
        comment.isApproved=true
        await comment.save()
        res.status(200).json(comment)

})
//get all comments of an article
const getAllCommentOfArticle=asyncHandler(async(req,res)=>{
    const {articleid}=req.params
    const comment=await Comment.find({article:articleid,deletedAt:null})
    .populate('author', 'name')
    .populate('replies')
    .sort({ createdAt: -1 });
    if(!comment)
        {
           return res.status(404).json("article comment not found")
        }
        res.status(200).json(comment)
})


module.exports={createComment,replyToComment,updateComment,softDeleteComment,deleteComment,approveComment,getAllCommentOfArticle}