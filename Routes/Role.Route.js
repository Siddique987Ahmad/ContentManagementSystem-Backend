const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createRole, getAllRoles, getSpecificRole, updateRole, deleteRole } = require('../Controllers/Role.controller')
const router=express.Router()

router.post('/',protect,adminOnly,createRole)
router.get('/getallrole',protect,adminOnly,getAllRoles)
router.get('/getspecificrole/:id',protect,adminOnly,getSpecificRole)
router.put('/updaterole/:id',protect,adminOnly,updateRole)
router.delete('/deleterole/:id',protect,adminOnly,deleteRole)
module.exports=router