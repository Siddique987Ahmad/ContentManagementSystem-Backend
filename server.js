const express=require('express')
const app=express()
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv').config()
const helmet=require('helmet')
const csurf=require('csurf')
//middleware routes
app.use(cookieParser());
app.use(helmet())
// const csrfProtection=csurf({cookie:true})
// app.use(csrfProtection)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send("heloo @")
})
//routes
const dbConnection=require('./dbConnection/dbConnection')
const userRoute=require('./Routes/User.Route')
const roleRoute=require('./Routes/Role.Route')
const categoryRoute=require('./Routes/Category.Route')
const mediaRoute=require('./Routes/Media.Route')
const contentRoute=require('./Routes/Content.Route')
const articleRoute=require('./Routes/Article.Route')
const pageRoute=require('./Routes/Page.Route')
const customContentTypeRoute=require('./Routes/CustomContentType.Route')
const tagRoute=require('./Routes/Tag.Route')
const mediaCategoryRoute=require('./Routes/MediaCategory.Route')
const menuItemRoute=require('./Routes/MenuItem.Route')
const menuRoute=require('./Routes/Menu.Route')
const commentRoute=require('./Routes/Comment.Route')
const reviewRoute=require('./Routes/Review.Route')
const searchRoute=require('./Routes/Search.Route')
const contentAnalyticRoute=require('./Routes/ContentAnalytic.Route')
const userAnalyticRoute=require('./Routes/UserAnalytic.Route')
const reportRoute=require('./Routes/Report.Route')
const auditLogRoute=require('./Routes/AuditLog.Route')
const backupRoute=require('./Routes/Backeup.Route')
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
app.use('/api/tag',tagRoute)
app.use('/api/mediacategory',mediaCategoryRoute)
app.use('/api/menuitem',menuItemRoute)
app.use('/api/menu',menuRoute)
app.use('/api/comment',commentRoute)
app.use('/api/review',reviewRoute)
app.use('/api/search',searchRoute)
app.use('/api/contentanalytic',contentAnalyticRoute)
app.use('/api/useranalytic',userAnalyticRoute)
app.use('/api/report',reportRoute)
app.use('/api/auditlog',auditLogRoute)
app.use('/api',backupRoute)
const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
