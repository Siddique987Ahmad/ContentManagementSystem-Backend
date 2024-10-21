const mongoose=require('mongoose')
const baseContentSchema=require('./BaseContent.Model')
const contentSchema=mongoose.Schema({

    
    scheduledPublishDate:{
        type:Date
    },
      versionHistory: [{
        versionNumber: Number,
        body: String,
        updatedAt: { type: Date, default: Date.now }
      }],
     
},{timestamps:true})

contentSchema.add(baseContentSchema)

contentSchema.pre('save',async function (next) {
    const content=this
    if(content.isModified('body')){
        content.versionHistory.push({
            versionNumber:content.versionHistory.length+1,
            body:content.body
        })

    }
    next()
    
})

module.exports=mongoose.model('Content',contentSchema)
