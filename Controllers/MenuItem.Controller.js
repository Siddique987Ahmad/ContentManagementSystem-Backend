const asyncHandler=require('express-async-handler')
const MenuItem=require('../Models/MenuItem.Model')
//create menu item
//private admin

const createMenuItem=asyncHandler(async(req,res)=>{

    const { title, type, url, customContent, parentItem, order, isActive } = req.body;
    const menuitem=await MenuItem.create({
        title,type,url,customContent,parentItem,order,isActive
    })
    if(!menuitem)
    {
        res.status(404).json("menu item not found")
    }
    res.status(200).json(menuitem)
})
//get all menu item
//private admin
const getAllMenuItem=asyncHandler(async(req,res)=>{
    const menuitem=await MenuItem.find()
    if(!menuitem)
        {
            res.status(404).json("menu items not found")
        }
        res.status(200).json(menuitem)
})
//get menu item by id
//private admin
const getMenuItemById=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const menuitem=await MenuItem.findById(id)
    if(!menuitem)
        {
            res.status(404).json("menu item not found")
        }
        res.status(200).json(menuitem)
})
//update menu item
//private admin
const updateMenuItem=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const { title, type, url, customContent, parentItem, order, isActive } = req.body;
    const menuitem=await MenuItem.findById(id)
    if(!menuitem)
        {
            res.status(404).json("menu item not found")
        }
    const menuItemUpdated=await MenuItem.findByIdAndUpdate(id,
        {
            title, type, url, customContent, parentItem, order, isActive
        },
        {
            new:true
        }
    )
    if(!menuItemUpdated)
        {
            res.status(404).json("menu item not updated")
        }
        res.status(200).json(menuItemUpdated)
})
//soft delete menu item
//private admin
const softDeleteMenuItem=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const menuitem=await MenuItem.findById(id)
    if(!menuitem)
        {
            res.status(404).json("menu item not found")
        }
   const menuItemSoftDelete=await MenuItem.findByIdAndUpdate(id,{deletedAt:new Date()},{new:true})
   if(!menuItemSoftDelete)
    {
        res.status(404).json("menu item not deleted")
    }
    res.json({ message: "Menu item soft-deleted", menuItemSoftDelete });
})
//delete menu item
//private admin
const deleteMenuItem=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const menuitem=await MenuItem.findById(id)
    if(!menuitem)
        {
            res.status(404).json("menu item not found")
        }
   const menuItemDelete=await MenuItem.findByIdAndDelete(id)
   if(!menuItemDelete)
    {
        res.status(404).json("menu item not deleted")
    }
    res.json({ message: "Menu item deleted", menuItemDelete });
})
module.exports={createMenuItem,getAllMenuItem,getMenuItemById,updateMenuItem,softDeleteMenuItem,deleteMenuItem}