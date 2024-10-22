const asyncHandler = require("express-async-handler");
const Media = require("../Models/Media.Model");
const User = require("../Models/User.Model");
const MediaCategory=require('../Models/MediaCategory.Model')


//upload media
//protected
const uploadMedia = asyncHandler(async (req, res) => {
  const { fileType, embededUrl,description,tags,uploadedBy,category } = req.body;
  const user=await User.findById(uploadedBy)
  const mediaCategory=await MediaCategory.findById(category)
if(!user || !mediaCategory)
{
  res.status(404).json("user and media category not found")
}
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // if (!req.user || !req.user._id) {
  //   return res.status(401).json({ message: "User not authenticated" });
  // }
  const media = await Media.create({
    fileName: file.filename,
    fileType,
    fileUrl: `uploads/${file.filename}`,
    fileSize:file.size,
    embededUrl: embededUrl || null,
    uploadedBy: user,
    category:mediaCategory,
    tags:tags.split(','),
    description
  });
  if (!media) {
    res.status(404).json("media not created");
  }
  res.status(200).json(media);
});
//get all media
const getAllMedia = asyncHandler(async (req, res) => {
  const media = await Media.find().populate("uploadedBy category");
  if (!media) {
    res.status(404).json("media data not found ");
  }
  res.status(200).json(media);
});
//get media by id
const getMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const media = await Media.findById(id).populate(
    "uploadedBy category"
  );
  if (!media) {
    res.status(404).json("media data not found ");
  }
  res.status(200).json(media);
});
//update media
//private admin
const updateMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, category, tags } = req.body;  
  const file = req.file;  // This will be populated if a new file is uploaded
  const media = await Media.findById(id);
  if (!media) {
   return res.status(404).json("media not found ");
  }
  console.log("Before Update:", media);
  media.description=description || media.description
  media.category=category || media.category
  media.tags= tags?tags.split(','):media.tags
if(file){
  media.fileName=file.filename
  media.fileUrl=`uploads/${file.filename}`
  media.fileSize=file.size
  media.fileType=file.mimetype
}

// const updateFields={
//     fileName: file ? file.originalname : fileName || media.fileName,  // Update fileName if a new file is uploaded, otherwise retain old    fileType: fileType || (file ? file.mimetype : media.fileType),
//     fileUrl: file ? file.path : media.fileUrl,  // If new file is uploaded, update the file path
//     embededUrl: embededUrl || media.embededUrl,
// }
//   const mediaUpdate = await Media.findByIdAndUpdate(
//     id,
//     { $set: updateFields },  // Set updated fields
//    { new: true }
//   );

try {
  const mediaUpdate = await media.save();
  console.log("Save Result:", mediaUpdate);  // Log save result

  return res.status(200).json(mediaUpdate);
} catch (error) {
  console.error("Error saving media:", error);  // Log any error
  return res.status(500).json({ message: "Error saving media", error: error.message });
}
});
//delete media by id
//private admin
const deleteMedia=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const media=await Media.findById(id)
    if(!media)
    {
        res.status(404).json("Media not found")
    }
   media.deletedAt=Date.now();
   try {
    await media.save();
    return res.status(200).json({ message: "Media soft deleted", media });
  } catch (error) {
    console.error("Error soft deleting media:", error);
    return res.status(500).json({ message: "Error soft deleting media", error: error.message });
  }
})
const permanentDeleteMedia=asyncHandler(async(req,res)=>{
  const {id}=req.params
  const media=await Media.findByIdAndDelete(id)
  if(!media)
  {
      res.status(404).json("Media not found")
  }
 try {
  
  return res.status(200).json({ message: "Media  deleted", media });
} catch (error) {
  console.error("Error  deleting media:", error);
  return res.status(500).json({ message: "Error  deleting media", error: error.message });
}
})
module.exports = { uploadMedia, getAllMedia, getMediaById,updateMedia,deleteMedia,permanentDeleteMedia };
