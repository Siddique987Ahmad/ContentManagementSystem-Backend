const express=require('express')
const { createUserAnalytic, getAllUserAnalytic } = require('../Controllers/UserAnalytic.Controller')
const router=express.Router()

router.post('/createuseranalytic/:userid/activity',createUserAnalytic)
router.get('/getalluseranalytic/:userid/activity',getAllUserAnalytic)

module.exports=router