const express=require('express')
const { createContentAnalytic, getAnalyticOfSpecificId, checkContentExist, getAnalyticOfAllContent } = require('../Controllers/ContentAnalytic.Controller')
const router=express.Router()
router.post('/createcontentanalytic/:contentid',createContentAnalytic)
router.get('/getanalyticofspecificid/:contentid',checkContentExist,getAnalyticOfSpecificId)
router.get('/getanalyticofallcontent',getAnalyticOfAllContent)
module.exports=router