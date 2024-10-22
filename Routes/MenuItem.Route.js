const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createMenuItem, getAllMenuItem, getMenuItemById, updateMenuItem, softDeleteMenuItem, deleteMenuItem } = require('../Controllers/MenuItem.Controller')

const router=express.Router()

router.post('/createmenuitem',protect,adminOnly,createMenuItem)
router.get('/getallmenuitem',protect,adminOnly,getAllMenuItem)
router.get('/getmenuitembyid/:id',protect,adminOnly,getMenuItemById)
router.put('/updatemenuitem/:id',protect,adminOnly,updateMenuItem)
router.patch('/softdeletemenuitem/:id',protect,adminOnly,softDeleteMenuItem)
router.delete('/deletemenuitem/:id',protect,adminOnly,deleteMenuItem)
module.exports=router