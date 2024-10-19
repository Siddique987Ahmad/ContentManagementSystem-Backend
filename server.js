const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
//middleware routes
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const dbConnection=require('./dbConnection/dbConnection')
const userRoute=require('./Routes/User.Route')
const roleRoute=require('./Routes/Role.Route')
dbConnection();
//app api
app.use('/api/user',userRoute)
app.use('/api/role',roleRoute)


const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
