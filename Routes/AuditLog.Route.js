const express=require('express')
const { createAuditLog, getAuditLog } = require('../Controllers/AuditLog.Controller')
const { adminOnly, protect } = require('../Middleware/protect')
const router=express.Router()

router.post('/createauditlog',createAuditLog)
router.get('/getauditlog',getAuditLog)



module.exports=router