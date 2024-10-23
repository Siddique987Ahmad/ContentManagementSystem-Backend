const express=require('express')
const { protect,adminOnly } = require('../Middleware/protect')
const { createReview, updateReview, softDeleteReview, deleteReview, getAllReviewOfArticle, getReviewOfId, approveReview } = require('../Controllers/Review.Controller')
const router=express.Router()

router.post('/createreview',protect,createReview)
router.put('/updatereview/:id',protect,updateReview)
router.patch('/softdeletereview/:id',protect,softDeleteReview)
router.delete('/deletereview/:id',protect,deleteReview)
router.patch('/approvereview/:id',protect,adminOnly,approveReview)
router.get('/getallreviewofarticle/:articleid',getAllReviewOfArticle)
router.get('/getspecificreviewofid/:id',protect,getReviewOfId)
module.exports=router