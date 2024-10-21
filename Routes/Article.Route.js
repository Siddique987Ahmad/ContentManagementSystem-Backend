const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, restoreArticle, publishArticle } = require('../Controllers/Article.Controller')
const router=express.Router()

router.post('/createarticle',protect,createArticle)
router.get('/getallarticle',protect,adminOnly,getAllArticles)
router.get('/getarticlebyid/:id',protect,getArticleById)
router.put('/updatearticle/:id',protect,adminOnly,updateArticle)
router.delete('/deletearticle/:id',protect,adminOnly,deleteArticle)
router.put('/restorearticle/:id',protect,adminOnly,restoreArticle)
router.put('/publisharticle/:id',protect,adminOnly,publishArticle)
module.exports=router