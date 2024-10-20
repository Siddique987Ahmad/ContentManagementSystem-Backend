const mongoose=require('mongoose')

const contentSchema=mongoose.Schema({

    title:{
        type:String,
        trim:true,
        required:true
    },
    slug:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    status:{
        type:String,
        enum:["Draft","Published","Unpublished","Scheduled"],
        default:"Draft"
    },
    scheduledPublishDate:{
        type:Date
    },
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
      },
      versionHistory: [{
        versionNumber: Number,
        body: String,
        updatedAt: { type: Date, default: Date.now }
      }],
      media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'  // Reference to Media model for images, videos, etc.
      }],
      deletedAt: {
        type: Date,  // Soft delete field for moving content to trash/archive
        default: null
      }
},{timestamps:true})


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
