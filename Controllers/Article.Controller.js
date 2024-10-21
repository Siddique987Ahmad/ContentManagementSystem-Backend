const asyncHandler = require("express-async-handler");
const User = require("../Models/User.Model");
const Category = require("../Models/Category.Model");
const Media = require("../Models/Media.Model");
const Article = require("../Models/Article.Model");
//create article
//private admin
const createArticle = asyncHandler(async (req, res) => {
  const { title, slug, body, author, category, seo, media, tags, publishedAt } =
    req.body;
  const user = await User.findById(author);
  const categories = await Category.findById(category);
  const medias = await Media.findById(media);

  if (!user || !categories || !medias) {
    res.status(404).json("user,category and media not found");
  }
  const article = await Article.create({
    title,
    slug,
    body,
    author: user,
    category: categories,
    seo,
    media: medias,
    tags,
    publishedAt,
  });
  if (!article) {
    res.status(404).json("article not created");
  }
  res.status(200).json(article);
});
//get all articles
//private admin
const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find().populate("author category media");
  if (!articles) {
    res.status(404).json("articles not found");
  }
  res.status(200).json(articles);
});
//get article by id
//private
const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id).populate("author category media");
  if (!article) {
    res.status(404).json("article not found");
  }
  res.status(200).json(article);
});
//update article
//private admin
const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, slug, body, author, category, seo, media, tags, publishedAt } =
    req.body;
  const articleUpdate = await Article.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        slug,
        body,
        author,
        category,
        seo,
        media,
        tags,
        publishedAt,
      },
    },
    {
      new: true,
    }
  );
  if (!articleUpdate) {
    res.status(404).json("article not updated");
  }
  res.status(200).json(articleUpdate);
});
//soft delete article
//private admin
const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const articleDelete = await Article.findByIdAndUpdate(
    id,
    {
      $set: { deletedAt: new Date() },
    },
    { new: true }
  );
  if (!articleDelete) {
    res.status(404).json("article not deleted");
  }
  res.status(200).json({
    message: "article deleted",
    content: articleDelete,
  });
});
//restore article
//private admin
const restoreArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const articleRestored = await Article.findByIdAndUpdate(
    id,
    {
      $set: { deletedAt: null },
    },
    {
      new: true,
    }
  );
  if (!articleRestored) {
    res.status(404).json("article not restore");
  }
  res.status(200).json({
    message: "article restored",
    content: articleRestored,
  });
});
//publish article
//admin private
const publishArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const articlePublish = await Article.findById(id);
  if (!articlePublish) {
    res.status(404).json("article not publish");
  }
  articlePublish.status = "Published";
  articlePublish.publishedAt = new Date();
  await articlePublish.save();
  res.status(200).json(articlePublish);
});

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  restoreArticle,
  publishArticle
};
