const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createMenu, getAllMenu, getMenuById, updateMenu, softDeleteMenu, deleteMenu } = require('../Controllers/Menu.Controller')
const router=express.Router()

router.post('/createmenu',protect,adminOnly,createMenu)
router.get('/getallmenu',protect,adminOnly,getAllMenu)
router.get('/getmenubyid/:id',protect,adminOnly,getMenuById)
router.put('/updatemenu/:id',protect,adminOnly,updateMenu)
router.patch('/softdeletemenu/:id',protect,adminOnly,softDeleteMenu)
router.delete('/deletemenu/:id',protect,adminOnly,deleteMenu)
module.exports=router