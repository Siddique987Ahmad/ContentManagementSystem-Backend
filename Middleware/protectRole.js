const protectRole=(role)=>{
    return(req,res,next)=>{
        if(req.user.role!==role)
        {
            res.status(403).json("Access forbidden")
        }
        next()
    }
}

app.get('/admin',protectRole('Admin'),(req,res)=>{
    res.json({message:"welcome admin"})
})