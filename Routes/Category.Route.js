const express=require('express')
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/Category.Controller')
const { protect, adminOnly } = require('../Middleware/protect')

const router=express.Router()

router.post('/createcategory',protect,adminOnly,createCategory)
router.get('/getallcategories',protect,adminOnly,getAllCategories)
router.get('/getcategorybyid/:id',protect,adminOnly,getCategoryById)
router.put('/updatecategory/:id',protect,adminOnly,updateCategory)
router.delete('/deletecategory/:id',protect,adminOnly,deleteCategory)
module.exports=router