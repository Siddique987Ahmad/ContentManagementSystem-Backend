const mongoose=require('mongoose')

const dbConnection=async()=>{
    try {
        
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected",connect.connection.name,connect.connection.host)

    } catch (error) {
        console.log("MongoDB not connected",error)
        process.exit(1)
    }
}

module.exports=dbConnection