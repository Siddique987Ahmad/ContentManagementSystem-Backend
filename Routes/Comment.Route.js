const express=require('express')
const { protect,adminOnly } = require('../Middleware/protect')
const { createComment, replyToComment, updateComment, softDeleteComment,deleteComment,approveComment, getAllCommentOfArticle } = require('../Controllers/Comment.Controller')
const router=express.Router()

router.post('/createcomment',protect,createComment)
router.post('/replytocomment/:id',protect,replyToComment)
router.put('/updatecomment/:id',protect,updateComment)
router.patch('/softdeletecomment/:id',protect,softDeleteComment)
router.delete('/deletecomment/:id',protect,deleteComment)
router.patch('/approvecomment/:id',protect,adminOnly,approveComment)
router.get('/getallcommentofarticle/:articleid',getAllCommentOfArticle)



module.exports=router