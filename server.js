const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
//middleware routes
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const dbConnection=require('./dbConnection/dbConnection')
const userRoute=require('./Routes/User.Route')
const roleRoute=require('./Routes/Role.Route')
const categoryRoute=require('./Routes/Category.Route')
const mediaRoute=require('./Routes/Media.Route')
const contentRoute=require('./Routes/Content.Route')
const articleRoute=require('./Routes/Article.Route')
const pageRoute=require('./Routes/Page.Route')
const customContentTypeRoute=require('./Routes/CustomContentType.Route')
dbConnection();
//app api
app.use('/api/user',userRoute)
app.use('/api/role',roleRoute)
app.use('/api/category',categoryRoute)
app.use('/api/media',mediaRoute)
app.use('/api/content',contentRoute)
app.use('/api/article',articleRoute)
app.use('/api/page',pageRoute)
app.use('/api/customcontent',customContentTypeRoute)


const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
