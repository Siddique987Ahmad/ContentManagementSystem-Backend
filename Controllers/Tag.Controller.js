const asyncHandler = require("express-async-handler");
const Tag=require('../Models/Tag.Model')
//create Tag
//private admin
const createTag = asyncHandler(async (req, res) => {
  const { name, slug, description, seo } = req.body;
  const tagExists = await Tag.findOne({ slug });
  if (tagExists) {
    res.status(200).json("tag already exist");
  }

  const tag = await Tag.create({
    name,
    slug,
    description,
    seo,
  });
  if (!tag) {
    res.status(404).json("tag not created");
  }

  res.status(200).json(tag);
});
//get all tags
//private admin
const getAllTag = asyncHandler(async (req, res) => {
  const tags = await Tag.find()
  if (!tags) {
    res.status(404).json("tags not found");
  }
  res.status(200).json(tags);
});
//get tag by id
//private admin
const getTagById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findById(id)
  if (!tag) {
    res.status(404).json("tag not found");
  }
  res.status(200).json(tag);
});
//update tag by id
//private admin
const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, parentCategory, description, seo } = req.body;
  const tag = await Tag.findById(id);
  if (!tag) {
    res.status(404).json("Tag not found");
  }

  const updatedTag = await Tag.findByIdAndUpdate(
    id,
    { name, slug, description, seo },
    { new: true }
  );
  if (!updatedTag) {
    res.status(404).json("tag not updated");
  }
  res.status(200).json(updatedTag);
});
//delete category
//private admin
const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const category=await Category.findById(id)
  // if(!category)
  // {
  //     res.status(404).json("category id not found")
  // }
  const deletedTag = await Tag.findByIdAndUpdate(id,{
    deletedAt:new Date()
  },{new:true});
  if (!deletedTag) {
    res.status(404).json("Tag not deleted");
  }
  res.status(200).json({
    message: "Tag deleted successfully",
    content: deletedTag,
  });
});

module.exports = {
 createTag,
 getAllTag,
 getTagById,
 updateTag,
 deleteTag
};
