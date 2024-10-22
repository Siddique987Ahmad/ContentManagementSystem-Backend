// const mongoose=require('mongoose')
// const mediaSchema=mongoose.Schema({
//     fileName:{
//         type:String,
//         required:true
//     },
//     fileType:{
//         type:String,
//         required:true
//     },
//     fileUrl:{
//         type:String,
//         required:true
//     },
//     embededUrl:{
//         type:String,
//         default:null
//     },
//     uploadedBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     }
// },{timestamps:true})

// module.exports=mongoose.model("Media",mediaSchema)

const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  fileUrl: {
    type: String,  // Store the URL for remote access
    required: true
  },
  embededUrl: {
    type: String,  // Useful for embedding media (like videos)
    default: null
  },
  fileType: {
    type: String,  // Example: 'image', 'video', 'document'
    required: true
  },
  fileSize: {
    type: Number,  // File size in bytes
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MediaCategory', // Reference to category to organize media
    default: null
  },
  description: {
    type: String,  // Description for the media file
    trim: true
  },
  tags: [{
    type: String,  // Non-hierarchical tags for better search and organization
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // User who uploaded the media
    required: true
  },
  deletedAt: {
    type: Date,  // For soft deletes (media moved to trash)
    default: null
  },
  replacedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',  // If this media has been replaced, reference the new media file here
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
