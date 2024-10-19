const express=require('express')
const { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, requestPasswordReset, resetPassword } = require('../Controllers/User.Controller')
const { protect } = require('../Middleware/protect')
const router=express.Router()


//public routes
router.post('/registeruser',registerUser)
router.post('/loginuser',loginUser)
router.post('/logoutuser',logoutUser)
//protected
router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)
//password reset routes
router.post('/password-reset',requestPasswordReset)
router.put('/password-reset/:token',resetPassword)

module.exports=router 