const express=require('express')
const { protect, adminOnly } = require('../Middleware/protect')
const { createReport, getReportByType, getReportById, deleteReport } = require('../Controllers/Report.Controller')
const router=express.Router()

router.post('/createreport',protect,createReport)
router.get('/getreportbytype',getReportByType)
router.get('/getreportbyid/:id',protect,adminOnly,getReportById)
router.delete('/deletereport/:id',protect,adminOnly,deleteReport)
module.exports=router