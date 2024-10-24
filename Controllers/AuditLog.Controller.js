const asyncHandler=require('express-async-handler')
const User=require('../Models/User.Model')
const AuditLog=require('../Models/AuditLog.Model')

//create audit log

const createAuditLog=asyncHandler(async(req,res)=>{
    const {user,action,resourceType,resourceId}=req.body
    const users=await User.findById(user)
    if(!users)
    {
        return res.status(404).json("user not found")
    }
    const auditLog=await AuditLog.create({
        user:users,
        action,
        resourceType,
        resourceId
    })
    if (!auditLog) {
        return res.status(404).json("audit not created")
    }
    res.status(200).json(auditLog)
})
//get audit logs
//admin
const getAuditLog=asyncHandler(async(req,res)=>{
    const logs=await AuditLog.find()
    .populate('user').exec()
    if (!logs) {
        return res.status(404).json("audit logs not found")
    }
    res.status(200).json(logs)
})


module.exports={createAuditLog,getAuditLog}