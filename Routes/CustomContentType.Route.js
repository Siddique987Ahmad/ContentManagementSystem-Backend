const express = require('express');
const { protect, adminOnly } = require('../Middleware/protect');
const { createCustomContentType, getAllCustomContentType, getCustomContentById, updateCustomContent, deleteCustomContent, restoreCustomContent } = require('../Controllers/CustomContentType.Controller');
const router = express.Router();

router.post('/createcustomcontent',protect,adminOnly,createCustomContentType)
router.get('/getallcustomcontent',protect,adminOnly,getAllCustomContentType)
router.get('/getcustomcontentbyid/:id',protect,adminOnly,getCustomContentById)
router.put('/updatecustomcontent/:id',protect,adminOnly,updateCustomContent)
router.delete('/deletecustomcontent/:id',protect,adminOnly,deleteCustomContent)
router.put('/restorecustomcontent/:id',protect,adminOnly,restoreCustomContent)

module.exports=router