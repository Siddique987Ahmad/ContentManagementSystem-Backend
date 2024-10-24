const asyncHandler=require('express-async-handler')
const User=require('../Models/User.Model')
const Report=require('../Models/Report.Model')

//create report
//protect
const createReport=asyncHandler(async(req,res)=>{
    const {reportType,data,createdBy}=req.body
    const user=await User.findById(createdBy)
    if(!user)
    {
        return res.status(404).json("user not found")
    }
    const reportCreate=await Report.create({
        reportType,
        data,
        createdBy:user
    })
    if(!reportCreate)
    {
        res.status(404).json("report not created")
    }
    res.status(200).json(reportCreate)

})
//get report by type(content or user)
const getReportByType=asyncHandler(async(req,res)=>{
    const {reportType}=req.query
    if (!reportType || !['content','user'].includes(reportType)) {
        return res.status(400).json("write user or content")
    }
    const report=await Report.find({reportType})
    .populate('createdBy','userName email')
    if (!report || report.length===0) {
        return res.status(404).json("report not found")
    }
    res.status(200).json(report)
})
// get specific report by id
const getReportById=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const report=await Report.findById(id)
    .populate('createdBy','userName email')
    if (!report) {
        return res.status(404).json("report not found")
    }
    res.status(200).json(report)
})
//delete report through id
//admin private
const deleteReport=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const report=await Report.findByIdAndDelete(id)
    if (!report) {
        return res.status(404).json("report not deleted")
    }
    res.status(200).json(report)
})

module.exports={createReport,getReportByType,getReportById,deleteReport}