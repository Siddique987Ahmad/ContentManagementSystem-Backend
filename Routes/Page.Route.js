const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createPage, getAllPages, getPageById, updatePage, deletePage, restorePage, publishPage } = require('../Controllers/Page.Controller')
const router=express.Router()

router.post('/createpage',protect,createPage)
router.get('/getallpage',protect,adminOnly,getAllPages)
router.get('/getpagebyid/:id',protect,adminOnly,getPageById)
router.put('/updatePage/:id',protect,adminOnly,updatePage)
router.delete('/deletepage/:id',protect,adminOnly,deletePage)
router.put('/restorepage/:id',protect,adminOnly,restorePage)
router.put('/publishpage/:id',protect,adminOnly,publishPage)
module.exports=router