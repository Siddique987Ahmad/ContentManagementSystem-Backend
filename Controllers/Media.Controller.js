const asyncHandler = require("express-async-handler");
const Media = require("../Models/Media.Model");
const User = require("../Models/User.Model");

//upload media
//protected
const uploadMedia = asyncHandler(async (req, res) => {
  const { fileType, embededUrl } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const media = await Media.create({
    fileName: file.originalname,
    fileType: fileType || file.mimetype,
    fileUrl: file.path,
    embededUrl: embededUrl || null,
    uploadedBy: req.user._id,
  });
  if (!media) {
    res.status(404).json("media not created");
  }
  res.status(200).json(media);
});
//get all media
const getAllMedia = asyncHandler(async (req, res) => {
  const media = await Media.find().populate("uploadedBy", "username email");
  if (!media) {
    res.status(404).json("media data not found ");
  }
  res.status(200).json(media);
});
//get media by id
const getMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const media = await Media.findById(id).populate(
    "uploadedBy",
    "username email"
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
  const { fileName, fileType, embededUrl } = req.body;
  const file = req.file;  // This will be populated if a new file is uploaded
  const media = await Media.findById(id);
  if (!media) {
    res.status(404).json("media not found ");
  }
const updateFields={
    fileName: file ? file.originalname : fileName || media.fileName,  // Update fileName if a new file is uploaded, otherwise retain old    fileType: fileType || (file ? file.mimetype : media.fileType),
    fileUrl: file ? file.path : media.fileUrl,  // If new file is uploaded, update the file path
    embededUrl: embededUrl || media.embededUrl,
}
  const mediaUpdate = await Media.findByIdAndUpdate(
    id,
    { $set: updateFields },  // Set updated fields
   { new: true }
  );
  if (!mediaUpdate) {
    res.status(404).json("media not updated ");
  }
  res.status(200).json(mediaUpdate)
});
//delete media by id
//private admin
const deleteMedia=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const mediaDelete=await Media.findByIdAndDelete(id)
    if(!mediaDelete)
    {
        res.status(404).json("Media not deleted")
    }
    res.status(200).json(mediaDelete)
})
module.exports = { uploadMedia, getAllMedia, getMediaById,updateMedia,deleteMedia };
