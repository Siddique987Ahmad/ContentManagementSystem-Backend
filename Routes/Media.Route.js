const express=require('express')
const { uploadMedia, getAllMedia, getMediaById, updateMedia, deleteMedia, permanentDeleteMedia } = require('../Controllers/Media.Controller')
const router=express.Router()
const multer = require('multer')
const path = require('path');
// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where files will be uploaded
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
  });
  
  // Initialize upload
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      // Accept certain file types
      const filetypes = /jpeg|jpg|png|gif|mp4|pdf/; // Example accepted file types
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb(new Error('Error: File type not supported'));
    }
  });
  
const { protect, adminOnly } = require('../Middleware/protect')
// const upload=multer({dest:'uploads/'})
router.post('/upload',upload.single('file'),protect,uploadMedia)
router.get('/getallmedia',protect,adminOnly,getAllMedia)
router.get('/getmediabyid/:id',getMediaById)
router.put('/updatemedia/:id',protect,adminOnly,upload.single('file'),updateMedia)
router.patch('/deletemedia/:id',protect,adminOnly,deleteMedia)
router.delete('/permanentdeletemedia/:id',protect,adminOnly,permanentDeleteMedia)

module.exports=router