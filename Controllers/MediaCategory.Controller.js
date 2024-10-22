const asyncHandler = require("express-async-handler");
const MediaCategory=require('../Models/MediaCategory.Model')
//create media category
//private admin
const createMediaCategory = asyncHandler(async (req, res) => {
  const { name, slug, parentCategory, description, seo } = req.body;
  const mediaCategoryExists = await MediaCategory.findOne({ slug });
  if (mediaCategoryExists) {
    res.status(200).json("media category already exist");
  }

  const mediaCategory = await MediaCategory.create({
    name,
    slug,
    parentCategory: parentCategory || null,
    description,
    seo,
  });
  if (!mediaCategory) {
    res.status(404).json("media category not found");
  }

  res.status(200).json(mediaCategory);
});
//get all media category
//private admin
const getAllMediaCategory = asyncHandler(async (req, res) => {
  const mediaCategory = await MediaCategory.find().populate("parentCategory").exec();
  if (!mediaCategory) {
    res.status(404).json("media categories not found");
  }
  res.status(200).json(mediaCategory);
});
//get meida category by id
//private admin
const getMediaCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const mediaCategory = await MediaCategory.findById(id)
    .populate("parentCategory")
    .exec();
  if (!mediaCategory) {
    res.status(404).json("media category not found");
  }
  res.status(200).json(mediaCategory);
});
//update media category by id
//private admin
const updateMediaCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, parentCategory, description, seo } = req.body;
  const mediaCategory = await MediaCategory.findById(id);
  if (!mediaCategory) {
    res.status(404).json("media category not found");
  }

  const updatedMediaCategory = await MediaCategory.findByIdAndUpdate(
    id,
    { name, slug, parentCategory: parentCategory || null, description, seo },
    { new: true }
  );
  if (!updatedMediaCategory) {
    res.status(404).json("media category not updated");
  }
  res.status(200).json(updatedMediaCategory);
});
//delete media category
//private admin
const deleteMediaCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const category=await Category.findById(id)
  // if(!category)
  // {
  //     res.status(404).json("category id not found")
  // }
  const deletedMediaCategory = await MediaCategory.findByIdAndUpdate(id,{
    deletedAt:new Date()
  },{new:true});
  if (!deletedMediaCategory) {
    res.status(404).json("Media Category not deleted");
  }
  res.status(200).json({
    message: "Media category deleted successfully",
    content: deletedMediaCategory,
  });
});

module.exports = {
createMediaCategory,
getAllMediaCategory,
getMediaCategoryById,
updateMediaCategory,
deleteMediaCategory
};
