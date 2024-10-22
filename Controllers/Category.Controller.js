const asyncHandler = require("express-async-handler");
const Category = require("../Models/Category.Model");
//create category
//private admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, parentCategory, description, seo } = req.body;
  const categoryExists = await Category.findOne({ slug });
  if (categoryExists) {
    res.status(200).json("category already exist");
  }

  const category = await Category.create({
    name,
    slug,
    parentCategory: parentCategory || null,
    description,
    seo,
  });
  if (!category) {
    res.status(404).json("category not found");
  }

  res.status(200).json(category);
});
//get all category
//private admin
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate("parentCategory").exec();
  if (!categories) {
    res.status(404).json("categories not found");
  }
  res.status(200).json(categories);
});
//get category by id
//private admin
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id)
    .populate("parentCategory")
    .exec();
  if (!category) {
    res.status(404).json("categories not found");
  }
  res.status(200).json(category);
});
//update category by id
//private admin
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, parentCategory, description, seo } = req.body;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json("category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, slug, parentCategory: parentCategory || null, description, seo },
    { new: true }
  );
  if (!updatedCategory) {
    res.status(404).json("category not updated");
  }
  res.status(200).json(updatedCategory);
});
//delete category
//private admin
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const category=await Category.findById(id)
  // if(!category)
  // {
  //     res.status(404).json("category id not found")
  // }
  const deletedCategory = await Category.findByIdAndUpdate(id,{
    deletedAt:new Date()
  },{new:true});
  if (!deletedCategory) {
    res.status(404).json("Category not deleted");
  }
  res.status(200).json({
    message: "category deleted successfully",
    content: deletedCategory,
  });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
