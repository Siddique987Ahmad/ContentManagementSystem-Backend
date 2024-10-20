const asyncHandler = require("express-async-handler");
const Content = require("../Models/Content.Model");
const User = require("../Models/User.Model");
const Category = require("../Models/Category.Model");
const Media = require("../Models/Media.Model");

// create content
//protected
const createContent = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    body,
    author,
    category,
    seo,
    media,
    scheduledPublishDate,
  } = req.body;
  const user = await User.findById(author);
  const categories = await Category.findById(category);
  const medias = await Media.findById(media);
  if (!user || !categories || !medias) {
    res.status(404).json("user,category and media not found");
  }

  const content = await Content.create({
    title,
    slug,
    body,
    author: user,
    category: categories,
    media: medias,
    seo,
    scheduledPublishDate,
  });
  if (!content) {
    res.status(404).json("content not created");
  }
  res.status(200).json(content);
});
//get all content
//private admin
const getAllContent = asyncHandler(async (req, res) => {
  const content = await Content.find().populate("author media category");
  if (!content) {
    res.status(404).json("contents not found");
  }
  res.status(200).json(content);
});
//get content by id
//protect
const getContentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = await Content.findById(id).populate("author media category");
  if (!content) {
    res.status(404).json("content not found");
  }
  res.status(200).json(content);
});
//update content by id
const updateContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    slug,
    body,
    author,
    category,
    seo,
    media,
    status,
    scheduledPublishDate,
  } = req.body;
  const contentUpdate = await Content.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        slug,
        body,
        status,
        category,
        seo,
        media,
        scheduledPublishDate,
      },
    },
    { new: true }
  );
  if (!contentUpdate) {
    res.status(404).json("content not updated");
  }
  res.status(200).json(contentUpdate);
});
//soft delete content
//private admin
const deleteContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contentDeleted = await Content.findByIdAndUpdate(
    id,
    { $set: { deletedAt: new Date() } },
    { new: true }
  );
  if (!contentDeleted) {
    res.status(404).json("content not deleted");
  }
  res.status(200).json({
    message: "Content soft deleted successfully",
    content: contentDeleted,
  });
});
//restored content
//private admin
const restoredContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contentRestored = await Content.findByIdAndUpdate(
    id,
    { $set: { deletedAt: null } },
    { new: true }
  );
  if (!contentRestored) {
    res.status(404).json("content not restore");
  }
  res.status(200).json({
    message: "Content restored successfully",
    content: contentRestored,
  });
});
//schulded content for publishing
const scheduledPublish = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { scheduledPublishDate } = req.body;
  const content = await Content.findById(id);
  if (!content) {
    res.status(404).json("Content not found");
  }
  content.scheduledPublishDate = scheduledPublishDate;
  content.status = "Scheduled";
  await content.save();
  res.status(200).json(content);
});

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  restoredContent,
  scheduledPublish
};
