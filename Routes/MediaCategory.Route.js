const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createMediaCategory, getAllMediaCategory, getMediaCategoryById, updateMediaCategory, deleteMediaCategory } = require('../Controllers/MediaCategory.Controller')

const router=express.Router()

router.post('/createmediacategory',protect,adminOnly,createMediaCategory)
router.get('/getallmediacategories',protect,adminOnly,getAllMediaCategory)
router.get('/getmediacategorybyid/:id',protect,adminOnly,getMediaCategoryById)
router.put('/updatemediacategory/:id',protect,adminOnly,updateMediaCategory)
router.delete('/deletemediacategory/:id',protect,adminOnly,deleteMediaCategory)
module.exports=router