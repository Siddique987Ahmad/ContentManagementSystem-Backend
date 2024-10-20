const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createContent, getAllContent, getContentById, updateContent, deleteContent, restoredContent, scheduledPublish } = require('../Controllers/Content.Controller')
const router=express.Router()

router.post('/createcontent',protect,createContent)
router.get('/getallcontent',protect,adminOnly,getAllContent)
router.get('/getcontentbyid/:id',protect,getContentById)
router.put('/updatecontent/:id',protect,adminOnly,updateContent)
router.delete('/deletecontent/:id',protect,adminOnly,deleteContent)
router.put('/:id/restorecontent',protect,adminOnly,restoredContent)
router.put('/:id/schedulepublish',protect,adminOnly,scheduledPublish)
module.exports=router