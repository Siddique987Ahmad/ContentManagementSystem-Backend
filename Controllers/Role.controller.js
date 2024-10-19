const asyncHandler=require('express-async-handler')
const Role=require('../Models/Role.Model')
const User=require('../Models/User.Model')

const createRole=asyncHandler(async(req,res)=>{

    const {roleName,permissions,userid}=req.body

    const roleExist=await Role.findOne({roleName})
    if(roleExist)
    {
        res.status(200).json("role already exists")
    }

    const role=await Role.create({
        roleName,
        permissions
    })
if(!role)
{
    res.status(404).json("role not found")
}
res.status(200).json(role)

const user=await User.findById(userid)
if(!user)
{
    res.status(404).json("user not found")
}
user.role=roleName
await user.save()

res.status(200).json({
    role,
        user: {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
        }
})


})

//get all roles private admin
const getAllRoles=asyncHandler(async(req,res)=>{

    const role=await Role.find({})
    if(!role)
        {
            res.status(404).json("role not found")
        }
        res.status(200).json(role)

})
//get specific role using id private admin
const getSpecificRole=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const role=await Role.findById(id)
    if(!role)
        {
            res.status(404).json("role not found")
        }
        res.status(200).json(role)
})
//update role private admin
const updateRole=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {roleName,permissions}=req.body
    const role=await Role.findById(id)
    if(!role)
        {
            res.status(404).json("role not found")
        }
        const roleExists = await Role.findOne({ roleName, _id: { $ne: id } });
        if (roleExists) {
            return res.status(400).json({ message: "Role name already exists" });
        }
        const updatedRole=await Role.findByIdAndUpdate(
            id,
            {roleName,
            permissions},
            {new:true}
        )
        if(!updatedRole)
            {
                res.status(404).json("role not updated")
            }
            res.status(200).json(updatedRole)
})
//delete role admin private

const deleteRole=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const role=await Role.findById(id)
    if(!role)
        {
            res.status(404).json("role not found")
        }

    const deletedRole=await Role.findByIdAndDelete(id)
    if(!deletedRole)
        {
            res.status(404).json("role not deleted")
        } 
        res.status(200).json(deletedRole)

})


module.exports={createRole,getAllRoles,getSpecificRole,updateRole,deleteRole}