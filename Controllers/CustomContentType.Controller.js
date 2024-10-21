const asyncHandler = require("express-async-handler");
const User = require("../Models/User.Model");
const CustomContentType = require("../Models/CustomContentType.Model");

//create custom content type
//protect admin
const createCustomContentType = asyncHandler(async (req, res) => {
  const { typeName, fields, author, seo } = req.body;
  const user = await User.findById(author);
  if (!user) {
    res.status(404).json("user not found");
  }
  const customContentType = await CustomContentType.create({
    typeName,
    fields,
    author: user,
    seo,
  });
  if (!customContentType) {
    res.status(404).json("custom content type not found");
  }
  res.status(200).json(customContentType);
});
//get all custom contents
//admin private
const getAllCustomContentType = asyncHandler(async (req, res) => {
  const customContentType = await CustomContentType.find()
    .populate("author", "name")
    .exec();
  if (!customContentType) {
    res.status(404).json(" custom content types not found");
  }
  res.status(200).json(customContentType);
});
//get custom content by id
//admin private
const getCustomContentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customContentType = await CustomContentType.findById(id)
    .populate("author", "name")
    .exec();
  if (!customContentType) {
    res.status(404).json(" custom content type not found");
  }
  res.status(200).json(customContentType);
});
//update custom content
//private admin
const updateCustomContent=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const { typeName, fields, author, seo } = req.body;
    const customContentType=await CustomContentType.findByIdAndUpdate(
        id,
        {
            $set:{
                typeName,fields,author,seo
            }
        },
        {
            new:true
        }
    )
    if (!customContentType) {
        res.status(404).json(" custom content type not update");
      }
      res.status(200).json(customContentType)
})
// delete custom content
//private admin
const deleteCustomContent=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const customContentType=await CustomContentType.findByIdAndUpdate(
        id,
        {
                deletedAt:new Date()   
        },
        {
            new:true
        }
    )
    if (!customContentType) {
        res.status(404).json(" custom content type not deleted");
      }
      res.status(200).json(
        {
            message:"Custom content deleted successfully",
            content: customContentType
        }
      )
})
//restore custom content
//admin private
const restoreCustomContent=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const customContentType=await CustomContentType.findByIdAndUpdate(
        id,
        {
            $set:{
                deletedAt:null
            }
        },
        {
            new:true
        }
    )
    if (!customContentType) {
        res.status(404).json(" custom content type not restored");
      }
      res.status(200).json(
        {
            message:"Custom content restored successfully",
            content: customContentType
        }
      )
})


module.exports = {
  createCustomContentType,
  getAllCustomContentType,
  getCustomContentById,
  updateCustomContent,
  deleteCustomContent,
  restoreCustomContent
};
