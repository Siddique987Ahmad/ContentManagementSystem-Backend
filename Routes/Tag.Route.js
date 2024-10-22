const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createTag, getAllTag, getTagById, updateTag, deleteTag } = require('../Controllers/Tag.Controller')

const router=express.Router()

router.post('/createtag',protect,adminOnly,createTag)
router.get('/getalltags',protect,adminOnly,getAllTag)
router.get('/gettagbyid/:id',protect,adminOnly,getTagById)
router.put('/updatetag/:id',protect,adminOnly,updateTag)
router.delete('/deletetag/:id',protect,adminOnly,deleteTag)
module.exports=router