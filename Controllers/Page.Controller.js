const asyncHandler=require('express-async-handler')
const Page=require('../Models/Page.Model')
const Media=require('../Models/Media.Model')
//create page
//protect
const createPage=asyncHandler(async(req,res)=>{
    const { title, slug, content, seo, status, publishedAt, media } = req.body;
    const medias=await Media.findById(media)
    const page=await Page.create({
        title,slug,
        content,seo,
        status,publishedAt,
        media:medias
    })
    if(!page)
    {
        res.status(404).json("page not created")
    }
    res.status(200).json(page)

})
//get all pages
//admin
const getAllPages=asyncHandler(async(req,res)=>{
    const page=await Page.find({deletedAt:null}).populate('media')
    if (!page) {
        res.status(404).json("No pages found");
      }
    
      res.status(200).json(page);
})
//get page by id
//private admin
const getPageById=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const getPage=await Page.findById(id).populate('media')
    if (!getPage) {
        res.status(404).json("No page found");
      }
    
      res.status(200).json(getPage);
})
//update page
//private admin
const updatePage=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const { title, slug, content, seo, status, publishedAt, media } = req.body;

    const pageUpdate=await Page.findByIdAndUpdate(
        id,
        {
            $set:{
                title,slug,content,seo,status,publishedAt,media
            }
        },
        {
            new:true
        }
    )
    if (!pageUpdate) {
        res.status(404).json("page not updated");
      }
    
      res.status(200).json(pageUpdate);

})
//delete page
//private admin
const deletePage=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const pageDelete=await Page.findByIdAndUpdate(
        id,
        {
            $set:{
                deletedAt:new Date()
            }
        },
        {
            new:true
        }
    )
    if (!pageDelete) {
        res.status(404).json("page not deleted");
      }
    
      res.status(200).json(
        {
            message:"page deleted successfully",
            content:pageDelete
        }
      );
})
//restore page
//private admin
const restorePage=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const pageRestore=await Page.findByIdAndUpdate(
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
    if (!pageRestore) {
        res.status(404).json("page not restored");
      }
    
      res.status(200).json(
        {
            message:"page restored successfully",
            content:pageRestore
        }
      );
})
//publish page
//admin private
const publishPage=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const page=await Page.findById(id)
    if(!page)
    {
        res.status(404).json("page not found")
    }
    page.status="Published"
    page.publishedAt=new Date()
    await page.save()
    res.status(200).json(page)
})


module.exports={createPage,getAllPages,getPageById,updatePage,deletePage,restorePage,publishPage}