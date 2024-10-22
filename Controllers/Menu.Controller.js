const asyncHandler=require('express-async-handler')
const MenuItem=require('../Models/MenuItem.Model')
const Menu=require('../Models/Menu.Model')
//create menu 
//private admin

const createMenu=asyncHandler(async(req,res)=>{

    const { title, description, location, menuItems } = req.body;
    const menuitem=await MenuItem.findById(menuItems)    
    const menu=await Menu.create({
        title,description,location,menuItems:menuitem
    })
    if(!menu)
    {
        res.status(404).json("menu not found")
    }
    res.status(200).json(menu)
})
//get all menu 
//private admin
const getAllMenu=asyncHandler(async(req,res)=>{
    const menu=await Menu.find()
    if(!menu)
        {
            res.status(404).json("menu not found")
        }
        res.status(200).json(menu)
})
//get menu by id
//private admin
const getMenuById=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const menu=await Menu.findById(id)
    if(!menu)
        {
            res.status(404).json("menu not found")
        }
        res.status(200).json(menu)
})
//update menu 
//private admin
const updateMenu=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const { title, description, location, menuItems } = req.body;
    const menuitem=await MenuItem.findById(menuItems)    

    const menu=await Menu.findById(id)
    if(!menu)
        {
            res.status(404).json("menu not found")
        }
    const menuUpdated=await Menu.findByIdAndUpdate(id,
        {
            title, description, location, menuItems:menuitem
        },
        {
            new:true
        }
    )
    if(!menuUpdated)
        {
            res.status(404).json("menu not updated")
        }
        res.status(200).json(menuUpdated)
})
//soft delete menu
//private admin
const softDeleteMenu=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const menu=await Menu.findById(id)
    if(!menu)
        {
            res.status(404).json("menu not found")
        }
   const menuSoftDelete=await Menu.findByIdAndUpdate(id,{deletedAt:new Date()},{new:true})
   if(!menuSoftDelete)
    {
        res.status(404).json("menu not deleted")
    }
    res.json({ message: "Menu soft-deleted", menuSoftDelete });
})
//delete menu
//private admin
const deleteMenu=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const menu=await Menu.findById(id)
    if(!menu)
        {
            res.status(404).json("menu not found")
        }
   const menuDelete=await Menu.findByIdAndDelete(id)
   if(!menuDelete)
    {
        res.status(404).json("menu not deleted")
    }
    res.json({ message: "Menu deleted", menuDelete });
})
module.exports={createMenu,getAllMenu,getMenuById,updateMenu,softDeleteMenu,deleteMenu}